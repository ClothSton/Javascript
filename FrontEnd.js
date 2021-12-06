

//그리드 현재포커스 로우 데이터
self.grid_mst.dataItem(self.grid_mst.select()).EXP_DT

//null 체크
function isEmpty(data) {
    if(data === "" || data === undefined || data === null || data.length === 0) {
      return true;
    } else {
      return false;
    }
  }

//폼패널 활성화/비활성화
function CtrlReadOnly(Flag){
    //var targetItem = self.grid1.
    //센터정보
      self.date_Rcpt_Dt.readonly(Flag);
      self.cp_G_Center.readonly(Flag);
      self.tb_G_Tel.readonly(Flag);
      self.tb_G_CHIEF.readonly(Flag);
      self.tb_G_Phone.readonly(Flag);
      self.cp_T_Center.readonly(Flag);
      self.tb_T_Tel.readonly(Flag);
      self.tb_T_CHIEF.readonly(Flag);
      self.tb_T_Phone.readonly(Flag);
}

//폼패널 초기화
function initClear(){
    //센터정보
    self.date_Rcpt_Dt.text("");
    self.cp_G_Center.text("");
    self.tb_G_Tel.text("");
    self.tb_G_CHIEF.text("");
    self.tb_G_Phone.text("");
    self.cp_T_Center.text("");
    self.tb_T_Tel.text("");
    self.tb_T_CHIEF.text("");
    self.tb_T_Phone.text("");
}
//버튼 비활성화 활성화
if(self.dataSource1.data().length > 0){
    self.$bt_ADD.removeClass("k-state-disabled");
    self.$bt_DEL.removeClass("k-state-disabled");
    self.$bt_ADD.prop("disabled", false);
    self.$bt_DEL.prop("disabled", false);
    CtrlReadOnly(false);
  } else{
    dews.ui.snackbar.info(gerp.MA.MSG.SEARCH_NO_DATA_ALERT);
    self.$bt_ADD.addClass("k-state-disabled");
    self.$bt_DEL.addClass("k-state-disabled");
    self.$bt_ADD.prop("disabled", true);
    self.$bt_DEL.prop("disabled", true);
    CtrlReadOnly(true);
  }

//드롭다운리스트값에 따라 드롭다운리스트 재매핑
self.P_Drop_Move_Fg.on('change', /*b450102b-79bd-48b0-bef1-9a59e1c06f22*/ function(e) {
      if(self.P_Drop_Move_Fg.value() != "")
      {
       self.P_Drop_Item.enable(true);
       dews.api.get(dews.url.getApiUrl('NP', 'Nprdqr00490Service_z10075', 'nprdqr00490_code_list' ), {
          async: false,
          data:{
            move_fg: self.P_Drop_Move_Fg.value()
          }
        })
        .done(function (data){
          for(var i =0; i < data.length; i++){
            TypeDrop.push(data[i]);
          }
        })
        .fail(function (xhr, status, error){
          dews.error(dews.localize.get("코드관리 조회 오류입니다. (CI)", 'D0000662'));
        });

        var MoveFgDT = dews.ui.dataSource('auMonDropData', {
          data: TypeDrop
        });

        self.P_Drop_Item.setDataSource(MoveFgDT);
      }
      else
      {
         self.P_drop.P_Drop_Item.enable(false);
         self.P_Drop_Item.setDataSource(null);
      }
    });

//조회기간초기값 Default : 시작 : 현재일-1개월 / 종료 : 현재일
 var now = new Date();
 self.P_Date.setStartDate(dews.date.format(new Date(now.setMonth(now.getMonth() - 1)), 'yyyyMMdd'));
 self.P_Date.setEndDate(dews.date.format(new Date(), 'yyyyMMdd'));

//Jquery AJAX 공통소스 적용
$.when(
          dews.ajax.script('~/view/js/AU/au.cm.js', { once: true, async: false }),
          dews.ajax.script('~/view/js/MA/ma.cm.msg.js', { once: true, async: false }),
          dews.ajax.script('~/view/js/CM/cm.bscm.js', { once: true, async: false })//,
        ).done(function () {
        });

//공통코드 추가 후 드롭다운에 바인딩[구독구분 (NP / A00405)]
 self.pipeDataSource = gerp.CM.getCodeDtlDataSource("NP", "A00405", null, null, null, null, null);
 self.pipeDataSource_A00405 = self.pipeDataSource.NP.A00405;
 self.P_Drop_Read_Yn.setDataSource(self.pipeDataSource_A00405);

//디버깅 소스 표시
 //# sourceURL=view/AU/ABMITM00300.js