//쿼리 분기태우기
 <if test='p_cpk_extennm != null and !"".equals(p_cpk_extennm)'>

//IN절 사용?
<foreach collection="P_AUPI_CD_PIPE" index="index" item="item" open="(" separator="," close=")">
				#{item}
			</foreach>

//날짜저장
import com.douzone.comet.service.util.StringUtil;
StringUtil.getLocaleTimeString(item.getStart_ym(), "yyyyMM");