/* 확장프로그램
ESLint  (자바스크립트 문법을 체크합니다.)
Relative Path  (상대 경로에 있는 파일 경로를 편하게 작성할 수 있는 도구입니다.)
Reactjs code snippets (리액트 관련 스니펫 모음 제작자가 Charalampos Karypidis)
*/

//공통 소스경로
//C:\Douzone\dews-web\view\js\MA

//그리드 엑셀 통화 포멧적용
formats: {
  currency : "KRW"  //통화 포멧
}
//혹은
Grid._grid.setColumnProperty("COULMN", 'excelFormat', '#,##0');


//배열쪼개기
var result = [];
var count = 2000;
if(listData.length >= 2000){
  for(var i = 0; i < initData.list.length; i += count){
    var listdata;
    listdata = initData.list.slice(i, i + count);
    result.push(listdata);
  }
  return result;
}else{
  return listdata;
}

//그리드 컬럼 스타일 변경
style: function (e) {
  var DisabledStyle = {
    background: '#e0e0e0'
  };

  var EnabledStyle = {
    background: '#ffffff'
  }

  if(e.row.data.AAA == ""){
    setTimeout(function(){
      dewself.grid.setCellStyle(e.row.index, "MNG_DC3", DisabledStyle);
    })
  } else{
    setTimeout(function(){
      dewself.grid.setCellStyle(e.row.index, "MNG_DC3", EnabledStyle);
    })
  }
};

//공통 선언
var IA;
    var pridClose;
    dews.ajax.script('~/view/js/IA/ia.cm.js', {
      once: true,
      async: false
    }).done(function () {
      IA = gerp.IA;
    });

//API호출방법
dews.api.get(dews.url.getApiUrl('IA', 'SetTestEnvironmentSTEService', dews.string.format('istste00100_list')), {
  async: false,
}).done(function (data){
  //데이터 가공영역
  var defaultGubn = IA.COMMON.getEvalPlanDefault();
  for(var i =0; i < data.length; i++){
    if(defaultGubn.DATA1 == data[i].EVAL_PRID_SQ)
    {
      STATE = data[i].STATE;
    }
  }
})

//메뉴이동
dews.ui.openMenu('IA', 'IAIAIM00200');

//Dialog로 넘겨진 데이터 불러오기
var dialog = dews.ui.dialog(self.id);
var init = dialog.getInitData();

//그리드 드롭다운 공통코드 사용
[
  {
    field: "BIL_TYPE",
    title: "위수탁/즉시발행구분",
    width: 120,
    editor: {
      type: "dropDown",
      dataSource: self.ds_billtype,
      dataValueField: "SYSDEF_CD",
      dataTextField: "SYSDEF_NM",
    },
  },
];

self.ds_billtype = dews.ui.dataSource('ds_billtype', {
  transport: {
    read: {
      url: dews.url.getApiUrl('CM', 'CommonCodeDtlService', 'common_codeDtl_list'),
      data: function () {
        return {
          base_dt: '',
          end_dt: '',
          foreign_yn: '',
          field_cd_pipe: 'A00401',
          module_cd: 'NP',
          syscode_yn: '',
          keyword: '',
          base_yn: ''
        };
      }
    }
  },
  schema: {
    model: {
      fields: [
        { field: 'MODULE_CD', editable: false, type: 'string' },
        { field: 'FIELD_CD', editable: false, type: 'string' },
        { field: 'SYSDEF_CD', editable: false, type: 'string' },
        { field: 'SYSDEF_NM', editable: false, type: 'string' },
        { field: 'FLAG_CD', editable: false, type: 'string' },
        { field: 'END_DT', editable: false, type: 'string' },
        { field: 'SYSCODE_YN', editable: false, type: 'string' },
        { field: 'DRS_CD', editable: false, type: 'string' },
        { field: 'SELECTABLE', editable: false, type: 'string' },
        { field: 'DISP_SQ', editable: false, type: 'number' },
        { field: 'RMK_DC', editable: false, type: 'string' },
        { field: 'REL_FLAG_1_CD', editable: false, type: 'string' },
        { field: 'REL_FLAG_2_CD', editable: false, type: 'string' },
        { field: 'REL_FLAG_3_CD', editable: false, type: 'string' },
        { field: 'REL_FLAG_4_CD', editable: false, type: 'string' },
        { field: 'REL_FLAG_5_CD', editable: false, type: 'string' },
        { field: 'UP_SYSDEF_CD', editable: false, type: 'string' },
        { field: 'UP_MODULE_CD', editable: false, type: 'string' },
        { field: 'UP_FIELD_CD', editable: false, type: 'string' },
        { field: 'HIKEY_YN', editable: false, type: 'string' }
      ]

    }
  }
});

//그리드 포커스 확인
self.grid.focused

//그리드 컬럼 데이터 삽입
grid.setCellValue(0, 'Name', '김더존');

//날짜 포멧
dews.date.format(endDate, 'yyyyMMdd')

//그리드 현재포커스 로우 데이터
self.grid_mst.dataItem(self.grid_mst.select()).EXP_DT

function isNullToZero(data){
  if(data === "" || data === undefined || data === null || data.length === 0){
    return "";
  } else{
    return data;
  }
}

//null 체크
function isEmpty(data) {
    if(data === "" || data === undefined || data === null || data.length === 0) {
      return true;
    } else {
      return false;
    }
  }

//폼패널 바인딩
self.grid1.bindPanel(self.panel1);

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
 

  //엑셀업로드
  function excelUpload() {
    console.log("sss " + self.ds_paytype);
  
    var opt = {
      fillData: 'append',
      mapping: {
        'SQ_NO  ': '순번'
        , 'PARTNER_CD': '거래선'
        , 'EXP_DT': '접수일자'
        , 'READ_FG_NM': '구독구분'
        , 'GEMP_NM': '확장자'
        //, 'GEMP_NO': '확장자ID'
        //, 'READER_GROUP_CD_NM': '단체명'
        , 'PAY_TYPE_CD_NM': '납부방법'
        , 'EXPANDER_FG_NM': '확장자구분'
        , 'READER_KIND_FG_NM': '정산구분'
        , 'COLLT_START_YM': '첫수금월'
        , 'READR_NM': '구독자명'
        , 'OFFICE_TEL': '구독자전화번호'
        , 'HANDPHONE': '구독자핸드폰'
        , 'POST_NO': '우편번호'
        , 'ADDR1': '주소'
        , 'ADDR2': '주소상세'
        , 'CTR_CD_NM': '관할센터'
        , 'MEDIA_CD_NM': '구독매체'
        , 'BUSU_CNT': '부수'
        , 'LIVE_FG_NM': '거주형태'
        , 'RQS_DELIVERY_DT': '배달게시일'
        , 'DC': '비고'
      },
      fileDialog: true
    };
  
    self.grd_main.importExcel(opt).done(function (result) {
      //데이터 변환 로직 넣으면된다능
    }).fail(function (error) {
      // excel 이 정상적으로 import 되지 않았을 경우 동작할 로직 구현
    });
  }
  
  //foreach
  $.each(self.ds_read_fg.data(), function (index, item) {
    if (self.ds_read_fg.data()[index].SYSDEF_CD == self.grd_main.getCellValue(grdindex, "READ_FG_NM")) {
      self.grd_main.setCellValue(grdindex, "READ_FG", self.ds_paytype.data()[index].SYSDEF_NM)
    }
  });


  //디버깅 소스 표시
 //# sourceURL=view/AU/ABMITM00300.js