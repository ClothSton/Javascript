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