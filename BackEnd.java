//쿼리 분기태우기
 <if test='p_cpk_extennm != null and !"".equals(p_cpk_extennm)'>

//IN절 사용?
<foreach collection="P_AUPI_CD_PIPE" index="index" item="item" open="(" separator="," close=")">
				#{item}
			</foreach>

