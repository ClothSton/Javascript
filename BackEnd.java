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
<foreach collection="P_AUPI_CD_PIPE" index="index" item="item" open="(" separator="," close=")">
				#{item}
			</foreach>

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
	/* */