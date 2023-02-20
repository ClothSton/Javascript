//동적페이지
<div class="notice-list-area">
</div>

<script>
    var $listArea = $('.notice-list-area', $container);

    $listArea.empty();
        $detailArea.empty();
        $('#pager', $container).hide();
        $listArea.append('<div class="list-empty-text"><div class="ico-empty-list"></div>' + dews.localize.get('등록된 게시글이 없습니다.', 'notice-empty-list') + '</div>');
        $detailArea.append('<div class="no-select-detail"><div class="img-no-select-detail"></div>' + dews.localize.get('선택된 목록이 없습니다.', 'notice-no-selected') + '</div>');
</script>

//메세지박스안에 메세지박스를 넣는 방법 (mainbuttons.delete.click 를 예로들면)
//최상단에 
dews.ui.mainbuttons.delete.useDefaultConfirm = false;

dews.ui.mainbuttons.delete.click(/*7b6b352c-c2a0-4fca-a8a6-d828f913c9f4*/ function() {
    var confirm = dews.confirm(gerp.MA.MSG.DELETE_CONFIRM, "ico2")
        .yes(function () {
          confirm.dialog.dialog.bind('deactivate', function () {
            deleteData();
          })
        })
        .no(function () {
          return false;
        })
  });

  function deleteData() {
    if (self.grid1.dataItems().length > 0) {
      if (self.grid1.dataItems(self.grid1.select()).MAGAM_YN == "Y") {
        dews.alert("마감된 데이터는 삭제할 수 없습니다.", "error");
      } else {
        self.grid1.removeRow(self.grid1.select());
      }
    }
  }

/*html 방식 : < id='box' style='color: red;'>
JavaScript 방식 : box.style.color = 'red';

숫자단위표기법
-----------------------------------------
<script>
    // 방법1
    test.style.width = '400px';
    test.style.height = '400px';
    test.style.backgorundColor ='blue';
    
    // 방법2
    test.style['width'] = '400px';
    test.style['background-color'] = 'blue';
</script>

문자열로된 속성값 조작
----------------------------------------
<script>
    // 1. 문자열로 변한 속성값을 parseInt로 숫자형으로 변경한다.
    // 2. 숫자형으로 변하여 단위가 사라졌으므로 문자열 단위를 붙여준다.
    test.style.width = parseInt(test.style.width) * 2 + 'px';
</script>
*/

//추가한 컨트롤 숨기기
$("컨트롤네임", self.$content).hide();
//추가한 컨트롤 보여주기
$("컨트롤네임", self.$content).show();

//추가한 html 삭제하기
$("#content_ITAOTS00200 tr").remove(".active_table");

//메뉴 로그 찍기
$(document).keydown(function (e) {
    if (e.altKey && e.ctrlKey && e.shiftKey && e.keyCode == '220') {
      dews.api.post(dews.url.getApiUrl("IA", "ICFRSetTestEnvironmentTTSService", "isttts00400_prtsklv_log"), {
        async: false,
        data: {
          press_werning: press_werning,
          scop_prid_sq: Scop_prid_sq
        }
      })
        .done(function (data) {
          var initData = { data: data}
          var dialog = dews.ui.dialog("ISTTTS00400_POP1", {
            url: "/view/IA/ISTTTS00400_POP1",
            title: "쿼리확인",
            width: 800,
            height: 600,
            initData: initData,
            ok: function (data){

            }
          });
          dialog.open();
        })
        .fail(function (xhr, satus, error) {
          dews.error(error);
        });
    }
  });

/*소계 footer 따로 설정할 경우 시작 -------------------------------------------------------------------------*/
//그리드셋팅에서 설정
footer: {
    callback: function(column){
        var sum = 0;
        $.each(self.grid.sortDataItems(), function (idx, item) {
            sum += Number(item.GUBUN == '1' ? item[column.fieldName] : 0);
        });
        
        return sum.format();
    }
}

databound: function (e){
    var sumIndexArr = [], sumStyle = { background: '#ffecdb', fontBold: true};
    var resetIndexArr = [], resetStyle = { background: '#ffffff', fontBold: false};

    $(e.grid.sortDataitems()).each(function (idx, item) {
        if(item.GUBN == '2'){
            sumIndexArr.push(idx);
            e.grid.setDisableCheck(idx, true);
        } else{
            resetIndexArr.push(idx);
            e.grid.setDisableCheck(idx, false);
        }
    });

    e.grid.setRowStyle(sumIndexArr, sumStyle);
    e.grid.setRowStyle(resetIndexArr, resetStyle);

    dews.ui.loading.hide();
    
    if(e.row.data.length <= 0){
        dews.ui.snackbar.info(gerp.MA.MSG.SEARCH_NO_DATA_ALERT);
    }
}
/*소계 footer 따로 설정할 경우 끝 -------------------------------------------------------------------------*/

//공통 소스경로
//C:\Douzone\dews-web\view\js\MA
if(self.ddl_gurae.value() != "1"){
    $("#ddl_flag", self.$content).css("display", "none");
  } else{
    $("#ddl_flag", self.$content).css("display", "block");
  }

//CSS숨김처리 시작-----------------------------------------------------------------------------------------
<tr style="display:none;"> 
                      <th class='left dews-ui-multilingual' >불참자</th>
                      <td style="border-right: 1px solid #e1e1e1 !important;">
                      	<select id="EMP_NO12" name="EMP_NO12" type="text" class="dews-ui-multicodepicker"  data-dews-code-field="EMP_NO" data-dews-text-field="KOR_NM" data-dews-help-code="H_HR_EMP_MST_S02" data-dews-help-size="big"  data-dews-help-title="사원 도움창"></select>
                        </td> 
                    </tr>
//CSS숨김처리 끝-----------------------------------------------------------------------------------------

//Object Type Sort
var data2 = data.sort(function (a, b){
       return a.CODE - b.CODE;
     });

//그리드 컬럼 너비 조절
self.grid._grid.setColumnProperty("IN_HEADER","width", width_value); 

//현재선택된 탭 확인
var tabId = self.tabPanel.openItem._item[0].id;

//현재탭이 선택됐는지 확인
if(self.$tab1.attr('class').includes('on'))

//그리드 첨부파일 컬럼 파일존재유무 이미지 삽입하기
style: function (e){
    var style = { icon: { position: 'center'}};
    if(e.row.data.SGNT_FGRP_SQ != null){
      style.icon.image = '/view/images/IA/file_icon.png';
    }
    return style;
  }

/*재귀함수 사용
//트리구조 재귀 돌려서 값 변경 2022.03.16 CS:)
      for(var i = 0; i < Ds.length; i++){
        TreeFindChildren(Ds[i].items);
      }
*/

//재귀함수
function TreeFindChildren(items) {
  $.each(items, function (idx, item) {
    if (!isEmpty(item.items)) {
      TreeFindChildren(item.items);
    }
    ValueChange(item);
  })
}
function ValueChange(data){
  for(var i = 1; i <= 7; i++){
    var str = "COMP" + i;
    var str2 = "ICON" + i;
    data[str2] = data[str] === '1' ? "O" : data[str] === '2' ? "△" : data[str];
  }
}

//그리드 엑셀다운로드
self.grid.saveAsExcel({fileName: '엑셀파일명', lookupDisplay: true /*화면데이터그대로 저장여부*/})

//그리드 코드피커 비활성화
dews.ui.grid(self.$grid_mst, {
  dataSource: self.MainGridDataSource,
  height: 200,
  editable: true,
  selectable: true,
  copyMode: 'cell',
  columns: [
  {
  field: 'ISSUE_ID',
  title: '발행자ID',
  width: 60,
  editor: {
    type: 'codepicker',
    helpCode: 'H_CI_USER_MST_S',
    codeField: 'USER_ID',
    textField: 'USER_NM',
    gridCodeField: 'ISSUE_ID',
    gridTextField: 'ISSUE_NM',
    helpTitle: '사용자 도움창',
    helpSize: 'medium',
    editable: function (e){
      if (e.row.data.ISSUE_ST == "15") {
        return false;
      }
      return true;
    },
    helpParams: function () {
      return {
        company_cd: '',
        menugrp_cd: ''
      };
    }
  }
  }
  ]
},

//너의위치 이벤트 //openweathermap.org/api 에서 현재값파라미터로 넘겨줄때의 API찾아서 날씨 찍어줄수있음
function onGeoOk(position){
  var lat = position.coords.latitude;
  var lng = position.coords.longitude; 
  console.log("You live it", lat, lng);
},
function onGeoError(){
  alert("Can't find you. No weather for you.");
},
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError),

//window이벤트
function handleWindowResize(){
  document.body.style.backgrundColor = "tomato";
};
//사이즈가 변경되었을때 발생
window.addEventListener("resize", handleWindowResize);
//wifi가 연결되었을때 발생
window.addEventListener("online", event);
//wifi가 연결해제되었을때 발생
window.addEventListener("offline", evnet);

//HTML이벤트
var title = document.querySelector("div.hello:first-child h1");
function handleTitleClick(){
  title.style.color = "blue";
}
title.addEventListener("click", handleTitleClick); 
title.onclick("click", handleTitleClick);

//리로드
document.getElementById(self.id).onreload = function() {
  searchData();
}

//다른 클래스 호출
document.getElementById('IAWD_210316_0002').onreload();

//그리드 editable 설정
dewself.grid.setOptions({ editable: self.mcpCdCorp.length > 1 ? false : true})

//CSS display
$("#tabUpS_table1 .dews-ui-td-result .dews-dropdownlist-wrapper", self.$content).css("display", "none"); //평가결과 숨기기
$("#btnDelete", dewself.$content).css("display", "none");
if(data.length > 0){
  $("#itaots_num", self.$content).text(data.length);
}else{
  $(".itaots span", self.$content).css("display", "none");  //숨기기
  $(".itaots span", self.$content).css("display", "block"); //보이기
}
//CSS BINDING
$("#content_ITADTP00400 #CTRL_ACTV_NM").text("["+ rowData.ACTV_CD + "] " + rowData.ACTV_NM);

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

self.$ENT_OASMT_YN.prop('checked', data.ENT_OASMT_YN === 'Y' ? true : false);

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
    //활성화
    self.$bt_ADD.removeClass("k-state-disabled");
    self.$bt_DEL.removeClass("k-state-disabled");
    self.$bt_ADD.prop("disabled", false);
    self.$bt_DEL.prop("disabled", false);
    CtrlReadOnly(false);
  } else{
    //비활성화
    dews.ui.snackbar.info(gerp.MA.MSG.SEARCH_NO_DATA_ALERT);
    self.$bt_ADD.addClass("k-state-disabled");
    self.$bt_DEL.addClass("k-state-disabled");
    self.$bt_ADD.prop("disabled", true);
    self.$bt_DEL.prop("disabled", true);
    CtrlReadOnly(true);
  }

  //버튼 숨기기 보이기
if(self.ddl_gubn.value() == '1'){
   self.detail_gubn.setDataSource(ar_A00432);
   $("#chkmain", self.$content).css("display", "none");
   self.chk.check(false);
} else if(self.ddl_gubn.value() == '2'){
   self.detail_gubn.setDataSource(ar_A00433);
   $("#chkmain", self.$content).css("display", "block");
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

  //view/js/damg.js
(function (dews, gerp, $) {

  var module = {};
  var moduleCode = "CX"; //모듈 코드

  var DateEnum = {
      DATE : 1,   //일
      MONTH : 2,  //월
      YEAR : 3,   //년
      HOUR : 4,   //시
      MINUTE : 5, //분
      SECOND : 6, //초
      LAST_DAY_OF_MONTH : 7,  //월 마지막 일
      WEEK_OF_MONTH : 8,      //월의 주
      WEEK_OF_YEAR : 9,       //년의 주
      DAY_OF_WEEK : 10        //요일
  };
  
  /*module = (function () {
      return {

      }
  })();*/
  
   module.StringUtil = {
      /**
       * @section Description
       * @details 입력 받은 padChar 문자를 문자열 sourceString의 왼쪽에 문자열 길이가 totalLength 만큼 되도록 문자를 덧댄다.
       * @author 강진혁(jhkang1313@douzone.com)
       * - @param String sourceString 입력 문자열
       * @param String padChar 덧댈 문자
       * @param Number totalLength 문자열 전체 길이
       * - @return String 변환 문자열
       * @example var dateString = stringUtil.padLeft("abcd", "*", 6);
       */
      padLeft : function(sourceString, padChar, totalLength) {
        if(typeof sourceString != "string"){
          sourceString = sourceString + "";
        }
        var padding = "";
        for(var i = 0 ; i < totalLength ; i++){
          padding += padChar;
        }
        return padding.substring(sourceString.length) + "" + sourceString;
      },
      /**
       * @section Description
       * @details 입력 받은 문자열이 숫자인지 확인한다.
       * @author hram1028
       * - 
       * @param String 입력 문자열
       * @param String 숫자 체크 구분
       * 1: 모든 10진수 (부호 선택, 자릿수구분기호 선택, 소수점 선택)
       * 2: 부호 미사용, 자릿수구분기호 선택, 소수점 선택
       * 3: 부호 미사용, 자릿수구분기호 미사용, 소수점 선택
       * 4: only 숫자만(부호 미사용, 자릿수구분기호 미사용, 소수점 미사용)
       * - @return boolean 숫자 여부
       * @example var dateString = stringUtil.isNumeric('10,290', '')
       */
      isNumeric : function(num, opt){
          num = String(num).replace(/^\s+|\s+$/g, "");

          if (typeof opt == "undefined" || opt == "1") {
              var regex = /^[+\-]?(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
          } else if (opt == "2") {
              var regex = /^(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+){1}(\.[0-9]+)?$/g;
          } else if (opt == "3") {
              var regex = /^[0-9]+(\.[0-9]+)?$/g;
          } else {
              var regex = /^[0-9]$/g;
          }

          if (regex.test(num)) {
              num = num.replace(/,/g, "");
              return isNaN(num) ? false : true;
          } else { return false; }
      }
  }


  module.ExcelUtil ={
      /**
       * @section Description
       * @details fileButton에서 선택한 파일과 처리할 API URL, 서버단 처리 완료시 작업할 CallBack 함수를 정의하여 선택한 엑셀파일 서버로 전송
       * @author 강진혁(jhkang1313@douzone.com)
       * - @param Object e 파일 탐색기에서 선택한 파일 객체
       * @param String url 업로드 처리할 서버 API URL
       * @param function callback 업로드 처리 이후 동작 로직
       * @example  excelUtil.upload(e, dews.url.getApiUrl("FI", "SampleService", "sample00700_list_excel_upload"), function(data){
       *             self.gridDataSource.data(data);
       *             self.grid.setDatSource(gridDataSource);
       *           })
       */
      upload : function(e, url, callback, apiParams) {
          var formData = new FormData();
          formData.append('file', e.target.files[0]);
          formData.append('isText', 'false');
          formData.append('token', JSON.parse(dews.ui.page.token).access_token);
          
          var xhr = new XMLHttpRequest();
          xhr.open('POST', "/upload/file", true);
          
          var completeHandler = function (e) {
              var fileData = {};
              if (this.status === 200) {
                  var data = JSON.parse(this.responseText);

                  if (data.success === 'true') {
                      data = data.data;
                      fileData.NEW_FILE_DC = data.newFilename;
                      fileData.ORGL_FILE_DC = data.originalFilename;
                      fileData.ORGL_FEXTSN_DC = data.originalExtension;
                      fileData.FILE_VR = parseInt(data.fileSize, 10);
                      
                      newParams = {
                        fileModel : JSON.stringify(fileData)
                      };

                      if(apiParams != undefined){
                        $.each(Object.keys(apiParams), function(idx, data){
                          newParams[data] = apiParams[data];
                        });
                      }
                      dews.api.post(url, {
                          async : false,
                          data : newParams
                      }).done(function(data){
                          callback(data);
                      }).fail(function (xhr, status, error) {
                        var err = {
                          xhr : xhr,
                          status: status,
                          error : error
                        };
                        callback(err);
                      });
                  }
              }
          };
      
          xhr.addEventListener('load', completeHandler);
          xhr.send(formData);
      },
      formDownload : function(fileName, fileTitle){
          var xhr = new XMLHttpRequest();
          xhr.open("GET", window.location.origin+"/download/excel?excel=" + fileName, true);
          xhr.setRequestHeader("X-Authenticate-Token", JSON.parse(dews.ui.page.token).access_token);
          xhr.responseType = "blob";
          xhr.send();
          xhr.onload = function(e) {  
              if(window.navigator && window.navigator.msSaveOrOpenBlob){
                  window.navigator.msSaveOrOpenBlob(xhr.response, fileTitle);
              } else {
                  var element = window.document.createElement("a");
                  element.href = window.URL.createObjectURL(xhr.response);
                  element.download = fileTitle;
                  element.click();
              }
          };
      },
      /**
       * @section Description
       * @details 서버에서 작성된 Excel 파일을 다운
       * @author 강진혁(jhkang1313@douzone.com)
       * - @param Object data 서버에서 작성한 Excel 파일. DzDownloadModel
       * @example  
       *  dews.api.get(dews.url.getApiUrl("FI", "SampleService", "sample00800_excel_download"), {
       *    async : false
       *  }).done(function(data){
       *    excelUtil.download(data);
       *  });
       */
      download : function(data) {
          var fileData = new Blob([new Uint8Array(data.file)], {type : data.contentType});
          if(window.navigator && window.navigator.msSaveOrOpenBlob){
              window.navigator.msSaveOrOpenBlob(fileData, data.fileName);
          } else {
              var anchorTag = window.document.createElement('a');
              anchorTag.href = window.URL.createObjectURL(fileData);
              anchorTag.download = data.fileName;
              document.body.appendChild(anchorTag);
              anchorTag.click();
              document.body.removeChild(anchorTag);
          }
      }  
  };

  module.DateUtil = {        
      DateEnum : DateEnum,
      /**
       * @section Description
       * @details Date 형 데이터와 날짜 필드(정수형)를 입력 받아 날짜 필드 반환
       * @author 강진혁(jhkang1313@douzone.com)
       * - @param Date sourceDate 입력 날짜
       * @param Number dateEnum 입력 날짜 필드
       * - @return Number 반환 값
       * @example var dateValue = dateUtil.get(new Date(), dateUtil.DateEnum.DATE);
       */
      get : function(sourceDate, dateEnum) {
          var returnValue = undefined;
          if(!sourceDate instanceof Date) {
              console.log('DateUtil get Call : sourceDate is not Date Object Type');
          } else if (!dateEnum instanceof Number){
              console.log('DateUtil get Call : dateEnum is not DateEnum Type');
          } else {
              switch(dateEnum) {
                  case this.DateEnum.DATE :
                      returnValue = sourceDate.getDate();
                      break;
                  case this.DateEnum.MONTH :
                      returnValue = sourceDate.getMonth() + 1;
                      break;
                  case this.DateEnum.YEAR :
                      returnValue = sourceDate.getFullYear();
                      break;
                  case this.DateEnum.HOUR :
                      returnValue = sourceDate.getHours();
                      break;
                  case this.DateEnum.MINUTE :
                      returnValue = sourceDate.getMinutes();
                      break;
                  case this.DateEnum.SECOND :
                      returnValue = sourceDate.getSeconds();
                      break;
                  case this.DateEnum.LAST_DAY_OF_MONTH :
                      var year = this.get(sourceDate, this.DateEnum.YEAR);
                      var month = this.get(sourceDate, this.DateEnum.MONTH);
                      returnValue = (new Date(year, month, 0)).getDate();
                      break;
                  case this.DateEnum.DAY_OF_WEEK :
                      returnValue = sourceDate.getDay();
                      break;
                  case this.DateEnum.WEEK_OF_MONTH :
                      var date = this.get(sourceDate, this.DateEnum.DATE);
                      var day = this.get(sourceDate, this.DateEnum.DAY_OF_WEEK);
                      returnValue =  parseInt((6 + date - day) / 7) + 1;
                      break;
                  case this.DateEnum.WEEK_OF_YEAR :
                      var year = this.get(sourceDate, this.DateEnum.YEAR);
                      var month = this.get(sourceDate, this.DateEnum.MONTH);

                      var totalWeek = 0;
                      for (var i = month - 1; i > 0 ; i--){
                          totalWeek += this.get(new Date(year, month, 0), this.DateEnum.WEEK_OF_MONTH);
                      }
                      totalWeek += this.get(sourceDate, this.WEEK_OF_MONTH);
                      returnValue = totalWeek;
                      break;
                  default :
                      console.log('DateUtil get Call : dateEnum is invalid');
                      break;
              }
          }
          return returnValue;
      },
      /**
       * @section Description
       * @details Date 형 데이터와 날짜 필드(정수형), 증가 값을 입력 받아, 입력 날짜의 날짜 필드를 증가 값 만큼 더한 날짜 데이터 반환
       * @author 강진혁(jhkang1313@douzone.com)
       * - @param Date sourceDate 입력 날짜
       * @param Number dateEnum 입력 날짜 필드
       * @param Number value 증가 값
       * - @return Number 반환 값
       * @example var dateValue = dateUtil.add(new Date(), dateUtil.DateEnum.DATE, 2);
       */
      add : function(sourceDate, dateEnum, value){
          var returnValue = undefined;
          if(!sourceDate instanceof Date){
              console.log('DateUtil add Call : sourceDate is not Date Object Type');
          } else if(!dateEnum instanceof Number){
              console.log('DateUtil add Call : dateEnum is not DateEnum Type');
          } else if(!value instanceof Number){
              console.log('DateUtil add Call : value is not Number Type');
          } else {
              switch(dateEnum){
                  case this.DateEnum.DATE :
                      returnValue = new Date(sourceDate.setDate(sourceDate.getDate() + value));
                      break;
                  case this.DateEnum.MONTH :
                      returnValue = new Date(sourceDate.setMonth(sourceDate.getMonth() + value));
                      break;
                  case this.DateEnum.YEAR :
                      returnValue = new Date(sourceDate.setFullYear(sourceDate.getFullYear() + value));
                      break;
                  case this.DateEnum.HOUR :
                      returnValue = new Date(sourceDate.setHours(sourceDate.getHours() + value));
                      break;
                  case this.DateEnum.MINUTE :
                      returnValue = new Date(sourceDate.setMinutes(sourceDate.getMinutes() + value));
                      break;
                  case this.DateEnum.SECOND :
                      returnValue = new Date(sourceDate.setSeconds(sourceDate.getSeconds() + value));
                      break;
                  default :
                      console.log('DateUtil get Call : dateEnum is invalid');
                      break;
              }
          }
          return returnValue;
      },
      /**
       * @section Description
       * @details Date 형 데이터를 2개와 날짜 필드(정수형)을 입력 받아, 해당 날짜 필드에 대해 두 날짜의 차이 값을 반환
       * @details sourceDate2 - sourceDate1
       * @author 강진혁(jhkang1313@douzone.com)
       * - @param Date sourceDate1 입력 날짜
       * @param Date sourceDate2 입력 날짜
       * @param Number dateEnum 입력 날짜 필드
       * - @return Number 반환 값
       * @example var dateValue = dateUtil.differenceBetween(new Date(2018, 9, 1), new Date(), dateUtil.DateEnum.DATE);
       */
      differenceBetween : function(sourceDate1, sourceDate2, dateEnum){
          var returnValue = undefined;
          if(!sourceDate1 instanceof Date){
              console.log('DateUtil differenceBetween Call : sourceDate1 is not Date Object Type');
          } else if(!sourceDate2 instanceof Date){
              console.log('DateUtil differenceBetween Call : sourceDate2 is not Date Object Type');
          } else if (!dateEnum instanceof Number){
              console.log('DateUtil get Call : dateEnum is not DateEnum Type');
          } else {
              switch(dateEnum){
                  case this.DateEnum.DATE :
                      var diffTime = sourceDate1.getTime() - sourceDate2.getTime(); 
                      returnValue = Math.ceil(diffTime / (1000 * 3600 * 24));
                      break;
                  case this.DateEnum.MONTH :
                  case this.DateEnum.YEAR :
                  case this.DateEnum.HOUR :
                  case this.DateEnum.MINUTE :
                  case this.DateEnum.SECOND :
                      var val1 = this.get(sourceDate1, dateEnum);
                      var val2 = this.get(sourceDate2, dateEnum);
                      returnValue = val2 - val1;
                      break;
                  default :
                      console.log('DateUtil differenceBetween Call : dateEnum is invalid');
                  }
          }
          return returnValue;
      },
      /**
       * @section Description
       * @details Date 형 데이터를 2개와 날짜 필드(정수형)을 입력 받아, 크기 비교
       * @author 강진혁(jhkang1313@douzone.com)
       * - @param Date sourceDate1 입력 날짜
       * @param Date sourceDate2 입력 날짜
       * - @return Number 반환 값(if sourceDate1 > sourceDate2 than return 1, else if sourceDate1 == sourceDate2 than return 0, else if sourceDate1 < sourceDate2 than return -1)
       * @example var compareValue = dateUtil.compareWith(new Date(2018, 9, 1), new Date());
       */
      compareWith : function(sourceDate1, sourceDate2){
          var returnValue = undefined;
          if(!sourceDate1 instanceof Date){
              console.log('DateUtil compareWith Call : sourceDate1 is not Date Object Type');
          } else if(!sourceDate2 instanceof Date){
              console.log('DateUtil compareWith Call : sourceDate2 is not Date Object Type');
          } else {
              if(sourceDate1.getTime() == sourceDate2.getTime())  {
                  returnValue = 0;
              } else if(sourceDate1.getTime() > sourceDate2.getTime()){
                  returnValue = 1;
              } else {
                  returnValue = -1;
              }
          }
          
          return returnValue;
      }
  };


  module.grid = {
      /**
       * 그리드 validate 체크
       * autoDeleteKey => 설정한 필드들 모두 값이 없을 때 자동 행 삭제(행이 추가상태일 경우에만)
       * primaryKey => 설정한 필드들 기본키 검사
       * duplicateKey => 설정한 필드 각각 중복값 검사
       * @param {object} grid 검사 대상 그리드
       * @param {Array} masters 마스터&디테일 관계시 검사 대상 그리드의 master grid
       * @return {boolean} validate 통과 유무
       */
      verify: function (grid, masters) {
          if (!grid) {
              return false;
          }

          var dataSource = getDataSourceInControl(grid);
          if (!dataSource) {
              return false;
          }
          
          var existsVerifyKeys = getExistsVerifyKeys(grid);
          if (!existsVerifyKeys) {
              return false;
          }

          var dirtyData = verifyAutoDeleteRows(dataSource, grid.autoDeleteKey, existsVerifyKeys.autoDeleteKey);
          if (dirtyData.length === 0) {
              return true;
          }
          
          var huids = null;
          if (dataSource.options.lineDataSources) {
              huids = dirtyData.map(function (row) { return row._huid; })
                               .filter(function (value, index, self) {
                                   return self.indexOf(value) == index;
                               });
          }

          var isDetail = isDetailDataSource(dataSource);
          var dataSourceData = getDataSourceData(dataSource, isDetail, huids, grid);

          return verifyRequiredValues(grid, dirtyData, dataSource, masters) 
              && verifyPrimaryKeyValues(grid, dataSourceData, dataSource, masters, existsVerifyKeys.primaryKey) 
              && verifyDuplicateValues(grid, dataSourceData, huids, isDetail, dataSource, masters, existsVerifyKeys.duplicateKey);
      },
      /**
       * dataSource RowState 초기화
       * @param {object} dataSource 대상 dataSource
       */
      acceptChanges: function (dataSource) {
          if (!dataSource && !dataSource.dataProvider) {
              return;
          }

          if (!dataSource.options.lineDataSources) {
              clearRowStates(dataSource);
              return;
          }

          $.each(dataSource.options.lineDataSources, function (id, lineDataSource) {
              clearRowStates(lineDataSource);
          });
      },
      /**
       * 체크된 행 삭제
       * @param {Array} checkedRows 체크된 행
       * @param {object} dataSource 대상 dataSource
       * @param {boolean} isDelete lineDataSource delete & remove 여부(기본값 true)
       */
      removeRow: function (checkedRows, dataSource, isDelete) {
          if (checkedRows && dataSource) {
              removeGridRowsOrCardListRows(checkedRows, dataSource, isDelete === undefined ? true : isDelete);
          }
      },
      /**
       * 디테일 그리드 dataSource 재조회
       * @param {object} grid 그리드
       * @param {String} huid 부모 uid
       */
      initLineDataSources: function (grid, huid) {
          if (!grid || !huid) {
              return;
          }

          var dataSource = getDataSourceInControl(grid);
          clearLineDataSources(dataSource);

          dataSource.options.lineDataSources[huid] = dews.ui.dataSource("__ds_" + huid, dataSource.options);
          dataSource.options.lineDataSources[huid].options.master = {};
          dataSource.options.id = dataSource.id;
          
          grid.setDataSource(dataSource.options.lineDataSources[huid]);
          dataSource.options.lineDataSources[huid].read();
      },
      /**
       * 프리바인딩 초기화
       * - 마스터 그리드(디테일 그리드 포함) 데이터 초기화
       * - 컨디션패널 폼 컨트롤 값 초기화
       * - 마스터 그리드 행 추가
       * @param {object} mastertGrid 마스터 그리드
       * @param {object | Array} conditionPanel 컨디션패널
       */
      clearFreebinding: function (mastertGrid, conditionPanel) {
          if (!mastertGrid || !conditionPanel) {
              return;
          }
          
          var self = getPage();
          var dataSource = getDataSourceInControl(mastertGrid, self);
          dataSource.data([]);
          
          if (existsArrayElement(conditionPanel)) {
              conditionPanel.forEach(function(panel) {
                  module.clearPanel(panel);
                  module.enablePanel(panel, true);
              });
          } else {
              module.clearPanel(conditionPanel);
              module.enablePanel(conditionPanel, true);
          }

          mastertGrid.setDataSource(dataSource);
          clearLineDataSources(dataSource);
          mastertGrid.addRow();
      },
      /**
       * 마스터 & 디테일 그리드 설정(전체 데이터 필터)
       * @param {object} mastertGrid 마스터 그리드
       * @param {object} detailGrid 디테일 그리드
       * @param {Array} detailData 디테일 데이터
       * @param {Array} primaryKey 마스터 기본키
       */
      setDetail: function (mastertGrid, detailGrid, detailData, primaryKey) {
          if (!mastertGrid || !detailGrid || !existsArrayElement(detailData) || !existsArrayElement(primaryKey)) {
              return;
          }

          var self = getPage();
          var masterDataSource = getDataSourceInControl(mastertGrid, self);
          var detailDataSource = getDataSourceInControl(detailGrid, self);
          var masterRows = getDataSourceData(masterDataSource);
          var firstUID = "";
          if (masterRows.length > 0) {
              firstUID = masterRows[0]._uid;
          }

          detailDataSource.options.lineDataSources = {};
          
          for (var i = 0; i < masterRows.length; i++) {
              var masterRow = masterRows[i];
              var uid = masterRow._uid;
              var filterData = detailData.filter(function (row) {
                  return existsDuplicateValues(masterRow, row, primaryKey);   
              });

              detailDataSource.options.lineDataSources[uid] = dews.ui.dataSource("__ds_" + uid, detailDataSource.options);
              detailDataSource.options.lineDataSources[uid].options.master = {};
              detailGrid.setDataSource(detailDataSource.options.lineDataSources[uid]);
              detailDataSource.options.lineDataSources[uid].data(filterData);
          }
          detailGrid.setDataSource(detailDataSource.options.lineDataSources[firstUID]);
      },
      /**
      * 그리드 컬럼 사이즈 자동 설정 (fit-content)
      * @author 심재근 연구원
      * @since  2020-06-09
      * @desc : 컬럼 사이즈 컨텐츠에 맞게 재설정
      *         그리드 컬럼 visible:true, 그룹해더가 아닌거에 대해서 fit-contents설정
      * @param : targetGrid:self.grid_ID, setColumns:{limit:[String...], except:[String...]} 
      * targetGrid : (필수) 적용시킬 그리드 (self.grid)
      * setColumns : 제외하거나 해당 컬럼만 설정이 필요할 시 setColumns 사용
      *                  설정할 컬럼이 정해져있지 않고 전체 사용 설정 시 setColumns 파라미터 필요 X
      *                : parameterKey는 반드시 [limit, except]를 사용하고 둘 중에 하나만 설정
      * limit [한정]  : 특정컬럼만 자동설정
      * excpet [제외] : 전체자동설정(특정컬럼 제외)
      * excute_limitFiltering : limit 옵션에서만 적용가능
      * optionValue : default(true), false(특정컬럼외에 나머지 자동설정) - 특정컬럼만 maxsize지정할때
      * 함수 사용 위치 : dataBound 권장.
      * ※참고사항
      * 셀 크기조정이 의외로 많은 시간을 소모 => 데이터가 많을경우 테스트 후 판단.
      */
      setAutoColumnSize: function (targetGrid, setColumns, excute_limitFiltering) {
          /**
          * inner-property : default verify
          * @desc : 그리드 컬럼 (visible:true), 그룹해더 X
          */
          function defaultVerify(item) {
              return item.visible != false && typeof item.columns != 'object';
          }
          /**
          * inner-property : option-filter
          * @desc : 옵션의 필터
          */
          function OptionFiltering(optionValue, displayField, whichFilter) {
              var result = false;
              $.each(optionValue, function (idx, col) {
                  if (col.field == displayField) {
                      result = true;
                      return false;
                  }
              });
              return whichFilter == 'except' ? !result : result;
          }
          /**
          * inner-property : maxWidth존재 시 세팅
          * @desc : limit에 한해서 - maxWidth 여부
          */
          function maxWidthSetting(setColumns, targetFiled) {
              var maxWidth = 0;
              if (typeof setColumns == 'object' && setColumns.limit != undefined) {
                  var optionValue = Object.values(setColumns).pop();
                  $.each(optionValue, function (idx, item) {
                      if (item.field == targetFiled) {
                          maxWidth = item.maxWidth;
                          return false;
                      }
                  });
              }
              return (typeof maxWidth == undefined) ? 0 : maxWidth;
          }

          function parameterVerify(targetGrid, setColumns, excute_limitFiltering) {
              if (typeof setColumns == 'object' && Object.keys(setColumns).length == 0) {
                  throw new Error('Function Error\n'
                      + 'setAutoColumnSize(1, 2, 3)\n'
                      + '2번째 인자 : 옵션이 비워져있습니다.\n'
                      + '만약 전체설정이라면 2,3번째 인자를 제거해주십시오.');
              }

              if (typeof setColumns == 'object' && Object.keys(setColumns).length > 1) {
                  throw new Error('Function Error\n'
                      + 'setAutoColumnSize(1, 2, 3)\n'
                      + '2번째 인자 : [limit, except] 한개의 옵션만 가능합니다.\n');
              }

              if (typeof setColumns == 'object' && setColumns.except != undefined && setColumns.limit != undefined) {
                  throw new Error('Function Error\n'
                      + 'setAutoColumnSize(1, 2, 3)\n'
                      + '2번째 인자 : 키값으로 limit, except 설정만 가능합니다.\n');
              }

              if (typeof setColumns == 'object' && setColumns.except != undefined && excute_limitFiltering != undefined) {
                  throw new Error('Function Parameter Error\n'
                      + 'setAutoColumnSize(1, 2, 3)\n'
                      + '3번째 인자 : limit옵션만 가능합니다.\n'
                      + 'hint : 3번째 인자 제거');
              }
          }

          try {
              parameterVerify(targetGrid, setColumns, excute_limitFiltering); //검증 및 에러처리.

              var displayColumns = targetGrid.options.displayColumns;
              var filteredColumns;
              var excute_limitFiltering = (typeof excute_limitFiltering == 'undefined') ? true : excute_limitFiltering;

              // visible : true && groupHead제외
              if (typeof setColumns == 'object' && excute_limitFiltering) { // 제외, 제한컬럼 필터링
                  var optionKey = Object.keys(setColumns).pop();
                  var optionValue = Object.values(setColumns).pop();
                  filteredColumns = displayColumns.filter(function (item) {
                      return defaultVerify(item) && OptionFiltering(optionValue, item.field, optionKey);
                  });
              }
              else { // 전체 컬럼 필터링
                  filteredColumns = displayColumns.filter(function (item) {
                      return defaultVerify(item);
                  });
              }

              /**
               * 사이즈 설정 메소드 (fitColumnWidth)
              * @param : fitColumnWidth('ColumnName', max-width, min-width)
              * max-width, min-width : 0일경우 자동설정
              * ※주의사항 
              * min-width : 0 일경우 헤더사이즈로 조정됨 (트러질 수 있습니다.)
              */
              $.each(filteredColumns, function (idx, item) {
                  targetGrid._grid.fitColumnWidth(item.field, maxWidthSetting(setColumns, item.field), item.width);
              });

              /**
               * @desc scorll-x 사라지는 현상 처리
              */
              setTimeout(function () {
                  targetGrid.refresh();
              }, 100);
          } catch (e) {
              showErrorMessage(e);
          }
      },
      /**
      * 그리드 행 라디오 타입 체인지
      * @author 심재근 연구원
      * @since  2020-06-10
      * @param : targetGrid = self.gridID,
      *          isChange = true(defualt)
      * @desc : 그리드 row radio type
      *       : 그리드 한 개씩만 선택됨
      *       : 옵션 checkable : true (필수)
      */
      setRowStyleRadioType: function (targetGrid, isChange) {
          if (typeof isChange != undefined) isChange = true;
          targetGrid._grid.setCheckBar({
              exclusive: isChange
          });
      },
      /**
      * 그리드 컬럼 툴팁 지정
      * @author 심재근 연구원
      * @since  2020-06-10
      * @desc : 지정한 컬럼들의 셀에 툴팁설정.
      *         내역과 같은 긴경우에 사용 (화면 이질감 X)
      * @param : targetGrid:self.grid_ID, setColumns: Array[...String]} 
      * targetGrid : (필수) 적용시킬 그리드 ( self.grid )
      * setColumns : (필수) 툴팁을 설정할 컬럼명을 설정 ( ['FieldName', '', ''...] )
      * isUsed : true (default) 툴팁설정
      *          false일 시 툴팁설정 해제.
      * ※참고사항 : setAutoColumnSize()함수 함께 사용시 이후에 사용 권장.
      */
      setTooltip: function (targetGrid, setColumns, isUsed) {
          try {
              parameterVerify(setColumns, isUsed); //검증 및 에러처리.

              if (typeof isUsed == 'undefined') isUsed = true;
              $.each(setColumns, function (index, columnName) {
                  targetGrid._grid.setColumnProperty(columnName, "renderer", { showTooltip: isUsed });
              });
          } catch (e) {
              showErrorMessage(e);
          }

          function parameterVerify(setColumns, isUsed) {
              if (typeof setColumns == "undefined") {
                  throw new Error('Function Error\n'
                      + 'setTooltip(1, 2, 3)\n'
                      + '2번째 인자 : 필수 설정값입니다.\n'
                      + 'hint : Array[...String]');
              }
              if (typeof setColumns == "object" && Object.keys(setColumns).length == 0) {
                  throw new Error('Function Error\n'
                      + 'setTooltip(1, 2, 3)\n'
                      + '2번째 인자 : 옵션이 비워져있습니다.\n'
                      + 'hint : Array[...String]');
              }
              if (typeof isUsed != "undefined" && typeof isUsed != "boolean") {
                  throw new Error('Function Error\n'
                      + 'setTooltip(1, 2, 3)\n'
                      + '3번째 인자 : type mismatch.\n'
                      + 'hint : boolean type (default=true)');
              }
          }
      },
      /**
       * 폼패널바인딩 초기화
       * - 폼패널 데이터 초기화
       * @param {object} targetSelf selfCanvas
       * @param {object} targetGrid 그리드
       */
       initBindPanel : function(targetSelf, targetGrid) {
          clearPanel(targetSelf);  
          disablePanel(targetSelf, targetGrid); // disable설정
       },
      /**
       * 폼패널바인딩 초기화
       * - 폼패널 데이터 초기화 : 데이터가 없는 폼패널은 readonly처리
       * @param {object} targetSelf selfCanvas
       * @param {object} targetGrid 그리드
       */
       initBindPanel2 : function(targetSelf, targetGrid) {
          clearPanel(targetSelf);  
          readonlyPanel(targetSelf, targetGrid); // disable설정
       }
  };

  function verifyAutoDeleteRows(dataSource, autoDeleteKey, hasAutoDeleteKey) {
      var dirtyData = dataSource.getDirtyData();
      if (hasAutoDeleteKey === false) {
          return dirtyData.Added.concat(dirtyData.Updated);
      }

      var addedDirtyData = dirtyData.Added;
      for (var i = addedDirtyData.length - 1; i >= 0; i--) {
          var rowData = addedDirtyData[i];
          if (!isAutoDeleteRow(rowData, autoDeleteKey)) {
              continue;    
          }

          var removeDataSource = rowData._huid ? dataSource.options.lineDataSources[rowData._huid] : dataSource;
          var index = findRowIndex(removeDataSource.data(), "__UUID", rowData.__UUID);
          removeDataSource.remove(index);
          addedDirtyData.splice(i, 1);
      }
      return addedDirtyData.concat(dirtyData.Updated);
  }

  function isAutoDeleteRow(rowData, autoDeleteKey) {
      var count = 0;
      for (var i = 0; i < autoDeleteKey.length; i++) {
          var column = autoDeleteKey[i];
          if ($.type(rowData[column]) === "number" && rowData[column] === 0) {
              continue;
          }

          if (!rowData[column]) {
              count++;
          }
      }
      return (count == autoDeleteKey.length);
  }

  function verifyRequiredValues(grid, dirtyData, dataSource, masters) {
      var columns = grid.columns;
      var requiredColumns = getRequiredColumns(columns, grid.primaryKey);
      if (requiredColumns.length === 0) {
          return true;
      }

      for (var i = 0; i < dirtyData.length; i++) {
          var rowData = dirtyData[i];
          var emptyColumn = requiredColumns.find(function (column) {
              if ($.type(rowData[column]) === "number" && rowData[column] === 0) {
                  return false;
              }
              return !rowData[column];
          });

          if (!emptyColumn) {
              continue;
          }
          
          var messageInfo = createMessageInfo(emptyColumn, columns, "는 필수입력항목입니다.");
          selectMasterControlRowAndShowMessage(grid, rowData, messageInfo, dataSource, masters);
          return false;
      }
      return true;
  }

  function getRequiredColumns(columns, primaryKeys) {
      var requiredColumns = [];
      $.each(columns, function (name, info) {
          if (info.attributes && info.attributes.class == "required") {
              requiredColumns.push(name);
          }
      });

      if (!primaryKeys) {
          return requiredColumns;
      }

      for (var i = 0; i < primaryKeys.length; i++) {
          var column = primaryKeys[i];
          if (requiredColumns.indexOf(column) == -1) {
              requiredColumns.push(column);
          }
      }
      return requiredColumns;
  }

  function verifyPrimaryKeyValues(grid, dataSourceData, dataSource, masters, hasPrimaryKey) {
      if (hasPrimaryKey === false) {
          return true;
      }

      var duplicateRow = getDuplicateRow(dataSourceData, grid.primaryKey);
      if (duplicateRow.index === -1) {
          return true;
      }

      var messageInfo = createMessageInfo(grid.primaryKey, grid.columns, " 값이 중복되었습니다.");
      selectMasterControlRowAndShowMessage(grid, duplicateRow.data, messageInfo, dataSource, masters);
      return false;
  }

  function getDuplicateRow(dataSourceData, field) {
      if (existsArrayElement(field)) {
          var duplicateKeys = [];
          for (var i = 0; i < dataSourceData.length; i++) {
              var rowData = dataSourceData[i];
              var existsDuplicateKey = duplicateKeys.find(function (duplicateKey) {
                  return existsDuplicateValues(duplicateKey, rowData, field);
              });

              if (existsDuplicateKey) {
                  return { index: i, data: rowData };
              }
              
              duplicateKeys.push(rowData);
          }
          return { index: -1, data: null };
      }

      var duplicateValueIndex = dataSourceData.map(function (row) {
          if ($.type(row[field]) == "date") {
              return dews.date.toString(row[field]);
          }
          return row[field] ? row[field] : "";
      }).findIndex(function (value, index, self) {
          return self.indexOf(value) != index;
      });

      return { index: duplicateValueIndex, data: dataSourceData[duplicateValueIndex] };
  }

  function existsDuplicateValues(duplicateKeyValues, checkValues, duplicateKey) {
      for (var i = 0; i < duplicateKey.length; i++) {
          var duplicateKeyValue = duplicateKeyValues[duplicateKey[i]];
          var checkValue = checkValues[duplicateKey[i]];

          if ($.type(duplicateKeyValue) == "date") {
              duplicateKeyValue = dews.date.toString(duplicateKeyValue);
              checkValue = dews.date.toString(checkValue);
          }

          if (module.nvl(duplicateKeyValue, "") !== module.nvl(checkValue, "")) {
              return false;
          }
      }
      return true;
  }

  function createMessageInfo(keys, columns, suffixMessage) {
      var codePickers = findCodePickersByHiddenFields(keys, columns);
      if (!existsArrayElement(keys)) {
          var column = getGridColumn(keys, columns, codePickers);
          return { fieldName: column.field, message: column.title + suffixMessage };
      }
      
      var message = "";
      for (var i = 0; i < keys.length; i++) {
          var column = getGridColumn(keys[i], columns, codePickers);
          if (column.visible === undefined || column.visible) {
              fieldName = column.field;
              message += "+" + column.title;
          }
      }
      
      message += suffixMessage;
      return { fieldName: fieldName, message: message.substr(1) };
  }

  function findCodePickersByHiddenFields(keys, columns) {
      var result = [];
      var hiddenFields = getHiddenFields(keys, columns);
      if (!existsArrayElement(hiddenFields)) {
          return result;
      }

      $.each(columns, function (key, column) {
          if (!column.editor || column.editor.type != "codepicker") {
              return true;
          }

          var findIndex = hiddenFields.findIndex(function (hiddenField) {
              return hiddenField == column.editor.gridCodeField;
          });

          if (findIndex == -1) {
              return true;
          }

          result.push(column);
          
          hiddenFields.splice(findIndex, 1);
          if (hiddenFields.length == 0) {
              return false;
          }
      });
      return result;
  }

  function getHiddenFields(keys, columns) {
      if ($.type(keys) == "string") {
          return columns[keys].visible === false ? [ keys ] : [];
      }

      return keys.filter(function (key) {
          return columns[key].visible === false;
      });
  }

  function getGridColumn(target, columns, codePickers) {
      if (!existsArrayElement(codePickers)) {
          return columns[target];
      }

      var findField = codePickers.find(function (field) {
          return target == field.editor.gridCodeField;
      });

      return findField ? findField : columns[target];
  }

  function verifyDuplicateValues(grid, dataSourceData, huids, isDetail, dataSource, masters, hasDuplicateKey) {
      if (hasDuplicateKey === false) {
          return true;
      }
      
      for (var i = 0; i < grid.duplicateKey.length; i++) {
          var key = grid.duplicateKey[i];
          var duplicateRow = isDetail ? getDuplicateRowForHUID(huids, dataSourceData, key) : getDuplicateRow(dataSourceData, key);
          if (duplicateRow.index === -1) {
              continue;
          }

          var messageInfo = createMessageInfo(key, grid.columns, " 값이 중복되었습니다.");
          selectMasterControlRowAndShowMessage(grid, duplicateRow.data, messageInfo, dataSource, masters);
          return false;
      }
      return true;
  }

  function getDuplicateRowForHUID(huids, dataSourceData, key) {
      for (var i = 0; i < huids.length; i++) {
          var huid = huids[i];
          var detailData = dataSourceData.filter(function (row) {
              return row._huid == huid;
          });

          var duplicateRow = getDuplicateRow(detailData, key);
          if (duplicateRow.index === -1) {
              continue;
          }
          return duplicateRow;
      }
      return { index: -1, data: null };
  }

  function existsArrayElement(array) {
      return (Array.isArray(array) && array.length > 0);
  }

  function getExistsVerifyKeys(control) {
      var existsVerifyKeys = { primaryKey: false, duplicateKey: false, autoDeleteKey: false };
      var existsFields = getExistsFieldsFunction(control.$element.hasClass("dews-ui-cardlist"));

      $.each(existsVerifyKeys, function (verifyKey) {
          existsVerifyKeys[verifyKey] = hasVerifyKey(control, control[verifyKey], existsFields);
          if (existsVerifyKeys[verifyKey] === null) {
              existsVerifyKeys = null;
              return false;
          }
      });
      return existsVerifyKeys;
  }

  function getExistsFieldsFunction(isCardList) {
      if (isCardList) {
          return function (cardList, fields) {
              var columns = cardList._card.columns;
              var invalidField = fields.find(function (field) {
                  if (!existsArrayElement(field)) {
                      return !columns.find(function (column) {
                          return column.field == field;
                      });
                  }
                  
                  var none = field.find(function (col) {
                      return !columns.find(function (column) {
                          return column.field == col;
                      });
                  });
                  return isInvalidFieldMessage(none, true);
              });
              return isInvalidFieldMessage(invalidField, false);
          };
      }

      return function (grid, fields) {
          var invalidField = fields.find(function (field) {
              if (field == "_huid") {
                  return false;
              }

              if (!existsArrayElement(field)) {
                  return !grid.columns[field];
              }

              var none = field.find(function (col) {
                  return !grid.columns[col];
              });
              return isInvalidFieldMessage(none, true);
          });
          return isInvalidFieldMessage(invalidField, false);
      };
  }

  function isInvalidFieldMessage(field, processFind) {
      if ($.type(field) == "string") {
          dews.alert(field + " 필드를 찾을 수 없습니다.", "warning");
          return processFind;
      }

      if (processFind) {
          return false;
      }
      return field ? false : true;
  }

  function hasVerifyKey(control, verifyKey, existsFields) {
      if (!existsArrayElement(verifyKey)) {
          return false;
      }

      if (!existsFields(control, verifyKey)) {
          return null;
      }
      return true;
  }

  function clearRowStates(dataSource) {
      if (dataSource && dataSource.dataProvider) {
          dataSource.options._destroy = [];
          dataSource.dataProvider.clearRowStates();
      }
  }

  function clearLineDataSources(dataSource) {
      var detailDataSources = getDetailDataSources(dataSource);
      if (!existsDetailDataSources(detailDataSources)) {
          dataSource.options.lineDataSources = {};
          return;
      }

      $.each(detailDataSources, function (id, detailDataSource) {
          clearLineDataSources(detailDataSource);
      });
      dataSource.options.lineDataSources = {};
  }

  function findRowIndex(data, field, value) {
      if (!Array.isArray(data)) {
          data = Array.from(data);
      }
      
      return data.findIndex(function (row) {
          return row[field] == value;
      });
  }

  function selectMasterControlRowAndShowMessage(grid, rowData, messageInfo, dataSource, masters) {
      if (existsArrayElement(masters)) {
          selectMasterControlRow(dataSource, masters, rowData._huid);
      }

      var index = grid.searchCell({ fields: [ "__UUID" ], value: rowData.__UUID });
      selectParentPanelItemsAndGridRow(grid, index, messageInfo.fieldName);
      dews.alert(messageInfo.message, "warning");
  }

  function selectMasterControlRow(dataSource, masters, huid) {
      var master = masters.shift();
      if (!master) {
          return;
      }

      var uid = huid;
      var masterDataSource = dataSource.options.masterDataSource;
      if (isDetailDataSource(masterDataSource)) {
          var lineDataSources = getDataSourceData(masterDataSource, true);
          huid = lineDataSources.find(function (row) { return row._uid == huid; })._huid;
          selectMasterControlRow(masterDataSource, masters, huid);
      }
      
      var hIndex = findRowIndex(master.sortDataItems(), "_uid", uid);
      master.select(hIndex);
  }

  function selectParentPanelItemsAndGridRow(grid, rowIndex, field) {
      selectParentPanelItems(grid.$element);

      grid.setFocus();
      grid.select(rowIndex, field);
  }

  function selectParentPanelItems(target) {
      var parents = target.parents(".dews-tab-item, .dews-ui-tab-panel, .dews-arcodien-item, .dews-ui-arcodien, .dews-popup-item, .dews-popup-panel");
      var self = getPage();

      for (var i = parents.length - 1; i >= 0; i -= 2) {
          var panelId = parents[i].id;
          var itemId = parents[i - 1].id;

          if (!panelId || !itemId) {
              continue;
          }

          if (self["$" + panelId].hasClass("dews-ui-tab-panel")) {
              self[panelId].items.getById(itemId).select();
          } else if (self["$" + panelId].hasClass("dews-ui-arcodien")) {
              self[panelId].items.getById(itemId).open();
          } else if (self["$" + panelId].hasClass("dews-popup-panel")) {
              var popupPanel = dews.ui.popuppanel(self["$" + panelId]);
              popupPanel.show();
              popupPanel.items.getById(itemId).select();
          }
      }
  }

  function removeGridRowsOrCardListRows(checkedRows, dataSource, isDelete) {
      var data = null;
      var isDetail = isDetailDataSource(dataSource);
      if (!isDetail) {
          data = dataSource.data();
          if (!Array.isArray(data)) {
              data = Array.from(data);
          }
      }

      var targetField = dataSource.options.grid ? "__UUID" : "uid";
      var detailDataSources = getDetailDataSources(dataSource);
      for (var i = checkedRows.length - 1; i >= 0; i--) {
          var key = checkedRows[i][targetField];
          var uid = checkedRows[i]._uid;
          var index = -1;

          $.each(detailDataSources, function (id, detailDataSource) {
              if (isDelete) {
                  deleteLineDataSources(detailDataSource, uid);
              } else {
                  removeAllDetailData(detailDataSource, uid);
              }
          });

          if (isDetail) {
              $.each(dataSource.options.lineDataSources, function (huid, lineDataSource) {
                  data = lineDataSource.data();
                  index = findRowIndex(data, "__UUID", key);
                  if (index > -1) {
                      removeDataSourceData(lineDataSource, data[index], index);
                  }
              });
              continue;
          }

          index = findRowIndex(data, targetField, key);
          if (!dataSource.options.grid) {
              return index;
          }
          removeDataSourceData(dataSource, data[index], index);
      }
  }

  function deleteLineDataSources(dataSource, huid) {
      if (!dataSource || !dataSource.options.lineDataSources[huid]) {
          return;
      }

      var lineDataSources = dataSource.options.lineDataSources;
      var detailDataSources = getDetailDataSources(dataSource);
      if (!existsDetailDataSources(detailDataSources)) {
          delete lineDataSources[huid];
          return;
      }

      var data = lineDataSources[huid].data();
      for (var i = 0; i < data.length; i++) {
          var uid = data[i]._uid;
          
          $.each(detailDataSources, function (id, detailDataSource) {
              deleteLineDataSources(detailDataSource, uid);
          });
      }
      delete lineDataSources[huid];
  }

  function removeAllDetailData(dataSource, huid) {
      if (!dataSource || !dataSource.options.lineDataSources[huid]) {
          return;
      }

      var lineDataSource = dataSource.options.lineDataSources[huid];
      var data = lineDataSource.data();
      var detailDataSources = getDetailDataSources(dataSource);
      if (existsDetailDataSources(detailDataSources)) {
          for (var i = 0; i < data.length; i++) {
              var uid = data[i]._uid;

              $.each(detailDataSources, function (id, detailDataSource) {
                  removeAllDetailData(detailDataSource, uid);
              });
          }
      }
      
      for (var i = data.length - 1; i >= 0; i--) {
          removeDataSourceData(lineDataSource, data[i], i);
      }
  }

  function removeDataSourceData(dataSource, data, index) {
      if (!dataSource.dataProvider) {
          dataSource.remove(data);
          return;
      }

      if (dataSource.dataProvider.getRowState(index) != "created") {
          dataSource.options._destroy.push(data);
      }
      dataSource.remove(index);
  }

  function clearPanel(targetSelf) {
    var ret = targetSelf.$content.find(".dews-form-panel li input[class|='dews-ui'], .dews-form-panel li select[class|='dews-ui'], .dews-form-panel li textarea[class|='dews-ui'], .dews-form-panel li span[class|='dews-ui']");
    
    $(ret).each(function (index, node) {
      var target = targetSelf[node.id];

      if (target != undefined) {
      if (target.controlType != undefined) {
        switch (target.controlType) {
          case "input":
          case "textarea":
            dews.ui.textbox($(node)).text('');
            break;
        }
      } else {
        if ($(node).hasClass('dews-ui-radio-group')) {
          //target.select(0);
        } else if ($(node).hasClass('dews-ui-radio')) {
          // 
        } else if ($(node).hasClass('dews-ui-checkbox')) {
          // 
                } else if (target.options.name != undefined) {
          switch (target.options.name) {
            case "DropDownList":
            case "DatePicker":
                    case "TimePicker":
                    case "DateTimePicker":
            case "NumericTextBox":
            case "MaskedTextBox":
              target.value('');
              break;
          }
        } else {
          if ($(node).hasClass('dews-ui-codepicker')) {
            var data = {};
            data[target.options.codeField] = "";
            data[target.options.textField] = "";

            target.setData(data, false);

          } else if ($(node).hasClass('dews-ui-zipcodepicker')) {
            target.value('');
          } else if ($(node).hasClass('dews-ui-periodpicker')) {
            target.setStartDate("");
            target.setEndDate("");
          }
        }
      }
      }
    });
  }

  /*****************************************
   * 컨트롤제어
   *****************************************/
  function disablePanel(targetSelf, targetGrid) {
    var ret = targetSelf.$content.find(".dews-form-panel li input[class|='dews-ui'], .dews-form-panel li select[class|='dews-ui'], .dews-form-panel li textarea[class|='dews-ui'], .dews-form-panel li span[class|='dews-ui']");
    var flag = targetGrid.dataItems().length > 0 ? true : false;
    
    $(ret).each(function (index, node) {
      var target = targetSelf[node.id];

      if (target != undefined) {
        if (target.controlType != undefined) {
          switch (target.controlType) {
            case "input":
            case "textarea":
              dews.ui.textbox($(node)).enable(flag);
              break;
          }
        } else {
        if ($(node).hasClass('dews-ui-radio-group')) {
      target.disable(!flag);
    } else if ($(node).hasClass('dews-ui-radio')) {
      target.disable(!flag); 
    } else if ($(node).hasClass('dews-ui-checkbox')) {
          target.disable(!flag);
        } else if (target.options.name != undefined) {
            switch (target.options.name) {
              case "DropDownList":
              case "DatePicker":
              case "TimePicker":
              case "DateTimePicker":
              case "NumericTextBox":
              case "MaskedTextBox":
                target.enable(flag);
                break;
            }
          } else {
            if ($(node).hasClass('dews-ui-codepicker')) {

              var data = {};
              data[target.options.codeField] = "";
              data[target.options.textField] = "";

              target.enable(flag);

            } else if ($(node).hasClass('dews-ui-zipcodepicker')) {
              target.enable(flag);
            } else if ($(node).hasClass('dews-ui-periodpicker')) {
              target.enable(flag);
            }
          }
        }
      }
    });
  }
  
  /*****************************************
   * 컨트롤제어::readonly
   *****************************************/
  function readonlyPanel(targetSelf, targetGrid) {
      var ret = targetSelf.$content.find(".dews-form-panel li input[class|='dews-ui'], .dews-form-panel li select[class|='dews-ui'], .dews-form-panel li textarea[class|='dews-ui'], .dews-form-panel li span[class|='dews-ui']");
      var flag = targetGrid.dataItems().length > 0 ? true : false;
    
      $(ret).each(function (index, node) {
          var target = targetSelf[node.id];

          if (target != undefined) {
              if (target.controlType != undefined) {
                  switch (target.controlType) {
                      case "input":
                      case "textarea":
                          dews.ui.textbox($(node)).readonly(!flag);
                          break;
                  }
              } else {
                if ($(node).hasClass('dews-ui-radio-group')) {
              target.disable(!flag);
            } else if ($(node).hasClass('dews-ui-radio')) {
              target.readonly(!flag); 
            } else if ($(node).hasClass('dews-ui-checkbox')) {
              target.disable(!flag);
                } else if (target.options.name != undefined) {
                      switch (target.options.name) {
                          case "DropDownList":
                          case "DatePicker":
                          case "TimePicker":
                          case "DateTimePicker":
                          case "NumericTextBox":
                          case "MaskedTextBox":
                            target.readonly(!flag);
                            break;
                      }
                  } else {
                      if ($(node).hasClass('dews-ui-codepicker')) {

                          var data = {};
                          data[target.options.codeField] = "";
                          data[target.options.textField] = "";
          
                          target.readonly(!flag);

                      } else if ($(node).hasClass('dews-ui-zipcodepicker')) {
                          target.readonly(!flag);
                      } else if ($(node).hasClass('dews-ui-periodpicker')) {
                          target.readonly(!flag);
                      }
                  }
              }
          }
      });
  }
  

  /**
    * @section	isNull(v)
    * @details 	undefined / null / 공백 체크
    * @author 	송치민
    * - @param 	v : 문자열
    * - @return  	true / false
    * @example 	if (isNull(str))
    */
  module.isNull = function(v) {
      return (v === undefined || v === null || v === '') ? true : false;
  }

  var newModule = {};
  newModule[moduleCode] = module;
  window.gerp = $.extend(true, gerp, newModule);
})(window.dews, window.gerp || {}, jQuery);
//# sourceURL=damg.js


  //디버깅 소스 표시
 //# sourceURL=view/AU/ABMITM00300.js