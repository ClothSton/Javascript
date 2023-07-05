/*Logger 사용 */
package com.somebiz.restapp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
// other imports

@Restcontroller
public class 

/*
 * 루프성쿼리
 * 
 * 추가) 아래 SELECT 절만 변경해서 사용하시면 됩니다. 

SELECT
        KEY_ACCT_CD, ACCT_CD, UP_ACCT_CD, MIN(ACCT_LIST) ACCT_LIST, MIN(CNT) CNT
    FROM T_ACCT_LIST
    WHERE IS_DUPLE = 'Y'
        AND ACCT_LIST LIKE CONCAT(KEY_ACCT_CD, '%')
        AND ACCT_LIST LIKE CONCAT('%', KEY_ACCT_CD)
 GROUP BY KEY_ACCT_CD, ACCT_CD, UP_ACCT_CD

KEY_ACCT_CD  : 문제있는 계정코드
ACCT_LIST  : 처음과 끝이 중복
CNT : 레벨 (몇단계에서 중복인지)

-----------------------

루프쿼리 공유해드립니다.

테이블 : IA_COA_MNG
회사코드 : 9700
루프성 체크  :  10 까지 검증
      ex) 2로 체크하면 acct_cd = up_acct_cd
마리아 db인 경우 RECURSIVE

WITH
    /*RECURSIVE*/
    M_ACCT AS
    (
        SELECT
            ACCT_CD, UP_ACCT_CD, CONCAT(CONCAT('|', ACCT_CD), '|') ACCT_LIST
        FROM IA_COA_MNG
        WHERE COMPANY_CD = '9700'
            AND UP_ACCT_CD IS NOT NULL            
    ),
    T_ACCT_LIST(ACCT_CD, UP_ACCT_CD, ACCT_LIST, CNT, IS_DUPLE, KEY_ACCT_CD) AS
    (
        SELECT
            ACCT_CD, UP_ACCT_CD, ACCT_LIST,
            1 CNT, 'N' IS_DUPLE, '|' KEY_ACCT_CD
        FROM M_ACCT

        UNION ALL

        SELECT
            MA.ACCT_CD, MA.UP_ACCT_CD, CONCAT(TA.ACCT_LIST, MA.ACCT_LIST) ACCT_LIST,
            TA.CNT + 1 CNT,
            CASE WHEN TA.IS_DUPLE = 'Y' THEN 'Y'
                     WHEN LENGTH(TA.ACCT_LIST) - LENGTH(REPLACE(TA.ACCT_LIST, MA.ACCT_LIST, ' ')) !=  0 THEN 'Y'
                     ELSE 'N' END IS_DUPLE,
            CASE WHEN TA.IS_DUPLE = 'Y' THEN TA.KEY_ACCT_CD
                     WHEN LENGTH(TA.ACCT_LIST) - LENGTH(REPLACE(TA.ACCT_LIST, MA.ACCT_LIST, ' ')) !=  0 THEN CONCAT(TA.KEY_ACCT_CD, CONCAT(MA.ACCT_CD, '|'))
                     ELSE TA.KEY_ACCT_CD END KEY_ACCT_CD                    
        FROM M_ACCT MA, T_ACCT_LIST TA
        WHERE MA.UP_ACCT_CD = TA.ACCT_CD
            AND TA.CNT < 10
    )
    SELECT
        DISTINCT KEY_ACCT_CD
    FROM T_ACCT_LIST
    WHERE IS_DUPLE = 'Y'
    /*
    SELECT
        MA.*
    FROM M_ACCT MA
    INNER JOIN (
        SELECT
            DISTINCT KEY_ACCT_CD
        FROM T_ACCT_LIST
        WHERE IS_DUPLE = 'Y'
    )  TD
        ON MA.ACCT_CD = REPLACE(KEY_ACCT_CD, '|', '') OR MA.UP_ACCT_CD = REPLACE(KEY_ACCT_CD, '|', '')
    */

/*BackEnd Tree구조 
// 쿼리 준비
SqlPack so = new SqlPack();
so.setStoreProcedure(false);
so.setMapperType(MapperType.MyBatis);
so.setSqlText(MyBatisUtil.getId(this.getClass(), "Ibsobs00400Tab5.list"));
so.getInParameters().putAll(parameters);
items = this.queryForModel(so, Ibsobs00400Tab5Tree.class);

Ibsobs00400Tab5Tree FirstNode = new Ibsobs00400Tab5Tree();
FirstNode.setLv_cd("0");
FirstNode.setCode_cd("0"); // top -> 0
FirstNode.setCode_nm("업무수준CM");
FirstNode.setCssclass("folder");
FirstNode.setStatus("none");

Integer lvl = _lv1_use_yn.equals("Y") ? 1 : 2;

// 1레벨
List<Ibsobs00400Tab5Tree> list = items.stream().filter(p -> p.getLv_cd().equals(lvl.toString()))
		.sorted(Comparator.comparing(p -> p.getDisp_sq())).collect(Collectors.toList());

// (레벨 + 상위코드)별 map
Map<String, List<Ibsobs00400Tab5Tree>> mapChild = items.stream()
		.filter(p -> !(p.getLv_cd().equals(lvl.toString())))
		.sorted(Comparator.comparing(p -> p.getDisp_sq()))
		.collect(Collectors.groupingBy(p -> (p.getLv_cd() + "LV_" + p.getUp_code_cd())));

FirstNode.setChild(list);

for (int i = 0; i < list.size(); i++) {
	ibsobs00400Tab5_list_tree_step(mapChild, list.get(i), lvl + 1, _lv4_use_yn);
}

TreeNode.add(FirstNode);

//
private void ibsobs00400Tab5_list_tree_step(Map<String, List<Ibsobs00400Tab5Tree>> mapChilds,
			Ibsobs00400Tab5Tree ParentNode, Integer lvl, String _lv4_use_yn) throws Exception {
		try {
			if (_lv4_use_yn.equals("N") && lvl == 4) {
				lvl++;
			}

			if (mapChilds.containsKey(lvl.toString() + "LV_" + ParentNode.getSeq_cd().toString())) {
				List<Ibsobs00400Tab5Tree> Node = mapChilds
						.get(lvl.toString() + "LV_" + ParentNode.getSeq_cd().toString());
				ParentNode.setChild(Node);
				for (int i = 0; i < Node.size(); i++) {
					ibsobs00400Tab5_list_tree_step(mapChilds, Node.get(i), lvl + 1, _lv4_use_yn);
				}
			}
		} catch (DzApplicationRuntimeException e) {
			throw e;

		} catch (Exception e) {
			throw e;
		}
	}
*/

/*MAX값 따기 */
// 쿼리 준비
SqlPack so = new SqlPack();
so.setStoreProcedure(false);
so.setMapperType(MapperType.MyBatis);
so.setSqlText(MyBatisUtil.getId(this.getClass(), "Itaots00200.list_it"));
so.getInParameters().putAll(parameters);
List<SingleObject> objs = this.queryForModel(so, SingleObject.class);

Integer _maxidx = Integer.parseInt(objs.get(0).getScala().toString().replace(".0", ""));

SingleObject ✨

if (!udrmad00400_check_sysYn(parameters)) {
				throw new DzApplicationRuntimeException(String.format("타 메뉴에서 사용 중인 경우 삭제가 불가능합니다."+"\n [%s] %s",item.getRval_cd(), item.getRval_nm()));
            }
			
			
private Boolean udrmad00400_check_sysYn(HashMap<String, Object> parameters)
		throws Exception {
			
			Boolean result = true;
						
			List<SingleObject> list =  dao00400.check_sysYn(parameters);
			
			if (list.size() > 0) {
				result = false;
			}
			
			return result;
		}
		
		
public List<SingleObject> check_sysYn(Object object) throws Exception {
		return this.mybatisSupport.selectList(this.getMyBatisName("Udrmad00400Card", "check_sysYn"), object);
	}
	
	
	
<select id="check_sysYn" parameterType="hashmap" resultType="com.douzone.comet.service.util.data.models.SingleObject">
	SELECT 1 SCALA
	FROM 
		@{dzparam_dbname}CO_RPTCOL_MST CRI
	WHERE 
		CRI.COMPANY_CD = #{P_COMPANY_CD}
		AND CRI.TSK_FG_CD = #{P_TSK_FG_CD}
		AND CRI.RVAL_CD = #{P_RVAL_CD}
</select>


/* 있으면 업데이트 없으면 인서트
private void aemaed00100_insert5(Aemaed00100Edu item, String actg_yy, String emp_no) throws Exception {
		try {
			String line_sq = getMaxLineSq(actg_yy);
			
			String goalDt = "";
			String closeDt = "";
			
			HashMap<String, Object> params = new HashMap<String, Object>();
 			params.put("P_EDU_TP_CD", item.getEdu_tp_cd());
 			params.put("P_EUCPART_CD", item.getEucpart_cd());
 			params.put("P_EDU_START_DT", StringUtil.getLocaleTimeString(item.getEdu_start_dt(), "yyyyMMdd"));
 			params.put("P_EDU_END_DT", StringUtil.getLocaleTimeString(item.getEdu_end_dt(), "yyyyMMdd"));
 			
 			String overlapId = MyBatisUtil.getId(this.getClass(), "Aemaed00100.select_overlap");
 			List<Map<String, Object>> list = mybatisSupport.selectList(overlapId, params);
 			
 			if(list.size() > 0) {
 				String mapperId = MyBatisUtil.getId(this.getClass(), "Aemaed00100.insert_view");			
 				mybatisSupport.update(mapperId, params);
 			} else {
 				String mapperId = MyBatisUtil.getId(this.getClass(), "Aemaed00100.update");			
 				mybatisSupport.update(mapperId, params);
 			}
			
		} catch (DzApplicationRuntimeException e) {
 			throw e;

 		} catch (Exception e) {
 			throw e;
 		}
	} 
*/

/*
   AEM.DEPT_CD           			--   부서코드         
 , MDM.DEPT_NM           			--   부서명           
 , AEM.EMP_NO            			--   사원번호         
 , HEM.KOR_NM            			--   사원명            

--부서 사원 이름 매핑
LEFT JOIN	HR_EMP_MST HEM
ON 1=1 AND AEM.COMPANY_CD = HEM.COMPANY_CD AND AEM.EMP_NO     = HEM.EMP_NO
LEFT JOIN	
(
 SELECT 
	 B.DEPT_CD, B.DEPT_NM, B.DEPT_START_DT
 FROM 
 (
	  SELECT MAX(DEPT_START_DT) DEPT_START_DT, DEPT_CD 
	  FROM MA_DEPT_MST
	  WHERE COMPANY_CD = #{P_COMPANY_CD}		
	  GROUP BY DEPT_CD
 ) A
 INNER JOIN MA_DEPT_MST B 
	 ON 		B.DEPT_CD       = A.DEPT_CD
		AND B.DEPT_START_DT = A.DEPT_START_DT 
		AND B.COMPANY_CD    = #{P_COMPANY_CD}
) MDM
ON 1=1 AND MDM.DEPT_CD = AEM.DEPT_CD
LEFT OUTER JOIN MA_DEPT_LDTL MDL 
  ON MDL.COMPANY_CD    	  = #{P_COMPANY_CD}
	AND MDL.DEPT_CD       = MDM.DEPT_CD
	AND MDL.DEPT_START_DT = MDM.DEPT_START_DT
	AND MDL.LANG_CD       = #{P_LANG_CD}		        
WHERE 1 = 1
 */


/*소계 백엔드에서 처리할때
 * <!-- 월판매용품청구내역 미청구 조회 -->
	<select id="selectMainList" resultType="com.douzone.comet.service.np.npslqr.z10075.models.Npslqr01120_MAIN_z10075">
	WITH TEMP_INFO
		AS
		(
SELECT  TAX.TAXBIL_NO				 <!-- 전자발행구분 -->
		,TAX.PARTNER_CD				 <!-- 세금계산서번호 -->
		,DECODE(TAX.ELTR_ISSUE_FG, '0','미발행','발행') AS ELTR_ISSUE_FG	<!-- 전자발행구분 -->
		,CODE.SYSDEF_NM AS STATUS_FG <!-- 수신상태 -->
		        ,TAX.START_DT 		 <!-- 시작일 -->
		,PARTNER.PARTNER_NM			 <!-- 거래처명 -->
		,PARTNER.CEO_NM 			 <!--대표자명 -->
		,TAXD.ITEM_NM 				 <!--품목-->
		,TAX.BIZR_NO 				 <!--사업자번호 -->
		,PARTNER.BASE_ADDR 			 <!-- 주소 -->
		,PARTNER.BIZC_NM 			 <!--업태-->
		,PARTNER.BIZTP_NM 			 <!--업종-->
		,CTR.CTR_NM 				 <!--센터명-->
		,NVL(TAXD.SPPRC_AMT, 0) AS SPPRC_AMT 			 <!--매출액-->
		,NVL(TAXD.TAX_AMT, 0) AS TAX_AMT 				 <!--부가세-->
		FROM FI_TAX_MST TAX, FI_TAX_DTL_ITEM TAXD
		 , CI_PARTNER_MST PARTNER, NP_CTR_MST CTR, NP_TEAMRESP_INFO TEAMRESP
		 , (SELECT COMPANY_CD, SYSDEF_CD, SYSDEF_NM FROM MA_CODEDTL WHERE COMPANY_CD = #{P_COMPANY_CD} AND MODULE_CD ='FI' AND FIELD_CD ='S40180') CODE
		WHERE TAX.COMPANY_CD = TAXD.COMPANY_CD(+) 
		AND TAX.TAXBIL_NO = TAXD.TAXBIL_NO(+) 
		AND TAX.PARTNER_CD = PARTNER.PARTNER_CD(+)
		AND TAX.COMPANY_CD = CTR.COMPANY_CD(+) 
		AND PARTNER.PARTNER_CD  = CTR.CUST_CD(+)
		AND CTR.COMPANY_CD  = TEAMRESP.COMPANY_CD(+)
		AND CTR.CHRG_EMP_NO = TEAMRESP.EMP_NO(+)
		AND TAX.COMPANY_CD = CODE.COMPANY_CD(+)
		AND TAX.ELTR_ISSUE_ST_CD = CODE.SYSDEF_CD(+) 
		AND TAX.COMPANY_CD = #{P_COMPANY_CD}
		<if test='P_KIND_FG == "1"'> 
		AND CTR.TEAM_CD LIKE #{P_TEAM_CD} || '%'
		AND CTR.PART_CD LIKE #{P_PART_CD} || '%'
		AND TEAMRESP.EMP_NO LIKE #{P_EMP_NO}  || '%'
		</if>
		AND TAX.START_DT BETWEEN #{P_START_DT} AND #{P_END_DT}  --세금일자
		<!-- <choose>
		<when test='P_USERDEF1_CD != null and P_USERDEF1_CD == "7"'>
		AND PARTNER.PARTNER_FG_CD = '3'
		AND TAX.USERDEF1_CD IN('5', '6')
		</when>
		<otherwise>
		AND TAX.USERDEF1_CD = #{P_USERDEF1_CD} 
		</otherwise>
		</choose> -->
		<choose>
		<when test='P_CHK == "1"'>
		AND PARTNER.PARTNER_FG_CD = '3'
		AND TAX.USERDEF1_CD IN('5', '6')
		</when>
		<otherwise>
		AND TAX.USERDEF1_CD = #{P_USERDEF1_CD}
		</otherwise>
		</choose>
		AND TAX.TAXAFS_CD LIKE #{P_TAXAFS_CD} || '%' -- 구분
		<if test='P_ISSUE_ST_CD != null and P_ISSUE_ST_CD != ""'> 
		AND CODE.SYSDEF_CD = #{P_ISSUE_ST_CD}	--상태
		</if>
		<if test='P_KIND_FG != null and P_KIND_FG != ""'>
		AND CTR_KIND_FG = #{P_KIND_FG}	--거래선코드
		</if>
		ORDER BY TAX.START_DT, CTR.CTR_NM
		)
		SELECT '1' GUBUN
			,  TAXBIL_NO
			,  PARTNER_CD
			,  ELTR_ISSUE_FG
			,  STATUS_FG
			,  START_DT
			,  PARTNER_NM
			,  CEO_NM
			,  ITEM_NM
			,  BIZR_NO
			,  BASE_ADDR
			,  BIZC_NM
			,  BIZTP_NM
			,  CTR_NM
			,  SPPRC_AMT
			,  TAX_AMT
		FROM TEMP_INFO
		UNION ALL
		SELECT '2' GUBUN
			,  NULL TAXBIL_NO
			,  PARTNER_CD || CHR(10)	PARTNER_CD
			,  NULL ELTR_ISSUE_FG
			,  NULL STATUS_FG
			,  NULL START_DT
			,  PARTNER_NM || CHR(10)	PARTNER_NM
			,  CEO_NM || CHR(10)		CEO_NM
			,  NULL ITEM_NM
			,  NULL BIZR_NO
			,  NULL BASE_ADDR
			,  NULL BIZC_NM
			,  NULL BIZTP_NM
			,  NULL CTR_NM
			,  SUM(SPPRC_AMT)
			,  SUM(TAX_AMT)
		FROM TEMP_INFO
		GROUP BY PARTNER_CD, PARTNER_NM, CEO_NM
		ORDER BY PARTNER_NM, GUBUN
	</select>
 */

/*JAVA API 파라미터 dataSource 형태 
@DzApi(url = "/iriism00100_save_Cwide_plen_company", desc = "전사수준 설계평가 이슈처리 버튼", httpMethod = DzRequestMethod.POST)
		public boolean iriism00100_save_Cwide_plen_company(
				@DzParam(key="dataSource", desc="저장데이터", paramType=DzParamType.Body) List<Map<String, String>> dataSource
				)throws Exception {
			try {
				
					HashMap<String, Object> parameters = new HashMap<String, Object>();
					for (Map<String, String> item : dataSource) {
						parameters.clear();
						parameters.put("P_EVAL_PRID_SQ", item.get("eval_prid_sq"));
						parameters.put("P_CTRL_TSK_FG", item.get("ctrl_tsk_fg"));
						parameters.put("P_CTRL_LV_CD", item.get("ctrl_lv_cd"));
						*/

//XML DB체크
<choose>
		    		<when test='DbProvider.equals("MARIADB")'>
		    		STR_TO_DATE((#{INSERT_DTS}), '%Y-%m-%d %H:%i:%S'),
		    		</when>
		    		<otherwise>
		    		TO_DATE((#{INSERT_DTS}), 'YYYY-MM-DD HH24:MI:SS'),
		    		</otherwise>
		    	</choose>
		    	#{UPDATE_ID},
		    	<choose>
		    		<when test='DbProvider.equals("MARIADB")'>
		    		STR_TO_DATE((#{UPDATE_DTS}), '%Y-%m-%d %H:%i:%S'),
		    		</when>
		    		<otherwise>
		    		TO_DATE((#{UPDATE_DTS}), 'YYYY-MM-DD HH24:MI:SS')
		    		</otherwise>
		    	</choose>

//쿼리 분기태우기(xml)
 <if test='p_cpk_extennm != null and !"".equals(p_cpk_extennm)'>

//IN절 사용?(xml)
/*.JAVA */
parameters.put("P_PROC_PIPE", proc_pipe);
parameters.put("P_PROC_LIST", Arrays.asList(proc_pipe.split("\\|")));

/*MyBatis 
<if test="@com.douzone.comet.service.util.mybatis.MyBatisUtil@isNotNullOrEmpty(P_ACCT_CD_PIPE)">
	INNER JOIN (
		   SELECT A.CTRL_ACTV_SQ
		   FROM @{dzparam_dbname}IA_PRTSKLVCOAM_INFO A
		WHERE A.COMPANY_CD = #{P_COMPANY_CD} AND A.EVAL_PRID_SQ = #{P_EVAL_PRID_SQ} AND A.MVOT_FG = '1' 
		  AND A.ACCT_CD IN
				 <foreach collection="P_ACCT_CD_LIST" index="index" item="item" open="(" separator="," close=")">
					   #{item}
				 </foreach>
				  ) M
				  ON CD.CTRL_LV_CD = '2' AND CD.CTRL_CLAS_SQ = M.CTRL_ACTV_SQ
	</if>*/

//날짜저장
import com.douzone.comet.service.util.StringUtil;
StringUtil.getLocaleTimeString(item.getStart_ym(), "yyyyMM");

//choose , when, otherwise 사용(xml)
<if test='P_TEAM_CD != null and P_TEAM_CD != ""'> 
  		  AND B.TEAM_CD  = #{P_TEAM_CD}
  		  </if>
  		  <choose>
  		  <when test='P_PART_CD != null and P_PART_CD != ""'>
  		  		AND B.PART_CD  = #{P_PART_CD})
  		  </when>
  		  <otherwise>
  		  		)
  		  </otherwise> 
  		  </choose>

//import 함수 선언
@Autowired

/* */
@Transactional(rollbackFor = Exception.class)
	@DzApi(url="/selectNprdqr00770_save_getCheckedRows", desc="구독권발행정보 다중체크 저장", httpMethod=DzRequestMethod.POST)
	public void selectNprdqr00770_save_getCheckedRows(
		@DzParam(key="MainDataSource", desc="구독권발행정보데이터", paramType = DzParamType.Body) DzGridModel <Nprdqr00770_MAIN_LIST_z10075> MainDataSource,
		@DzParam(key="DtlDataSource", desc="구독권내역데이터", paramType = DzParamType.Body) DzGridModel <Nprdqr00770_MAIN_LIST_z10075> DtlDataSource
	) throws Exception {
	    try {
	        // insert 구독권발행정보
	        for(Nprdqr00770_MAIN_LIST_z10075 MainRow : MainDataSource.getAdded()) {
	        	MainRow.setCompany_cd(this.getCompanyCode());
	        	MainRow.setInsert_id(this.getUserId());
	        	MainRow.setInsert_ip(this.getRemoteHost());
	        	MainRow.setIssue_dt(StringUtil.getLocaleTimeString(MainRow.getIssue_dt() , "yyyyMM"));
	        	nprdqr00770Dao.insert_MAIN_LIST(MainRow);
	        	
	        	for(int i =0; i < Integer.parseInt(MainRow.getIssue_qt()); i++) {
	        		HashMap<String, Object> parameters = new HashMap<String, Object>();
	        		parameters.put("company_cd", this.getCompanyCode());
	        		parameters.put("issue_yy", MainRow.getIssue_yy());
	        		parameters.put("issue_sq", MainRow.getIssue_sq());
	        		List<Nprdqr00770_MAIN_LIST_z10075> nprdqr00770Dtl = new ArrayList<Nprdqr00770_MAIN_LIST_z10075>();
	        		nprdqr00770Dtl = nprdqr00770Dao.Nprdqr00770_DTL_MAX_List(parameters);
	        		String Num = "";
	        		if(nprdqr00770Dtl.get(0).getGift_no().length() > 1) {
	        			Num = String.valueOf((Integer.parseInt(nprdqr00770Dtl.get(0).getGift_no().substring(6)) + 1));
	        			if(String.valueOf(Num).length() == 1) {
	        				Num = "0" + Num;
	        			}
	        		} else {
	        			Num = "0" + String.valueOf((Integer.parseInt(nprdqr00770Dtl.get(0).getGift_no()) + 1));
	        		}
	        		parameters.put("gift_no", MainRow.getIssue_yy() + MainRow.getIssue_sq() + Num);
	        		if(MainRow.getSubscript_fg().equals("1")) {
	        			parameters.put("mm_cnt", 6);
	        		} else if(MainRow.getSubscript_fg().equals("2")) {
	        			parameters.put("mm_cnt", 12);
	        		} else {
	        			parameters.put("mm_cnt", 0);
	        		}
	        		parameters.put("subscript_fg", MainRow.getSubscript_fg());
	        		parameters.put("use_yn", "Y");
	        		parameters.put("sale_yn", "N");
	        		parameters.put("rmk_dc", MainRow.getRmk_dc());
	        		parameters.put("insert_id", this.getUserId());
	        		parameters.put("insert_ip", this.getRemoteHost());
	        		 
	        		nprdqr00770Dao.insert_DTL_LIST(parameters);
	        	}
	        }
	    } catch (Exception e) {
	        throw new DzApplicationRuntimeException(e);
	    }
	}
	/* */

	/* */
	<if test='P_CALCTYPE != ""'>
	AND a.READER_KIND_FG = #{P_CALCTYPE}
</if>
<choose>
	<!-- 환불정산사용여부 (전월선택) -->
	<when test='P_CB1.equals("1") and P_MONTH.equals("")'>
		AND NVL(a.CALC_USE_YM, '100001') != '100001'
	</when>
	<!-- 환불정산사용여부 (특정월선택) -->
	<when test='P_CB1.equals("1") and P_MONTH != ""'>
		AND NVL(a.CALC_USE_YM, '100001') = #{P_MONTH}
	</when>
</choose>	
/*JAVA
원하는 출력	입력

\		\\
'		\'
"		\"

*/
/*MyBatis

gt(>), lt(<), gte(>=), lte(<=)

&gte;

&gt;

TO_CHAR(SYSDATE, 'YYYYMMDD') &gte; >= TO_CHAR(

<![CDATA[>=]]>  */ 

/*
JAVASCRIPT
1월 January 	 (Jan)
2월 February 	 (Feb)
3월 March    	 (Mar)
4월 April       	 (Apr)
5월 May       	 (May)
6월 June      	 (Jun)
7월 July        	 (Jul)
8월 August    	 (Aug)
9월 September  (Sep)
10월 October 	 (Oct)
11월 November  (Nov)
12월 December (Dec)

setFullYear: 연도를 설정한다.
setMonth:(0 ~ 11) 월 [ 여기서 1월은 0이고 12월은 11이다 ]을 설정한다.
setDate: (0 ~ 31). 날짜 [0을 설정한 경우 이전 달의 가장 마지막 날을 설정한다.]를 설정한다. 
setHours: (0 ~ 23). 시간을 설정한다.
setMinutes: (0 ~ 59). 분을 설정한다.
setSeconds: (0 ~ 59). 초를 설정한다.
setMilliseconds: (0 ~ 999). 밀리 초를 설정한다.


getFullYear: 연도를 반환한다.
getMonth:(0 ~ 11) 월 [ 여기서 1월은 0이고 12월은 11이다 ]을 반환한다.
getDate: (1 ~ 31). 날짜를 반환한다.
getHours: (0 ~ 23). 시간을 반환한다.
getMinutes: (0 ~ 59). 분을 반환한다.
getSeconds: (0 ~ 59). 초를 반환한다.
getMilliseconds: (0 ~ 999). 밀리 초를 반환한다.

*/