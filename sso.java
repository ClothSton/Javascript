package com.douzone.comet.service.ex.sso.x10031;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.security.Key;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Hashtable;
import java.util.Locale;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.naming.CommunicationException;
import javax.naming.Context;
import javax.naming.NamingEnumeration;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.InitialDirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.douzone.comet.service.extern.ErpFunction;
import com.douzone.comet.service.extern.FunctionManager;
import com.douzone.comet.service.extern.message.RequestSsoMessage;
import com.douzone.comet.service.extern.message.ResponseSsoMessage;
import com.douzone.comet.service.util.Convert;
import com.douzone.comet.service.util.HttpServiceProviderUtil;
import com.douzone.comet.service.util.StringUtil;
import com.douzone.gpd.core.DzGlobalVariable;
import com.douzone.gpd.data.DataTable;
import com.douzone.gpd.jdbc.DzDataManager;
import com.douzone.gpd.jdbc.objects.SqlPack;
import com.douzone.gpd.util.DzWebApplicationContextUtils;


public class X10031Sso implements ErpFunction<RequestSsoMessage, ResponseSsoMessage> {
	
	private static final Log logger= LogFactory.getLog(X10031Sso.class);
	//final static String key = "abc0def1gh2ij3kl4m5no6pqrstuvxyz";
	final static String key			= DzGlobalVariable.tryGetValue("extern.aes.key");	// AES 암호화키
	final static String isExpire	= DzGlobalVariable.tryGetValue("extern.expire");	// ssoToken 유효시간 사용여부 (true/false)
	final static String isUseAuthAD	= DzGlobalVariable.tryGetValue("extern.auth.ad");	// LDAP 인증 사용여부 (true/false)
	private String iv;
	private Key keySpec;
	
	// X10031Sso는 new로 생성했기 때문에 @Autowired로 DzDataManager 생성이 안됨. => 직접 Bean에서 꺼내온다.
	DzDataManager dataManager = (DzDataManager) DzWebApplicationContextUtils.getBean("dataManager");
	
	@Override
	public ResponseSsoMessage execute(RequestSsoMessage requestMessage) throws Exception {
		
		ResponseSsoMessage responseMessage = new ResponseSsoMessage();
		String ssoToken 		= requestMessage.getSsoToken();
		String decryptParam 	= "";	// 복호화된 ssoToken
		String yyyyMMddHHmmss	= "";	// 유효시간
		String gwUserId			= "";	// 그룹웨어 사용자ID
		String passWd			= "";	// 패스워드
		String[] secretCodes	= null; // 복호화된 ssoToken에서 '|'기준으로 분리하여 배열에 저장
		//boolean isAuthLDAP		= false; // AD 인증 결과
		
		logger.info("******************* SSO *****************************");
		logger.info("복호화 전 ssoToken= " + ssoToken);
		logger.info("*********************** *****************************");
		
		try {

			// ssoToken 복호화
			ssoToken		= URLDecoder.decode(ssoToken, "UTF-8"); // url디코딩
			decryptParam	= AES256DecryptCBC(ssoToken);
			//decryptParam	= AES256_DecryptECB(key, ssoToken);
			
			logger.info("******************* SSO *****************************");
			logger.info("복호화 후 ssoToken= " + decryptParam);
			logger.info("*********************** *****************************");
			
			logger.info("******************* SSO config *****************************");
			logger.info("key= " + key);
			logger.info("isExpire= " + isExpire);
			logger.info("isUseAuthAD= " + isUseAuthAD);
			logger.info("*********************** *****************************");
			
			// 복호화된 ssoToken에서 아이디,패스워드 추출
			secretCodes = decryptParam.split("\\|"); // 복호화된 데이터 형태 (ex: 사용자아이디|패스워드 )
			
			if (isExpire.equals("true")) { // 유효시간 체크하는 경우
				
				if (secretCodes.length == 3) { // 복호화된 데이터 형태 (ex: 년월일시분초|사용자아이디|패스워드 )
					
					yyyyMMddHHmmss	= secretCodes[0]; // yyyyMMddHHmmss
					gwUserId		= secretCodes[1]; // 사용자아이디
					passWd			= secretCodes[2]; // 패스워드
					
					logger.info("******************* SSO data *****************************");
					logger.info("yyyyMMddHHmmss= " + yyyyMMddHHmmss);
					logger.info("gwUserId= " + gwUserId);
					logger.info("passWd= " + passWd);
					logger.info("*********************** *****************************");
					
					// 발행된 토큰 시간이 경과되었는지 체크
					if (isExpire(secretCodes[0]) == true) { // 토큰 유효시간 경과여부
						isAuthLDAP(responseMessage, gwUserId, passWd);
					} else {
						responseMessage.setAuthenticate(false);
						responseMessage.setLastErrorMsg("토큰 유효시간이 경과되었거나 NULL입니다.");
					}
				} else {
					responseMessage.setAuthenticate(false);
					responseMessage.setLastErrorMsg("전달받은 토큰이 형식에 맞지 않습니다.");
				}
				
			} else { // 유효시간을 체크하지 않는 경우
				
				if (secretCodes.length == 2) { // 복호화된 데이터 형태 (ex: 사용자아이디|패스워드 )
					gwUserId= secretCodes[0];
					passWd	= secretCodes[1];
					
					isAuthLDAP(responseMessage, gwUserId, passWd);
				} else {
					responseMessage.setAuthenticate(false);
					responseMessage.setLastErrorMsg("전달받은 토큰이 형식에 맞지 않습니다.");
				}
				
			}
			
		} catch (Exception e) {
			responseMessage.setAuthenticate(false);
			responseMessage.setLastErrorMsg(e.getMessage());
		}
		
		return responseMessage;
	}
	
	// CBC mode 관련 처리 (key, SecretKeySpec 처리)
	private void AES256CBCInit() {
		
		this.iv = key.substring(0, 16);
		byte[] keyBytes = new byte[16];
		byte[] b 		= null;
		
		try {
			b = key.getBytes("UTF-8");
			int len = b.length;
			
			if (len > keyBytes.length)
				len = keyBytes.length;

			System.arraycopy(b, 0, keyBytes, 0, len);
			SecretKeySpec keySpec = new SecretKeySpec(keyBytes, "AES");

			this.keySpec = keySpec;
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	// AES256 암호화 (CBC)
	private String AES256EncryptCBC (String str) {
		String enStr;

		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");

			cipher.init(Cipher.ENCRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
			byte[] encrypted = cipher.doFinal(str.getBytes("UTF-8"));
			enStr = new String(Base64.encodeBase64(encrypted));
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			enStr = "";
		}
		return enStr;
	}

	// AES256 복호화 (CBC)
	private String AES256DecryptCBC(String str) {
		
		String decStr; // 복호화 값

		AES256CBCInit(); // CBC mode 준비(key, SecretKeySpec)
		
		try {
			Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, keySpec, new IvParameterSpec(iv.getBytes()));
			byte[] byteStr = Base64.decodeBase64(str.getBytes());
			decStr = new String(cipher.doFinal(byteStr), "UTF-8");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			decStr = "";
		}
		return decStr;
	}
	
	// AES256 암호화 (ECB)
	private String AES256EncryptECB(String AES256_KEY, String str) {
		
		String encStr = "";
		
		try {
			byte[] keyData	= AES256_KEY.getBytes();
			byte[] text 	= str.getBytes("UTF-8");
			
			// AES/ECB/PKCS5Padding
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.ENCRYPT_MODE, new SecretKeySpec(keyData, "AES"));
			// 암호화
			byte[] encrypted = cipher.doFinal(text);
			encStr = new String(Base64.encodeBase64(encrypted));
		} catch (Exception e) {
			e.printStackTrace();
			encStr = null;
		}
		return encStr;
	}
	
	// AES356 복호화 (ECB)
	private String AES256DecryptECB(String AES256_KEY, String enStr) {
		
		String decStr = "";
		
		try {
			byte[] keyData = AES256_KEY.getBytes();
			byte[] encText = Base64.decodeBase64(enStr.getBytes());
			
			// AES/ECB/PKCS5Padding
			Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
			cipher.init(Cipher.DECRYPT_MODE, new SecretKeySpec(keyData, "AES"));
			// 복호화
			byte[] decrypted = cipher.doFinal(encText);
			decStr = new String(decrypted, "UTF-8");
		} catch (Exception e) {
			e.printStackTrace();
			decStr = null;
		}
		return decStr;
	}
	
	// 발행된 토큰이 1분이 경과되었는지 체크
	private boolean isExpire (String yyyyMMddHHmmss) {
		
		String accessTime = DzGlobalVariable.tryGetValue("extern.access.time"); // 토큰 유효시간
		
		if (yyyyMMddHHmmss == null || "".equals(yyyyMMddHHmmss)) {
			return false;
		}
		
		// 토큰이 생성된 시간
		long A = Convert.toLong(yyyyMMddHHmmss);
		logger.info("******************** SSO **************************");
		logger.info("그룹웨어에서 전달받은 시간 = " + A);
		logger.info("****************************************");
		
		// 현재시간
    	Date now = new Date();
    	String nowTime = new SimpleDateFormat("yyyyMMddHHmmss", Locale.KOREAN).format(now);
    	long B = Convert.toLong(nowTime);
    	logger.info("******************** SSO **************************");
    	logger.info("시스템에서 전달받은 시간 = " + B);
    	logger.info("****************************************");
    	
    	// 1일 경과 여부 판단 ( ex) 20200320090000 - 20200319090000 = 1000000)
    	// 12시간 경과 여부 판단 ( ex) 20200320090000 - 20200319090000 = 120000)
    	// ...
    	// 5분 경과 여부 판단 ( ex) 20200211113700 - 20200211113200 = 500 )
    	// 2분 경과 여부 판단 ( ex) 20200211113400 - 20200211113200 = 200 )
    	// 1분 경과 여부 판단 ( ex) 20200211113300 - 20200211113200 = 100 )
    	if (B-A > Convert.toLong(accessTime) // 1분 후
    			|| A-B > Convert.toLong(accessTime)) { // 1분 전
    		logger.info("******************** SSO **************************");
    		logger.info("토근 유효시간 경과!");
    		logger.info("****************************************");
    		return false;
    	}
		return true;
	}
	
	// LDAP 인증처리 여부
	private boolean isAuthLDAP (ResponseSsoMessage responseMessage, String gwUserId, String passWd) {
	
		boolean isAuthLDAP = false; // AD 인증 결과
		
		if (isUseAuthAD.equals("false")) { // LDAP인증 사용하지 않음
			isAuthLDAP = true; // 패스
			responseMessage.setAuthenticate(true);
			responseMessage.setUserId(gwUserId);
		} else { // LDAP인증 사용하는 경우

			String erpUserId = "";
			isAuthLDAP = isAuthUser(responseMessage, gwUserId, passWd);	// 사용자 인증
			//isAuthLDAP = isAuthAccount(responseMessage, userId, passWd);// 계정 인증
		
    		logger.info("******************** SSO AD 인증 결과 **************************");
    		logger.info("isAuthLDAP="+isAuthLDAP);
    		logger.info("****************************************");
    		
			// DB에서 ERP 사용자정보 가져오기
			erpUserId = getErpUserId(responseMessage, gwUserId);
			
    		logger.info("******************** SSO ERP USER ID **************************");
    		logger.info("erpUserId="+erpUserId);
    		logger.info("****************************************");
    		
			if (isAuthLDAP == true) { // LDAP인증 성공
				isAuthLDAP = true;
				responseMessage.setAuthenticate(true);
				responseMessage.setUserId(erpUserId);
			} else { // LDAP인증 실패
				isAuthLDAP = false;
				responseMessage.setAuthenticate(false);
			}
		}
		
		return isAuthLDAP;
	}
	
	// LDAP 사용자 인증 (게임빌)
	private boolean isAuthUser (ResponseSsoMessage responseMessage, String userId, String passWd) {
		
		boolean isAuthenticated = false;
		String sErrorMsg		= "";
		String errorMessage		= "";
		String adUrl 			= DzGlobalVariable.tryGetValue("extern.ad.url"); // ad url
		String filterString 	= "";
		String BASE_NAME		= "O=gamevil";

		logger.info("******************** SSO AD 인증 **************************");
		logger.info("AD인증 userId="+userId);
		logger.info("AD인증 passWd="+passWd);
		logger.info("AD인증 adUrl="+adUrl);
		logger.info("****************************************");
		
		if ((passWd != null) && (!"".equals(passWd))) {

	        // Password 특수문자 오동작 처리
	        // PC비밀번호는 모든 특수문자 지원하고 AMS는 일부 특수문자를 C#에서 변환해서 전송하기 때문에
	        // 원래상태로 재변환해서 AD 인증 요청 해야함.
			passWd = passWd.replaceAll("＆", "&");
			passWd = passWd.replaceAll("％", "%");
			passWd = passWd.replaceAll("＠", "@");

			Hashtable<String, String> properties = new Hashtable<String, String>();
			properties.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			properties.put(Context.PROVIDER_URL, "LDAP://" + adUrl);
			properties.put(Context.SECURITY_AUTHENTICATION, "simple");
			properties.put(Context.SECURITY_PRINCIPAL, userId);
			properties.put(Context.SECURITY_CREDENTIALS, passWd);
			filterString = "(CN=" + userId + ")";

			try {
				
	            // 사용자 확인
				DirContext context		= new InitialDirContext(properties);
				SearchControls searcher	= new SearchControls();
				searcher.setSearchScope(2);

				NamingEnumeration<SearchResult> results = context.search(BASE_NAME, filterString, searcher);

				while (results.hasMore()) {
					SearchResult result	= (SearchResult) results.next();
					Attributes attrs	= result.getAttributes();
					Attribute emp_no	= attrs.get("employeeID");

					if (emp_no == null) {
						isAuthenticated = false;
						sErrorMsg		= "사원번호 정보가 존재하지 않습니다.";
					} else {
						isAuthenticated = true;
						String sEmpNo	= ((String) emp_no.get(0));
						System.out.println("AD search 사원번호 = " + sEmpNo);
					}
				}
				context.close();
	            
			} catch (CommunicationException e) {
				isAuthenticated	= false;
				errorMessage	= e.getMessage();
				sErrorMsg		= "인증서버 접속에 실패하였습니다.";
				responseMessage.setLastErrorMsg(sErrorMsg);
			} catch (Exception e) {
				isAuthenticated	= false;
				errorMessage	= e.getMessage();

				if ((errorMessage.indexOf("525") != -1)
						|| (errorMessage.indexOf("successful bind must be completed") != -1)) {
					//sErrorMsg = "ID 또는 비밀번호가 일치하지 않습니다.";
					sErrorMsg = "사용자를 찾을 수 없습니다.";
				} else if (errorMessage.indexOf("52e") != -1) {
					//sErrorMsg = "ID 또는 비밀번호가 일치하지 않습니다.";
					sErrorMsg = "ID와 비밀번호가 일치하지 않습니다.확인 후 다시 시도해 주십시오.";
				} else if ((errorMessage.indexOf("701") != -1)) {
					//sErrorMsg = "ID 또는 비밀번호가 일치하지 않습니다.";
					sErrorMsg = "AD에서 계정이 만료되었습니다.";
				} else if ((errorMessage.indexOf("532") != -1)) {
					//sErrorMsg = "ID 또는 비밀번호가 일치하지 않습니다.";
					sErrorMsg = "암호가 만료되었습니다.";
				} else if ((errorMessage.indexOf("773") != -1)) {
					//sErrorMsg = "ID 또는 비밀번호가 일치하지 않습니다.";
					sErrorMsg = "사용자는 암호를 재설정해야합니다.";
				} else if (errorMessage.indexOf("533") != -1) {
					//sErrorMsg = "ID 또는 비밀번호가 일치하지 않습니다.";
					sErrorMsg = "입력한 ID는 비활성화 상태 입니다.";
				} else {
					sErrorMsg = errorMessage;
				}
				/* else if (errorMessage.indexOf("775") != -1) {
					sErrorMsg = "775 에러!";
				} else if (errorMessage.indexOf("530") == -1) {
					sErrorMsg = "530 에러!";
				}
				*/
				responseMessage.setLastErrorMsg(sErrorMsg);
			}
			
		} else {
			isAuthenticated	= false;
			errorMessage	= "비밀번호가 입력되지 않았습니다.";
			responseMessage.setLastErrorMsg(errorMessage);
		}
		return isAuthenticated;
		
	}
	
	// LDAP 계정 인증
	private boolean isAuthAccount (ResponseSsoMessage responseMessage, String userId, String passWd) {
		
		String adUrl		= DzGlobalVariable.tryGetValue("extern.ad.url"); // ad url

		try {

	        // Password 특수문자 오동작 처리
	        // PC비밀번호는 모든 특수문자 지원하고 AMS는 일부 특수문자를 C#에서 변환해서 전송하기 때문에
	        // 원래상태로 재변환해서 AD 인증 요청 해야함
			passWd = passWd.replaceAll("＆", "&");
			passWd = passWd.replaceAll("％", "%");
			passWd = passWd.replaceAll("＠", "@");
            
			Hashtable<String, String> properties = new Hashtable<String, String>();
			properties.put(Context.INITIAL_CONTEXT_FACTORY, "com.sun.jndi.ldap.LdapCtxFactory");
			properties.put(Context.PROVIDER_URL, "LDAP://" + adUrl);
			properties.put(Context.SECURITY_AUTHENTICATION, "simple");
			properties.put(Context.SECURITY_PRINCIPAL, userId);
			properties.put(Context.SECURITY_CREDENTIALS, passWd);

            LdapContext ctx = null;
            
            try {
                ctx = new InitialLdapContext(properties, null);
            } catch (Exception e) {
//                if (!(e.getMessage().indexOf("data 531") > 0) || (e.getMessage().indexOf("data 0") > 0))
//                    throw e;
                responseMessage.setLastErrorMsg(e.getMessage());
                return false;
            } finally {
                if(ctx != null) ctx.close();
            }

            return true;
		} catch(Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
	}
	
	public String getErpUserId (ResponseSsoMessage responseMessage, String GWuserId) {
		
		String erpUserId	= ""; // DB에서 가져올 erp 로그인 ID
		String dbOwner 		= ""; // 데이터베이스명
		String tableName	= "HR_EMP_SDTL";
		
		try {
			
			dbOwner = dataManager.getDataSourceWrappers().getDbOwner();
			dbOwner = (dbOwner == null || dbOwner.equals("")) ? "" : dbOwner + ".";

			String query = StringUtil.Format(
					"SELECT EMP_NO FROM {0}{1} WHERE MCLS_CD='E10031_07' AND MNG_DC='{2}'", dbOwner, tableName, GWuserId);
			
			SqlPack so = new SqlPack();
			so.setStoreProcedure(false);
			so.setSqlText(query);
			DataTable dt = dataManager.queryForDataTable(so);
			
			if (dt.getRows().size() > 0) {
				erpUserId = dt.getRow(0).getColumn("EMP_NO").toString();  
			}
		}
		catch(Exception e){
            responseMessage.setLastErrorMsg(e.getMessage());
            return "";
		}
		
		return erpUserId;
	}
	
}
