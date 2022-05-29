/*
*
*/
$.fn.serializeObject = function(data){
  var o = {};
  var a = this.serializeArray();
  $.each(a, function(){
    if(o[this.name] !== undefined){
      if(!o[this.name].push){
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    }else{
      if(data === undefined){
        o[this.name] = this.value || '';
      }else{
        for(var i = 0; i < data.except.length; i++){
          if(data.except[i] !== this.name){
            o[this.name] = this.value || '';
          }
        }
      } //end: }else{
    } //end: }else{
  }); //end: $.each(a, function(){
  return o;changeAutoNego
}; //end: $.fn.serializeObject = function(data){

$.fn.hasScrollBar = function() {
  return this.get(0).scrollHeight > this.height();
}

var c$valid = {
  set: function(data){
    var defaults = {
      "required": false
      , "alert": false
      , "minLength": 0
      , "maxLength": 0
      , "replace": false
    }; //end: var defaults = {

    var rule = {
      "num": /[^0-9]/g
      , "en": /[^a-z]/g
      , "EN": /[^A-Z]/g
      , "En": /[^a-zA-Z]/g
      , "ko": /([^가-힣ㄱ-ㅎㅏ-ㅣ\x20])/g
      , "tagged_untagged": /[^\d,-]/g
      , "regexp": {
        "email": /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
        , "mac": /^([0-9a-fA-F]{2}[:]){5}([0-9a-fA-F]{2})$/
        , "wildmac": /^([0-9a-fA-F*]{2}[:]){5}([0-9a-fA-F*]{2})$/
        , "ipv4": /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
        , "ipv6": /^([0-9a-fA-F]{4}:){7}([0-9a-fA-F]{4})$/
        , "hostname": /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/
        , "cswitch_serial": /^\w+$/
      }
      , "special_char" : /[`~!@\#$%<>^&*\()\=+_\’|\[\]\{\:;."'\\\/?}]/gi
    }; //end: var rule = {

    var color = {
      "notice": "skyblue"
      , "warning": "pink"
    }; //end: var color = {

    var message = {
      "required": jQuery.i18n.prop("common.msg.required")
      , "minLength": jQuery.i18n.prop("common.msg.minLength")
      , "maxLength": jQuery.i18n.prop("common.msg.maxLength")
      , "minValue": jQuery.i18n.prop("common.msg.minValue")
      , "maxValue": jQuery.i18n.prop("common.msg.maxValue")
      , "email": jQuery.i18n.prop("common.msg.email")
      , "mac": jQuery.i18n.prop("common.msg.mac")
      , "ipv4": jQuery.i18n.prop("common.msg.ipv4")
      , "ipv6": jQuery.i18n.prop("common.msg.ipv6")
      , "hostname": jQuery.i18n.prop("common.msg.hostname")
      , "cswitch_serial": jQuery.i18n.prop("registration.msg.duplicateSerial")
      , "special_char" : jQuery.i18n.prop("common.msg.specialChar")
    }; //end: var message = {

    function isNotEmpty($object, $val){
      var bool = $val.length > 0 ? true : false;
      if(bool){
        $object.css("background-color", "");
      }else{
        setFalse($object, message.required, "notice");
      }
      return bool;
    } //end: function isNotEmpty($object, $val){

    function isNotMinLength($object, $val){
      var bool = $val.length >= defaults.minLength ? true : false;
      if(bool){
        $object.css("background-color", "");
      }else{
        setFalse($object, message.minLength);
      }
      return bool;
    } //end: function isNotMinLength($object, $val){

    function setMaxLength($object, $val){
      $object.val($val.substring(0, defaults.maxLength));
    } //end: function setMaxLength($object, $val){

    function isMinValue($object, $val){
      if($val.length > 0){
        var bool = parseInt($val) >= parseInt(defaults.minValue) ? true : false;
        if(bool){
          $object.css("background-color", "");
        }else{
          setFalse($object, message.minValue);
        }
        return bool;
      } //end: if($val.length > 0){
    } //end: function isMinValue($object, $val){

    function isMaxValue($object, $val){
      if($val.length > 0){
        var bool = parseInt($val) <= parseInt(defaults.maxValue) ? true : false;
        if(bool){
          $object.css("background-color", "");
        }else{
          setFalse($object, message.maxValue);
        }
        return bool;
      } //end: if($val.length > 0){
    } //end: function isMaxValue($object, $val){

    function setFalse($this, msg, colorType){
      if(defaults.alert){
        $.alert(msg, 2);
      }
      $this.attr({"placeholder": msg}).css({"background-color": color[colorType === undefined ? "warning" : colorType]}).focus();
      return false;
    } //end: function setFalse($this, msg, colorType){

    $.extend(defaults, data);

    if(defaults.object.length === 0){
      $.alert("Any object to validate!", 2);
      return false;
    }else{
      var lastResult = true;

      defaults.object.each(function(idx){
        var $this = $(this);
        var $val = $.trim($this.val());

        //minLength
        if(defaults.minLength > 0){
          if(!isNotMinLength($this, $val)){
            lastResult = false;
          }
        } //end: if(defaults.minLength > 0){

        //maxLength
        if(defaults.maxLength > 0){
          setMaxLength($this, $val);
        } //end: if(defaults.maxLength > 0){

        //minValue
        if(defaults.minValue >= 0){
          if(!isMinValue($this, $val)){
            lastResult = false;
          }
        } //end: if(defaults.minValue > 0){

        //maxValue
        if(defaults.maxValue > 0){
          if(!isMaxValue($this, $val)){
            lastResult = false;
          }
        } //end: if(defaults.maxValue > 0){

        //required, edit by jini, 위치변경, 우선순위높게
        if(defaults.required){
          if(!isNotEmpty($this, $val)){
            lastResult = false;
          }else{
            $this.css({"background": ""});
          }
        } //end: if(defaults.required){
        
        //regexp
        if(defaults.rule !== undefined){
          if(defaults.replace){
            $this.val($val.replace(rule[defaults.rule], ""));
          }else{
            var isRegexp = false;
            for(var i in rule.regexp){
              if(i === defaults.rule){
                isRegexp = true;
                break;
              }
            }
            //test()는 포함되지 않으면 true 반환, 포함되면 false 반환
            var result = isRegexp ? rule.regexp[defaults.rule].test($val) : !rule[defaults.rule].test($val);
  
            if(result){
              $this.css({"background": ""});
              lastResult = true;
            }else{
              if(defaults.required){
                $this.css({"background-color": (result ? "" : color.warning)}).focus();
                lastResult = false;
              }else{
                if($val.length > 0){
                  $this.css({"background-color": (result ? "" : color.warning)}).focus();
                  lastResult = false;
                  if(message[defaults.rule] != undefined)
                    setFalse($this, message[defaults.rule]);
                }else{
                  $this.css({"background": ""});
                  lastResult = true;
                }
              }
            }
          } //end: }else{
        } //end: if(defaults.rule !== undefined){
      }); //end: defaults.object.each(function(idx){

      return lastResult;
    } //end: }else{
  } //end: set: function(data){
}; //end: var c$valid = {
/* chj97 added 160518 - for issue #34776 */
function checkStpItemKey(key)
{
  if(key === undefined)
    return false;
  
  for(property in c$replace.spanningTreeMode)
    if(key.indexOf(c$replace.spanningTreeMode[property]) != -1)
      return true;
  
  return false;
}

var c$ui = {
  rotate: function(num){
    return "-ms-transform: rotate(" + num + "deg); -webkit-transform: rotate(" + num + "deg); transform: rotate(" + num + "deg);";
  }
  , drawViewTable: function(data){
    var trs = "";
    for(var i = 0; i < data.length; i++){
      var item1 = data[i];
      trs += "<tr><th>" + item1.key + "</th>";
      
      if (item1.key === "LLDP")
      {
        //trs += '<td>' + item1.value + ' <span class="wrap_help"><span class="help_icon"></span><span class="help_exp">' + item1.message + '</span> </span></td>'; // Not supported yet.
        trs += '<td>' + item1.value + ' <span class="wrap_help"></span></td>';
      }
      else if($.type(item1.value) === "array"){        
        trs += "<td data-field-value='" + (data[i]["data-field-value"] === undefined ? "" : data[i]["data-field-value"]) + "'>";
        
        /* chj97 added 151012 - for issue #29752 */
        if(item1.key === "PvRSTP Root" || item1.key === "PvRSTP" || checkStpItemKey(item1.key))
        {
          trs += item1.selected_vid_text + ", ";
          trs += "VLAN: <select class='rstp_vid' style='min-width:60px;'>";
        }
  
        for(var j = 0; j < item1.value.length; j++){
          /* chj97 added 151012 - for issue #29752 */   
          if(item1.key === "PvRSTP Root" || item1.key === "PvRSTP" || checkStpItemKey(item1.key)){
            //console.log("selected vid " + item1.selected_vid + " " + item1.value[j]);
            if(item1.selected_vid === item1.value[j]){
              trs += "<option selected='selected'>" + item1.value[j] + "</option>";
            }else{
              trs += "<option>" + item1.value[j] + "</option>";   
            }
          }
          if(item1.key === jQuery.i18n.prop("switchDetail.word.lanIp")){         
            trs += item1.value[j] + " ";  
          }else{ 
            var item2 = item1.value[j];
            trs += (j === 0 ? "" : "&nbsp") + "<a href='" + item2.url + "'>" + item2.text + "</a>";
          }
        }       
          trs += "</td>";
          
      }else{
        trs += "<td style='word-break:break-all;' data-field-value='" + (data[i]["data-field-value"] === undefined ? "" : data[i]["data-field-value"]) + "'>" + data[i].value + "</td>";
      }
      trs += "</tr>";       
    }       
    //console.log(trs);
    return trs;
  } //end: drawViewTable: function(data){

  , option: function(data){
    var $object = data.$object;
    var option = "";
    var multiple = "Multiple values";
    var disabled = data.disabled === undefined ? "" : data.disabled;

    if(data.multiple !== undefined){
      if(data.multiple){
        option += "<option value='" + multiple + "'>" + multiple + "</option>";
        if(data["data-value"]){
          $object.attr("data-value", multiple);
        }
        disabled === "" ? $object.removeAttr("disabled") : $object.attr("disabled", disabled);
      }
    } //end: if(data.multiple !== undefined){

    for(var i in data.list){
      var strLabel = data.list[i];
      if (strLabel == "enabled" || strLabel == "disabled" || strLabel == "tx" || strLabel == "rx") {
        strLabel = jQuery.i18n.prop("common.word." + strLabel);
      }
       
      var selected = i == data.selected ? "selected='selected'" : "";
      if(i !== "undefined"){
        if(data.multiple !== undefined){
          if(data.multiple){
            option += "<option value='" + i + "'>" + strLabel + "</option>";
          }else{
            option += "<option value='" + i + "' " + selected + ">" + strLabel + "</option>";
            if(selected !== ""){
              $object.attr("data-value", i);
            }
            disabled === "" ? $object.removeAttr("disabled") : $object.attr("disabled", disabled);
          }
        }else{ //end: if(data.multiple !== undefined){
          option += "<option value='" + i + "' " + selected + ">" + strLabel + "</option>";
          if(selected !== ""){
            $object.attr("data-value", i);
          }
          disabled === "" ? $object.removeAttr("disabled") : $object.attr("disabled", disabled);
        } //end: }else{ //end: if(data.multiple !== undefined){
      } //end: if(i !== "undefined"){
    } //end: for(var i in data.list){
    $object.html(option);
  } //end: , option: function(data){

  , setWindowHeight: function(add){
    var winHeight = window.innerHeight;
    var $header = $("header");
    var MARGIN_BOTTOM = 5;
    var MARGIN_HEIGHT = 10;
    var $container = $("div.container");
    var $aside = $("aside");
    var $breadcrumb = $("div.breadcrumb");
    var $listArea = $("div.list_area");
    var $detailArea = $("div.detail_area");
    var $overviewArea = $("div.overview_area");
    var $footer = $("footer");

    var sum = $header.height() + MARGIN_BOTTOM + $container.height() + $footer.height();
    var need = winHeight - sum;
    var GRID_HEIGHT_FIXER = 23;

    $container.css("min-height", $container.height() + need);

    if($listArea.length > 0){
      $listArea.css("min-height", $aside.height() - $breadcrumb.height() - GRID_HEIGHT_FIXER);
    }
    if($detailArea.length > 0){
      $detailArea.css("min-height", $aside.height() - $breadcrumb.height() - GRID_HEIGHT_FIXER - MARGIN_HEIGHT);
    }
    if($overviewArea.length > 0){
      $overviewArea.css("height", window.innerHeight - $header.height() - $breadcrumb.height() - $footer.height() - 10);
    }
  } //end: , setWindowHeight: function(add){

  , getRpvstpInstancePorts: function(data) {
    var rpvstp_inst_status = data.rpvstp.instance_status;    
    for(var i = 0; i < data.cswitch_ports.length; i++){     
        var port_status_change = 0;               
        for(var inst_idx = 0; inst_idx < rpvstp_inst_status.length; inst_idx++){
        if(rpvstp_inst_status[inst_idx].port_instance_status !== undefined) {
          var port_inst_status = rpvstp_inst_status[inst_idx].port_instance_status;         
          for(var port_idx = 0; port_idx < port_inst_status.length; port_idx++){
            if(port_inst_status[port_idx] !== undefined) {
              if((port_inst_status[port_idx].port_name === data.cswitch_ports[i].name)
                  && (port_inst_status[port_idx].vlan_id === data.cswitch_ports[i].vlan_pvid)){
                data.cswitch_ports[i].vlan_pvid_stp_status = port_inst_status[port_idx].status;
                port_status_change = 1;
                break;
              }
            }
          }         
        }
        
        if(port_status_change !== 0) {
          break;
        }
      }   
    }      
    return data;
  }
  , portStatusUpdate: function(mode, data, noDimPort, isTooltipChg){
    
    //console.log("portStatusUpdate");
    var len = data.cswitch_ports.length;
    for(var i=0;i<len;i++)
    {       
      var temp_port = JSON.stringify(data.cswitch_ports[i]);
      var poe_status;
      if(data.hasOwnProperty("cswitch_poe_status"))
      {
        if(data.cswitch_poe_status.hasOwnProperty("port_poe_status"))
        {
          for(var j = 0; j < data.cswitch_poe_status.port_poe_status.length; j++)
          {
            if(data.cswitch_poe_status.port_poe_status[j].ifname == data.cswitch_ports[i].name)
            {
              poe_status = data.cswitch_poe_status.port_poe_status[j].status;
              break;
            }
          }
        }
      }
      setTooltip(i, JSON.parse(temp_port), data.oper_status, data.rpvstp.status, data.model, mode, poe_status, isTooltipChg);

      /* chj97 modified 151023 - for issue #29755 */     
      /*console.log("i " + i + " " + data.cswitch_ports[i].name + " active " 
          + data.cswitch_ports[i].active + " speed " + data.cswitch_ports[i].speed_status
          + " link " + data.cswitch_ports[i].link + " uplink " + data.cswitch_ports[i].uplink);*/
      
      if(data.cswitch_ports[i].active === 1)
      {
        setPortOn(i, data.cswitch_ports[i].speed_status, data.cswitch_ports[i].link, data.cswitch_ports[i].cable);
        setPortUplink(i, data.cswitch_ports[i].uplink, data.cswitch_ports[i].link, 
            data.cswitch_ports[i].cable, data.cswitch_ports[i].ticontroller, data.cswitch_ports[i].downlink);
        setPortBlockNConf(i, data, data.cswitch_ports[i].cable, poe_status);
      }
      else 
        setPortOff(i, data.oper_status, data.cswitch_ports[i]);
      
      if(isSetScheduleEnabled != undefined && isSetScheduleEnabled)
        setPortSchedule(i, data.cswitch_ports[i].active_schedule, data.cswitch_ports[i].cable);
          
      setPortDim(i, data.cswitch_ports[i].cable, data.oper_status, noDimPort);
    }
  }
  , getDrawPortModel: function(org_model) {
    
    var draw_port_model = "";
    
    if(c$poe_models_with_different_port_shapes != undefined) {
      for(var i = 0; i < c$poe_models_with_different_port_shapes.length; i++) {
        if(c$poe_models_with_different_port_shapes[i] == org_model)
          return org_model;
      }
    }
    
    if(org_model.substr(org_model.length-1,1)=="P"){
      draw_port_model = org_model.substring(0,org_model.length-1);
    }
    else if(org_model.indexOf("P(D)") != -1){
      draw_port_model = org_model.substring(0,org_model.indexOf("P(D)"));
    }
    else if(org_model.indexOf("PN") != -1){
      draw_port_model = org_model.substring(0,org_model.indexOf("PN"));
      draw_port_model += "N";
    }
    else if(org_model.indexOf("(D)") != -1){
      draw_port_model = org_model.substring(0,org_model.indexOf("(D)"));
    }
    else
      draw_port_model = org_model;
    
    return draw_port_model;
  }
  , getDrawPortModelLegend: function(org_model) {
    
    var legend = "cswitch_model_port_legend";
    
    if(org_model.indexOf("X") != -1)
      legend = "cswitch_model_xg_port_legend";
    
    return legend;
  }
  /*
  * 브레드크럼은 상단에 출력되는 리스트 건수를 출력하는 기능으로 추후 삭제 예정임.
  */
  , breadcrumb: function(num){
    var $breadcrumbTotal = $("div.breadcrumb > ul > li span.total")
    $breadcrumbTotal.text("(" + num + ")");
  } //end: , breadcrumb: function(num){

  /*
  *
  */
  , setNet: function(val){
    $("#static_net ul li").each(function(){
      if(val == $(this).attr("data-value")){
        $(this).trigger("click");
      }
    });
  } //end: , setNet: function(val){
  
  , setNetGroup: function(val){
    $("#static_net_group ul li").each(function(){
      if(val == $(this).attr("data-value")){
        $(this).trigger("click");
      }
    });
  } //end: , setNet: function(val){
  
  /*
  *
  */
  , search: function(json, string){
    var $obj = json.$object;
    var id = json.id;
    var datas = json.datas;
    var except = json.exceptFields === undefined ? [] : json.exceptFields;
    var require = json.requireFields === undefined ? [] : json.requireFields;

    var dl = "<form id='" + id + "' style='float: left;'>";
    for(var i = 0; i < datas.length; i++){
      for(var j = 0; j < except.length; j++){
        if(datas[i].field === except[j]){
          datas.splice(i, 1);
        }
      }
    }
    for(var i = 0; i < datas.length; i++){
      if(datas[i].width !== 0){
        dl += "<dl style='padding: 5px;'>"
          + "<dt>&bull; " + datas[i].displayName + "</dt>"
          + "<dd><input type='text' name='" + datas[i].field + "'/></dd>"
        + "</dl>";
      }else{
        for(j = 0; j < require.length; j++){
          if(datas[i].field === require[j]){
            dl += "<dl style='padding: 5px;'>"
              + "<dt>&bull; " + datas[i].displayName + "</dt>"
              + "<dd><input type='text' name='" + datas[i].field + "'/></dd>"
            + "</dl>";
          }
        }
      }
    }
    
    if(string === undefined){
      $obj.css({"display": "none"}).html(dl + "</form>");
    }else{
      if(string){
        return dl + "</form>";
      }
    }
  } //end: , search: function(json){

  , searchToString: function(json){
    var id = json.id == undefined ? "" : json.id;
    var customClass = json.class == undefined ? "" : json.class;
    var datas = json.datas;
    var except = json.exceptFields === undefined ? [] : json.exceptFields;
    var require = json.requireFields === undefined ? [] : json.requireFields;

    var dl = "<form id='" + id + "' class='" + customClass + "' style='float: left;'>";
    for(var i = 0; i < datas.length; i++){
      
      if (except.indexOf(datas[i].field) != -1) {
        continue;
      } // 필드명이 제외 리스트에 존재하면 건너뜁니다. 최영화D.
      
      if(datas[i].width !== 0){
        dl += "<dl style='padding: 5px;' class='" + (datas[i].switch_only == true ? "switch_only" : "") + "'>"
          + "<dt>&bull; " + datas[i].displayName + "</dt>"
          + "<dd><input type='text' name='" + datas[i].field + "'/></dd>"
        + "</dl>";
      }else{
        for(j = 0; j < require.length; j++){
          if(datas[i].field === require[j]){
            dl += "<dl style='padding: 5px;' class='" + (datas[i].switch_only == true ? "switch_only" : "") + "'>"
              + "<dt>&bull; " + datas[i].displayName + "</dt>"
              + "<dd><input type='text' name='" + datas[i].field + "'/></dd>"
            + "</dl>";
          }
        }
      }
    }
    
    return dl + "</form>";
  } //end: , searchToString: function(json){
  
  /*
  * AS-IS: 동일
  */
  , form: {
    defaults: {}

    , getHead: function(str){
      return "<thead>" + str + "</thead>";
    } //end: , getHead: function(str){

    , getBody: function(str){
      return "<tbody>" + str + "</tbody>";
    } //end: , getBody: function(str){

    , getTr: function(str){
      return "<tr style='height: 30px;'>" + (str === undefined ? "" : str) + "</tr>";
    } //end: , getTr: function(str){

    , getTh: function(str, attrs){
      return "<th " + (attrs === undefined ? "" : attrs) + ">" + (str === undefined ? "" : str) + "</th>";
    } //end: , getTh: function(str, attrs){

    , getTd: function(str){
      return "<td>" + (str === undefined ? "" : str) + "</td>";
    } //end: , getTd: function(str){

    , getRadio: function(data){
      var radios = "";
      for(var i = 0; i < data.length; i++){
        var checked = data[i].checked ? "checked='checked'" : "";
        var space = i === 0 ? "" : "&nbsp;&nbsp;&nbsp;&nbsp;"
        radios += space + "<span><input type='radio' name='" + data[i].name + "' value='" + data[i].value + "' " + checked + "/>" + data[i].text + "</span>";
      }
      return radios;
    } //end: , getRadio: function(data){

    , getOption: function(data){
      var options = "";
      for(var i = 0; i < data.length; i++){
        var selected = data[i].selected ? "selected='selected'" : "";
        options += "<option value='" + data[i].value + "' " + selected + ">" + data[i].text + "</option>";
      }
      return options;
    } //end: , getOption: function(data){

    , getSpace: function(num){
      var space = "";
      for(var i = 0; i < num; i++){
        space += "&nbsp;";
      }
      return space;
    } //end: , getSpace: function(num){

    , borderRight: " style='border-right: 1px solid #ddd;'"
    , table: function(data){
      this.defaults = {};
      $.extend(this.defaults, data);
      var headThs = "";
      var bodyTds = "";
      for(var i = 0, cols = data.columns; i < cols.length; i++){
        for(var j in cols[i]){
          if(j === "head"){
            headThs += c$ui.form.getTh(cols[i][j]);
          }
          if(j === "body"){
            bodyTds += c$ui.form.getTd(cols[i][j] === "index" ? i + 1 : cols[i][j]);
          }
        } //end: for(var j in cols[i]){
      } //end: for(var i = 0, cols = data.columns; i < cols.length; i++){

      var head = c$ui.form.getHead(c$ui.form.getTr(headThs));
      var body = c$ui.form.getBody(c$ui.form.getTr(bodyTds));
      data.$object.empty();
      data.$object.append(head + body);
    } //end: , table: function(data){

    , addTr: function($object){
      var bodyTds = "";
      for(var i = 0, cols = this.defaults.columns; i < cols.length; i++){
        for(var j in cols[i]){
          if(j === "body"){
            bodyTds += c$ui.form.getTd(cols[i][j] === "index" ? $object.find("tbody tr").length + 1 : cols[i][j]);
          }
        } //end: for(var j in cols[i]){
      } //end: for(var i = 0, cols = this.defaults.columns; i < cols.length; i++){
      $object.append(c$ui.form.getTr(bodyTds));
    } //end: , addTr: function($object){

    , addTrValue: function($object,values){
      var bodyTds = "";
      for(var i = 0, cols = this.defaults.columns; i < cols.length; i++){
        for(var j in cols[i]){
          if(j === "body"){
            if(cols[i][j] === "index"){
              bodyTds += c$ui.form.getTd($object.find("tbody tr").length + 1);
            }else{
              var element = $.parseHTML(cols[i][j]);
              for(var k in values){
                if(k===element[0].name){
                  bodyTds += c$ui.form.getTd(values[k]);
                }
              }
              if(element[0].name == undefined){
                bodyTds += c$ui.form.getTd(cols[i][j]);
              }
            }
          }
        } //end: for(var j in cols[i]){
      } //end: for(var i = 0, cols = this.defaults.columns; i < cols.length; i++){
      $object.append(c$ui.form.getTr(bodyTds));
    } //end: , addTr: function($object){

    , removeThisTr: function($object){
      var $body = $object.closest("table").find("tbody");
      $object.closest("tr").remove();
      var $idx = $body.find("tr td:first-child");
      $idx.each(function(idx){
        $(this).text(idx + 1);
      });
    } //end: , removeThisTr: function($object){

    , initTr: function($object){
      var $body = $object.closest("table").find("tbody");
      $body.find("tr").each(function(idx){
        $(this).remove();
      });
      this.addTr($object);
    } //end: , initTr: function($object){

    , initZeroTr: function($object){
      var $body = $object.closest("table").find("tbody");
      $body.find("tr").each(function(idx){
        $(this).remove();
      });
    } //end: , initTr: function($object){

    , getJsonArray: function($object){
      var arr = [];
      var $trs = $object.find("tbody tr");

      $trs.each(function(){
        var json = {};
        $(this).find("td input[name], select[name]").each(function(){
          json[$(this).attr("name")] = $(this).val();
        }); //end: $(this).each(function(){
        arr.push(json);
      }); //end: $trs.each(function(){

      return arr;
    } //end: , getJsonArray: function($object){
  } //end: , form: {
  , commonOption: function(selected, valueList, any){
    var options = "<option class='select_option' value=''></option>";
    var selected = selected === undefined ? "" : selected;
    if(valueList != undefined) {
      for(var i = 0; i < valueList.length; i++){
          if(any != undefined && valueList[i] == 0)
            options += "<option class='select_option' " + (selected === valueList[i].value ? "selected='selected'" : "") + " value='" + valueList[i].value + "'>" + "Any" + "</option>";
          else
            options += "<option class='select_option' " + (selected === valueList[i].value ? "selected='selected'" : "") + " value='" + valueList[i].value + "'>" + valueList[i].text + "</option>";
      }
    } else console.log("valueList", valueList);
    return options;
  }
}; //end: var c$ui = {

var c$net = {
  getUrlScheme: function() {
    var loc = location.href;
    var scheme = loc.substring(0, loc.indexOf(':'));
    return scheme;
  }
}; //end: var c$net = {

var c$sort = {
  basic : function(a, b) {
    if (a === undefined) return -1;
    if (b === undefined) return 1;
    if (a === b) return 0;
    if (a < b) return -1;
    return 1;
  }
  , ip : function (a, b) { 
    if (a === undefined) return -1;
    if (b === undefined) return 1;
    if (a === b) return 0; 
    a = a.split( '.' );
    b = b.split( '.' );
    for (var i = 0; i < a.length; i++) {
      if ( (a[i] = parseInt(a[i])) < (b[i] = parseInt(b[i])) )
        return -1;
      else if (a[i] > b[i])
        return 1;
    }
    return 0;
  }
  , cswitchIp : function (a, b) { 
    if (a === undefined) return -1;
    if (b === undefined) return 1;
    return c$sort.ip(a.ip, b.ip);
  }
  , cswitchIfname : function (a, b) { 
    if (a === undefined) return -1;
    if (b === undefined) return 1;
    let pre1 = a.substr(0,2);
    let pre2 = b.substr(0,2);
    let ret = c$sort.basic(pre1, pre2);
    if (ret === 0) {
      if (a.length != b.length) return a.length - b.length; 
      else return c$sort.basic(a, b);
    } else {
      return ret;
    }
  }
  , tags : function (a, b) { 
    if (a.length == 0 || b.length == 0) {
      if (a.length == b.length) return 0;
      if (a.length < b.length) return -1;
      return 1;
    }
    if (a[0].name === b[0].name) return 0;
    if (a[0].name < b[0].name)  return -1;
    return 1;
  }
  , switchNameAndPortNumber : function (a, b) {
    if (a === undefined) return -1;
    if (b === undefined) return 1;
    if (a === b) return 0;
    a = a.split( ' / ' );
    b = b.split( ' / ' );
    var ret = c$sort.basic(a[0], b[0]);
    
    if(ret === 0) {
      if ((a[1] = parseInt(a[1])) < (b[1] = parseInt(b[1])))
        ret = -1;
      else if (a[1] > b[1])
        ret = 1;
    }
    return ret;
  }
}; //end: c$sort = {

var c$http = {
  defaults: {}, 
  initDefaults: function(){
    this.defaults = {
        "type": "post"
        , "url": "#"
        , "params": ""
        , "success": function() {}
        , "fail": function() {}
        , "always": function() {}
        , "async": true
        , "block": true
        , "message": {
            "loading": ""
            , "success": ""
            , "fail": ""
          }
        , "img": "<img src='/resources/images/ajax-loader.gif'/>"
        , "contentType": "application/x-www-form-urlencoded; charset=UTF-8"
      }
      return this.defaults;
  } //end: , initDefaults: function(){

  , modal: function(bool, msg){
    var cls = bool ? "pop_completed" : "pop_failed";
    var div = "<div class='divPopup_msg " + cls + "'><div class='con'><span class='icon'></span>" + msg + "</div></div>";
    if($("div.divPopup_msg." + cls).length === 0){
      $("footer").after(div);
    }
    $("div.divPopup_msg." + cls).bPopup({autoClose: 1500, opacity: 0});
  } //end: , modal: function(bool, msg){

  , delegate: function(json){
    this.initDefaults(); //defaults 초기화
    var $options = this.defaults;
    var self = this;
    $.extend(true, $options, json);

    if($options.block){
      //$.blockUI({"message": $options.message.loading === "" ? $options.img : $options.message.loading});
      $(".progress_bar").show();
    }
    var $focused = $(':focus');
    /*
    $[$options.type]($options.url, $options.params, function(data, textStatus, responseData){
      if($options.message.success !== ""){
        c$http.modal(true, $options.message.success);
      }
      if(responseData.responseJSON == undefined){
        var url = "/login";
        $(location).attr('href', url);
      }
      $options.success(data);
      self.ajaxSuccess();
    })
    .fail(function(jqXHR, textStatus, errorThrown){ 
      if(jqXHR.readyState == 0){//network error
        self.ajaxFail();
        return;
      }
      c$http.modal(false, $options.message.fail === "" ? errorThrown : $options.message.fail);
      $options.fail(jqXHR, textStatus, errorThrown);
    })
    .always(function(){ 
      setTimeout(function(){
        $focused.focus();
      }, 100);
      if($options.block){
        $.unblockUI();
      }
    });
    */
    $.ajax({
      type: $options.type.toUpperCase()
      , url: $options.url
      , data: $options.params
      , async: $options.async
      , contentType: $options.contentType
    })
    .done(function(data, textStatus, responseData){
      if($options.message.success !== ""){
        c$http.modal(true, $options.message.success);
      }
      if(responseData.responseJSON == undefined){
        var url = "/login";
        $(location).attr('href', url);
      }
      $options.success(data);
      self.ajaxSuccess();
    })
    .fail(function(jqXHR, textStatus, errorThrown){ 
      if(jqXHR.readyState == 0){//network error
        self.ajaxFail();
        return;
      }
      if (jqXHR.status == 401) { // ajax 호출 권한 에러 tiScreen.common 에서 체크중
        return;
      }
      if ($options.message.fail === "") {
        console.error(errorThrown); // c$http.modal 을 console 로 대처
      } else {
        c$http.modal(false, $options.message.fail);
      }
      
      $options.fail(jqXHR, textStatus, errorThrown);
    })
    .always(function(){ 
      $options.always();
      setTimeout(function(){
        $focused.focus();
      }, 100);
      if($options.block){
//        $.unblockUI();
        $(".progress_bar").hide();
      }
    });    
  } //end: , delegate: function(json){
  , ajaxFailCount: 0
  , ajaxSuccess: function() {
    this.ajaxFailCount = 0;
  }
  , ajaxFail: function() {
    this.ajaxFailCount++;
    if (this.ajaxFailCount > 2) {
      $.alert("Network Error!", 3);
      var url = "/login";
      $(location).attr('href', url);
    }
  }
}; //end: var c$http = {

/* chj97 modified 151023 - for issue #29755 */
function setTooltip(index, cswitch_port, status, switchRstpState, model, network_mode, poe_status, isTooltipChg)
{
  var tooltip_str = ""; 
  var port_id = "#port";
  var tooltip_id = "#p_tooltip";
  var speed_str = "Mbps"; 
  var speed_value;
  //F26이나.. 포트가 다른경우 top의 판별을 다르게 할 필요가 있음.
  var top = "";
  
  if (model.indexOf("F26") > -1)
  {
    if(index < 4 || (index > 7 && index <12) || (index > 15 && index < 20)) 
      top = 1;
    else
      top = 0;
  }
 
  else if (model.indexOf("G24S") > -1)
  {
    
    if(index*1 === 24)
      top = 0;
    else
      top = (parseInt(((index+1) % 2), 10));
  }  
  /*
  else if (model.indexOf("OEM") > -1)
  
  */
  else if (model.indexOf("CS2710G") > -1)
  {
    if(index != 8) 
      top = (parseInt(((index+1) % 2), 10));
    else
      top = 0;
  }
  else
    top = (parseInt(((index+1) % 2), 10));
  
    with(cswitch_port)
    {
      //console.log("port",cswitch_port);
      /* port name */
      tooltip_str += "Port " + name;
      if(link === 1) {
        if(uplink === 1 && ticontroller === 1)
          tooltip_str += "(Uplink,Controller)";
        else if(uplink === 1)
          tooltip_str += "(Uplink)";
        else if(ticontroller === 1)
          tooltip_str += "(Controller)";
        else if(downlink === 1)
          tooltip_str += "(Downlink)";
      }
      tooltip_str += "<br>";        
      
      /* vlan */
      tooltip_str += "Vlan PVID(" + vlan_pvid + ")";
      if(vlan_untagged)
        tooltip_str += " untagged(" + vlan_untagged + ")";
      if(cswitch_port.vlan_tagged)
        tooltip_str += " tagged(" + vlan_tagged + ")";
      tooltip_str += "<br>";      
      
      /* Active */      
      tooltip_str += "Active " +  (active === 1 ? "Enable" : "Disable");
      tooltip_str += "<br>";          
      
      /* Link */
      tooltip_str += "Link " + (link === 1 ? "Up" : "Down");
      tooltip_str += "<br>";
      
      /* speed status */
      if((link === 1) && (cswitch_port.speed_status !== undefined))
      {
        if(speed_status >= 1000) {
          speed_str = "Gbps"; 
          speed_value = speed_status/1000;
        }
        else
        	speed_value = speed_status;
        tooltip_str += (auto_nego === 1 ? "Auto negotiation" : "Force") + "(" + speed_value + speed_str + ")";
      }
      else
        tooltip_str += (auto_nego === 1 ? "Auto negotiation" : "Force") + "(0" + speed_str + ")";
      
      tooltip_str += "<br>";         
        
      /* self-loop detect status */                           
      tooltip_str += "Self-Loop " + (((status === 1) && ((cswitch_port.self_loop_active !== undefined) && (self_loop_active == 0)) 
          && ((cswitch_port.self_loop_block !== undefined) && (self_loop_block === 1))) ? "block" : "unblock"); 
      tooltip_str += "<br>";         
      /* stp port status */
      if(network_mode == 0)// mode - cli(1), gui(0)
      {
        tooltip_str += "STP Port(PVID) " + ((rstp !== 1) ? "Disable" : (((status === 1) && (switchRstpState === 1) 
          && (link === 1)) ? ("Enable(" + c$replace.rstpPortStatus[cswitch_port.vlan_pvid_stp_status] + ")") : "Enable")) + "<br>";
        /* poe status */
        tooltip_str += "PoE " + ((poe === 1) ? "Enable" : "Disable");
        if((poe_status != undefined) && (poe === 1))
          tooltip_str += ", Status : " + poe_status;
        if(isSetScheduleEnabled != undefined && isSetScheduleEnabled)
          tooltip_str += (active_schedule == 1 ? ("<br>"+"Schedule(Port Activation)"):"");
      }
    }
     
    if((isComboPort(index)) || (isOnlyFiberPort(index)))
    {
        var null_str = "";
        
        if(cswitch_port.cable === 2 || isOnlyFiberPort(index))
        {
          //console.log("cable :",cswitch_port.cable);
            if($("#port"+(index+1)).hasClass("tooltip") === true){
              $("#port"+(index+1)).removeClass("tooltip");
              if (tiCommon.convertToBoolean(isTooltipChg)) {
                $("#port"+(index+1)).attr("title", null_str);
              } else {
                $("#p_tooltip"+(index+1)).html(null_str);
              }
              console.log("remove ");
            }
            tooltip_id = "#gp_tooltip";
            port_id = "#gport";
        }
        else
        {
            if($("#gport"+(index+1)).hasClass("tooltip") === true)
            {
              $("#gport"+(index+1)).removeClass("tooltip");
              if (tiCommon.convertToBoolean(isTooltipChg)) {
                $("#gport"+(index+1)).attr("title", null_str);
              } else {
                $("#gp_tooltip"+(index+1)).html(null_str);
              }
            }
        }
        //$(tooltip_id+(index+1)).html(" top:250px;");
        if (tiCommon.convertToBoolean(isTooltipChg)) {
          $(port_id+(index+1)).attr("title", tooltip_str);
        } else {
          $(tooltip_id+(index+1)).html(tooltip_str);
        }
      //  console.log("tooltip_html",$(tooltip_id+(index+1)).html(tooltip_str))
    }
    else {
      if (tiCommon.convertToBoolean(isTooltipChg)) {
        $(port_id+(index+1)).attr("title", tooltip_str);
      } else {
        $(tooltip_id+(index+1)).html(tooltip_str);
      }
    }
    // 툴팁 변경(title) 로 할시 아래 로직 무시
    if (tiCommon.convertToBoolean(isTooltipChg)) {
      return;
    }
    if(top === 1)
    {
        $(tooltip_id+(index+1)).css("margin-top", "-200px");
      $(tooltip_id+(index+1)).css("margin-left", "0px");
    }
    else
    {
        $(tooltip_id+(index+1)).css("margin-top", "50px");
        $(tooltip_id+(index+1)).css("margin-left", "0px");
    }
  
    if($(port_id+(index+1)).hasClass("tooltip") === false)
      $(port_id+(index+1)).addClass("tooltip");
      
    $(tooltip_id+(index+1)).css("z-index", "1000");
    $(tooltip_id+(index+1)).css("word-break", "break-all");
    
  //  console.log("tooltip_str",tooltip_str);
}

function setPortOff(index, status, cswitch_port){
  var port_id = "#port";
  var cable = cswitch_port.cable;
  var selfloop = cswitch_port.self_loop_block;
  var storm_control_active_status = 0;
  
  if(cswitch_port.active == 0 
      && cswitch_port.storm_control_active_status != undefined
      && cswitch_port.storm_control_active_status == 1)
    storm_control_active_status = 1;
    
  //if((isComboPort(index) && cable === 2) || (isOnlyFiberPort(index) && cable === 2))
  if((isComboPort(index) && cable === 2) || isOnlyFiberPort(index))
    port_id = "#gport";   
    
  if($(port_id+(index+1)).hasClass("on") === true)
    $(port_id+(index+1)).removeClass("on");
    
  if($(port_id+(index+1)).hasClass("speed10M") === true)
  $(port_id+(index+1)).removeClass("speed10M");
  
  if($(port_id+(index+1)).hasClass("speed100M") === true)
  $(port_id+(index+1)).removeClass("speed100M");
  
  if($(port_id+(index+1)).hasClass("speed1G") === true)
  $(port_id+(index+1)).removeClass("speed1G");
  
  if($(port_id+(index+1)).hasClass("speed10G") === true)
    $(port_id+(index+1)).removeClass("speed10G");
  
  if($(port_id+(index+1)).hasClass("uplink") === true)
  $(port_id+(index+1)).removeClass("uplink");
/*  
  if($(port_id+(index+1)).hasClass("self_loop") === true)
  $(port_id+(index+1)).removeClass("self_loop");
*/  
  
  if($(port_id+(index+1)).hasClass("poe") === true)
  $(port_id+(index+1)).removeClass("poe"); 
  
  if($(port_id+(index+1)).hasClass("stp") === true)
  $(port_id+(index+1)).removeClass("stp"); 
  
 // if($(port_id+(index+1)).hasClass("security") === true)
  //$(port_id+(index+1)).removeClass("security"); 
  
  if($(port_id+(index+1)).hasClass("off") === false)
  $(port_id+(index+1)).addClass("off");   
 
  if(storm_control_active_status == 1) {
    $(port_id+(index+1)).addClass("storm_control");
  } else if(selfloop == 1) {
    $(port_id+(index+1)).removeClass("off");
    $(port_id+(index+1)).addClass("self_loop");
  }
}

function setPortOn(index, speed_status, link, cable){    
  var port_id = "#port";
    
  //if((isComboPort(index) && cable === 2) || (isOnlyFiberPort(index) && cable === 2))
  if((isComboPort(index) && cable === 2) || isOnlyFiberPort(index))
    port_id = "#gport";       
  
  if($(port_id+(index+1)).hasClass("off") === true)
    $(port_id+(index+1)).removeClass("off");      
  if($(port_id+(index+1)).hasClass("speed10M") === true)
    $(port_id+(index+1)).removeClass("speed10M");     
  else if($(port_id+(index+1)).hasClass("speed100M") === true)
    $(port_id+(index+1)).removeClass("speed100M");  
  else if($(port_id+(index+1)).hasClass("speed1G") === true)
    $(port_id+(index+1)).removeClass("speed1G");
  else if($(port_id+(index+1)).hasClass("speed10G") === true)
    $(port_id+(index+1)).removeClass("speed10G");
  if(link === 1)
  {
    if($(port_id+(index+1)).hasClass("on") === false)
      $(port_id+(index+1)).addClass("on");        
    if(speed_status === 10)
      $(port_id+(index+1)).addClass("speed10M");
    if(speed_status === 100)
      $(port_id+(index+1)).addClass("speed100M");
    if(speed_status === 1000)
      $(port_id+(index+1)).addClass("speed1G");        
    if(speed_status === 10000)
      $(port_id+(index+1)).addClass("speed10G");  
    if(speed_status === 10000)
      $(port_id+(index+1)).addClass("speed10G");  
  }
  else
  {
    if($(port_id+(index+1)).hasClass("on") === true)
      $(port_id+(index+1)).removeClass("on");
  }     
}

function setPortUplink(index, uplink, link, cable, ticontroller, downlink){    
//  console.log("cable : ", cable);
  let port_id = "";
      
  if((isComboPort(index) && cable === 2) || (isOnlyFiberPort(index) && cable === 2))
    port_id = "#gport";
  else
    port_id = "#port"; 
  
  if($(port_id+(index+1)).hasClass("uplink") === true)
    $(port_id+(index+1)).removeClass("uplink");
  
  if($(port_id+(index+1)).hasClass("ticontroller") === true)
    $(port_id+(index+1)).removeClass("ticontroller");
  
  if($(port_id+(index+1)).hasClass("downlink") === true)
    $(port_id+(index+1)).removeClass("downlink");
    
  if(link === 1)
  {
    if(uplink === 1) {
      if($(port_id+(index+1)).hasClass("uplink") === false)
        $(port_id+(index+1)).addClass("uplink");
    } else if(ticontroller === 1) {
      if($(port_id+(index+1)).hasClass("ticontroller") === false)
        $(port_id+(index+1)).addClass("ticontroller");
    } else if(downlink === 1) {
      if($(port_id+(index+1)).hasClass("downlink") === false)
        $(port_id+(index+1)).addClass("downlink");
    }
  }  
}

function setPortBlockNConf(index, data, cable, port_poe_status){    
  var port_id = "#port";       
    
  if((isComboPort(index) && cable === 2) || (isOnlyFiberPort(index) && cable === 2))
    port_id = "#gport";
  
  var poe_status = "poe";
  if(port_poe_status != undefined)
  {
    if(port_poe_status.toUpperCase() == "Enable".toUpperCase())
      poe_status = "poe_watt";
    else if(port_poe_status.indexOf("Fault") != -1)
      poe_status = "poe_fault";
  }
  /*
  if(($(port_id+(index+1)).hasClass("uplink") === false) 
      && (data.cswitch_ports[index].secure === 1))
  {
    $(port_id+(index+1)).addClass("security");  
  }
  */
  if( ($(port_id+(index+1)).hasClass("uplink") === false
      && $(port_id+(index+1)).hasClass("ticontroller") === false
      && $(port_id+(index+1)).hasClass("downlink") === false)
      && (data.cswitch_ports[index].duplex_status === 0)
      && (data.cswitch_ports[index].link === 1) )
  {
    $(port_id+(index+1)).addClass("duplex");  
  }
  else if ($(port_id+(index+1)).hasClass("duplex") === true)
    $(port_id+(index+1)).removeClass("duplex");
  
  //if((data.oper_status === 1) && 
  if((data.cswitch_ports[index].self_loop_active != undefined) 
      && (data.cswitch_ports[index].self_loop_active == 0)
      && (data.cswitch_ports[index].self_loop_block != undefined) 
      && (data.cswitch_ports[index].self_loop_block == 1))
  {
    updateClass("self_loop", (port_id+(index+1)), index);      
    $(port_id+(index+1)).addClass("self_loop"); 
    
  }
  else if((data.rpvstp.status === 1) 
      && (data.cswitch_ports[index].rstp === 1)
      && (data.cswitch_ports[index].link === 1) 
      && (data.cswitch_ports[index].vlan_pvid_stp_status === 0))
  {
    updateClass("stp", (port_id+(index+1)), index);
    $(port_id+(index+1)).addClass("stp");       
  }
  /*
  else if(($(port_id+(index+1)).hasClass("uplink") === true) 
      && (data.cswitch_ports[index].secure === 1))
  {
  //  updateClass("security", (port_id+(index+1)), index);
    $(port_id+(index+1)).addClass("security");  
  }
  */
  else if(($(port_id+(index+1)).hasClass("uplink") === false
      && $(port_id+(index+1)).hasClass("ticontroller") === false
      && $(port_id+(index+1)).hasClass("downlink") === false) 
      && (data.cswitch_ports[index].poe === 1))
  {
    console.log("poe_status " + poe_status);
    updateClass(poe_status, (port_id+(index+1)), index);
    
    if(isComboPort(index))
    {
        if(data.cswitch_ports[index].cable === 2)
        {
            if($("#port"+(index+1)).hasClass(poe_status) === true)
              $("#port"+(index+1)).removeClass(poe_status);
        }
        else
        {
            if($("#gport"+(index+1)).hasClass(poe_status) === true)
              $("#gport"+(index+1)).removeClass(poe_status);
        }
        
        if(data.cswitch_ports[index].cable === 1)
          $(port_id+(index+1)).addClass(poe_status);
    }
    else
      $(port_id+(index+1)).addClass(poe_status);
  } else {
    let exception_class = "uplink";
    if($(port_id+(index+1)).hasClass("uplink") === false) {      
      if($(port_id+(index+1)).hasClass("ticontroller") == true)
        exception_class = "ticontroller";
      else if($(port_id+(index+1)).hasClass("downlink") == true)
        exception_class = "downlink";
    }
    updateClass(exception_class, (port_id+(index+1)), index);
  }
}

function setPortDim(index, cable, oper_status, noDimPort) {      

  if (index+1 === noDimPort || noDimPort === undefined)
  {
    if(cable === 1 && noDimPort && !isOnlyFiberPort(index))
    {
      if($("#gport"+(index+1)).hasClass("dim") === false)
        $("#gport"+(index+1)).addClass("dim");
    }
    if(cable === 2 && noDimPort)
    {
      if($("#port"+(index+1)).hasClass("dim") === false)
        $("#port"+(index+1)).addClass("dim");
    }
  }
  else
  {
    if($("#port"+(index+1)).hasClass("dim") === false)
      $("#port"+(index+1)).addClass("dim"); 
    if($("#gport"+(index+1)).hasClass("dim") === false)
      $("#gport"+(index+1)).addClass("dim"); 
  }
}

function setPortSchedule(index, status, cable){
  var port_id = "#port";
  if((isComboPort(index) && cable === 2) || isOnlyFiberPort(index))
    port_id = "#gport";
  var $spans = $(port_id+(index+1)).find("span");
  if(status == 1) {
    if($spans.length == 1)
      $(port_id+(index+1)).append('<span class="scheduled"></span>');
  } else {
    for(var i = 0; i < $spans.length; i++) {
      if($spans.eq(i).hasClass("scheduled")) {
        $spans.eq(i).remove();
        break;
      }
    }
  }
}

function updateClass(exception_class, tag_id, index)
{
  /* uplink */
   if(exception_class !== "uplink") 
   {
     if(isComboPort(index))
     {
       if($(tag_id).hasClass("uplink") === true)
         $(tag_id).removeClass("uplink");
       
       if(tag_id.indexOf("#port") != -1)
       {
         if($("#gport"+(index+1)).hasClass("uplink") === true)
           $("#gport"+(index+1)).removeClass("uplink");
       }
       
       if(tag_id.indexOf("#gport") != -1)
       {
         if($("#port"+(index+1)).hasClass("uplink") === true)
           $("#port"+(index+1)).removeClass("uplink");
       }
     }
     else if($(tag_id).hasClass("uplink") === true)
       $(tag_id).removeClass("uplink");
   }
   
   /* ticontroller */
   if(exception_class !== "ticontroller") 
   {
     if(isComboPort(index))
     {
       if($(tag_id).hasClass("ticontroller") === true)
         $(tag_id).removeClass("ticontroller");
       
       if(tag_id.indexOf("#port") != -1)
       {
         if($("#gport"+(index+1)).hasClass("ticontroller") === true)
           $("#gport"+(index+1)).removeClass("ticontroller");
       }
       
       if(tag_id.indexOf("#gport") != -1)
       {
         if($("#port"+(index+1)).hasClass("ticontroller") === true)
           $("#port"+(index+1)).removeClass("ticontroller");
       }
     }
     else if($(tag_id).hasClass("ticontroller") === true)
       $(tag_id).removeClass("ticontroller");
   }
   
   /* downlink */
   if(exception_class !== "downlink") 
   {
     if(isComboPort(index))
     {
       if($(tag_id).hasClass("downlink") === true)
         $(tag_id).removeClass("downlink");
       
       if(tag_id.indexOf("#port") != -1)
       {
         if($("#gport"+(index+1)).hasClass("downlink") === true)
           $("#gport"+(index+1)).removeClass("downlink");
       }
       
       if(tag_id.indexOf("#gport") != -1)
       {
         if($("#port"+(index+1)).hasClass("downlink") === true)
           $("#port"+(index+1)).removeClass("downlink");
       }
     }
     else if($(tag_id).hasClass("downlink") === true)
       $(tag_id).removeClass("downlink");
   }
   
   /* self_loop */
   if(exception_class !== "self_loop")
   {
     if(isComboPort(index))
     {
       if($(tag_id).hasClass("self_loop") === true)
         $(tag_id).removeClass("self_loop");
       
       if(tag_id.indexOf("#port") != -1)
       {
         if($("#gport"+(index+1)).hasClass("self_loop") === true)
           $("#gport"+(index+1)).removeClass("self_loop");
       }
       
       if(tag_id.indexOf("#gport") != -1)
       {
         if($("#port"+(index+1)).hasClass("self_loop") === true)
           $("#port"+(index+1)).removeClass("self_loop");
       }
     }
     else if($(tag_id).hasClass("self_loop") === true)
       $(tag_id).removeClass("self_loop");
   }
   
   /* stp */
   if(exception_class !== "stp") 
   {
     if(isComboPort(index))
     {
       if($(tag_id).hasClass("stp") === true)
         $(tag_id).removeClass("stp");
       
       if(tag_id.indexOf("#port") != -1)
       {
         if($("#gport"+(index+1)).hasClass("stp") === true)
           $("#gport"+(index+1)).removeClass("stp");
       }
       
       if(tag_id.indexOf("#gport") != -1)
       {
         if($("#port"+(index+1)).hasClass("stp") === true)
           $("#port"+(index+1)).removeClass("stp");
       }
     }
     else if($(tag_id).hasClass("stp") === true)
       $(tag_id).removeClass("stp");
   }
   
   /* poe */
   if(exception_class !== "poe")
   {
     if(isComboPort(index))
     {
       if($(tag_id).hasClass("poe") === true)
         $(tag_id).removeClass("poe");
       
       if(tag_id.indexOf("#port") != -1)
       {
         if($("#gport"+(index+1)).hasClass("poe") === true)
           $("#gport"+(index+1)).removeClass("poe");
       }
       
       if(tag_id.indexOf("#gport") != -1)
       {
         if($("#port"+(index+1)).hasClass("poe") === true)
           $("#port"+(index+1)).removeClass("poe");
       }
     }
     else if($(tag_id).hasClass("poe") === true)
       $(tag_id).removeClass("poe");
   } 
   
   /* security */
   /*
   if(exception_class !== "security")
   {
     if($(tag_id).hasClass("security") === true)
      $(tag_id).removeClass("security");
   }
   */ 
}


function isComboPort(index){
  //console.log("index",index);
  if(comboPort != undefined && comboPort.indexOf(index+1)!=-1){
    return true;
  }else{
    return false;
  }
}

/* chj97 added 160512 - for issue #34776 */
function isOnlyFiberPort(index){
  //console.log("Only Fiber port - index",index);
  if((fiberPort !== undefined) && (fiberPort.indexOf(index+1)!=-1)){
    return true;
  }else{
    return false;
  }
}

function checkOnlyAutoNegoForce(cswitches, cswitch_id, cable, port_name, port_no)
{
  var result = false;
  
  if(cable != "fiber")
    return result;
    
  var cswitch = getCswitch(cswitches, cswitch_id);
  var cswitch_model = cswitch.model;
  var module_types = [];
  if(cswitch.module_types != undefined && cswitch.module_types.length > 0)
    module_types = cswitch.module_types;
  var target_cswitch_model = c$ui.getDrawPortModel(cswitch_model);
  var tmp_port_no;
  
  if($.type(port_no) == "string" && port_no.indexOf(",") > -1)
  {
    var str_port_no = port_no.split(",");
    tmp_port_no = str_port_no[0] * 1;
  }
  else
    tmp_port_no = port_no * 1;
  
  //var model_speed_info = c$cswitch_model_speed_info[target_cswitch_model];
  var model_speed_info = cswitch.cswitch_port_speed_info;
  if(model_speed_info != undefined) {
    if(module_types != undefined 
        && module_types.length >= 3 
        && getCswitchFiberModule(cable, tmp_port_no, module_types) != "copper") {
      if(model_speed_info["auto_nego"][getCswitchFiberModule(cable, tmp_port_no, module_types)] != "yes")
        result = true;
      console.log("checkOnlyAutoNegoForce module " + result);
    } else {
      console.log("fiber port " + tmp_port_no + " index " + model_speed_info["fiber_port"].indexOf(tmp_port_no));
      console.log("fiber auto " + (model_speed_info["auto_nego"].fiber));
      if((model_speed_info["fiber_port"].indexOf(tmp_port_no) != -1)
          && ((model_speed_info["auto_nego"].fiber != "yes")))
        result = true;
      console.log("checkOnlyAutoNegoForce not module " + result);
    }
  }
  
  return result;
}

function checkMaxSpeedOfAutoNegoForce(cswitches, rowDatas)
{
  var result = true;
  var pre_speed_range = "";
  
  for(var i = 0; i < rowDatas.length; i++)
  {
    var cswitch = getCswitch(cswitches, rowDatas[i].cswitch_id);
    var cswitch_model = cswitch.model;
    var module_types = [];
    if(cswitch.module_types != undefined && cswitch.module_types.length > 0)
      module_types = cswitch.module_types;
    var speed_range = getOnlyFiberPortSpeedRangeStr(cswitch_model, c$replace.cable[rowDatas[i].cable], rowDatas[i].name, rowDatas[i].no, 0, module_types, cswitch.cswitch_port_speed_info);
    
    console.log("pre_speed_range : " + pre_speed_range + " speed_range : " + speed_range);
    if(i == 0)
      pre_speed_range = speed_range;
    else if(pre_speed_range != speed_range)
    {
      result = false;
      break;
    }
    
  }
  return result;
}

/*
 * 첫 로딩시엔 name의 값에 따라 auto_nego, speed, duplex 값을 설정한다.
 * 로딩 이후엔 augo_nego의 값에 따라 speed, duplex 값을 설정한다.
 */
 function changeAutoNego(changed, cswitches, rowDatas){
   var $autoNego = $("#auto_nego");
   var $cable = $("#cable");
   var $speed = $("#speed");
   var $duplex = $("#duplex");
   var cableKind = $cable.text();
   
   if(changed === undefined){
     var name = $("#name").text().substring(0, 2);
     var settings = {
       "ge": {"speed": "1000", "duplex": "1"}
       , "fe": {"speed": "100", "duplex": "1"}
       , "xg": {"speed": "10000", "duplex": "1"}
     };
     
     $autoNego.css("background-color", $autoNego.attr("data-value") === 0 ? "white" : "skyblue");
     if($autoNego.val() == 1||$autoNego.val()=="Multiple values"){ //auto
       $speed.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
       $duplex.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
     }else{ //force
       var cswitch = getCswitch(cswitches, rowDatas[0].cswitch_id);
       var cswitch_model = cswitch.model;
       var module_types = [];
       if(cswitch.module_types != undefined && cswitch.module_types.length > 0)
         module_types = cswitch.module_types;
       var speed_range = getOnlyFiberPortSpeedRangeStr(cswitch_model, cableKind, name, rowDatas[0].no, 0, module_types, cswitch.cswitch_port_speed_info);
       console.log(rowDatas);
       console.log(speed_range);
       var half_duplex_supported = true;
       var arr = JSON.parse($("#cswitch_port_keys").val());
       if(arr.length > 1){
         if(!checkMaxSpeedOfAutoNegoForce(cswitches, rowDatas))
         {
           $.alert(jQuery.i18n.prop("ports.msg.differentSpeedRanges"));
           var multiple = c$array.isMultiple(rowDatas, "auto_nego");
           if(multiple)
             $autoNego.val("Multiple values").prop("selected", true);
           else
             $autoNego.val(rowDatas[0].auto_nego).prop("selected", true);
           $speed.html("<option value='-1'>"+ jQuery.i18n.prop('ports.word.differentSpeedRanges') + "</option>").val(-1);
           return;
         }
         c$ui.option({$object: $speed, list: c$replace[speed_range], selected: settings[name].speed});
         $speed.attr("data-value", -1).css("background-color", $speed.attr("data-value") === $speed.val() ? "white" : "skyblue");
           
         if($cable.text() == "fiber")
           $duplex.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
         else
         {
           for(var i = 0; i < rowDatas.length; i++)
           {
             var cswitch = getCswitch(cswitches, rowDatas[i].cswitch_id);
             if(isHalfDuplexSupported(cswitch.cswitch_port_speed_info, $("#cable").text()) == false)
             {
               half_duplex_supported = false;
               break;
             }
           }
           c$ui.option({$object: $duplex, list: c$replace["duplex"], selected: settings[name].duplex});
           if(half_duplex_supported == false)
             $duplex.attr("disabled", true).css("background-color", "silver");
           else
             $duplex.attr("data-value", -1).css("background-color", $duplex.attr("data-value") === $duplex.val() ? "white" : "skyblue");
         }
       
       }else{
         half_duplex_supported = isHalfDuplexSupported(cswitch.cswitch_port_speed_info, cableKind);
         console.log($speed.attr("data-value"));
         var speedDataValue = $speed.attr("data-value");
         if(speedDataValue == -1){
           c$ui.option({$object: $speed, list: c$replace[speed_range], selected: settings[name].speed});
           $speed.attr("data-value", speedDataValue).css("background-color", $speed.attr("data-value") === $speed.val() ? "white" : "skyblue");
         }else{
           c$ui.option({$object: $speed, list: c$replace[speed_range], selected: speedDataValue});
           $speed.attr("data-value", speedDataValue).css("background-color", $speed.attr("data-value") === $speed.val() ? "white" : "skyblue");
         }
         var duplexDataValue = $duplex.attr("data-value");
         if(duplexDataValue == -1){
           if($cable.text() == "fiber")
             $duplex.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
           else
           {
             c$ui.option({$object: $duplex, list: c$replace["duplex"], selected: settings[name].duplex});
             if(half_duplex_supported == false)
               $duplex.attr("disabled", true).css("background-color", "silver");
             else 
               $duplex.attr("data-value", duplexDataValue).css("background-color", $duplex.attr("data-value") === $duplex.val() ? "white" : "skyblue");
           }
         }else{
           if($cable.text() == "fiber")
             $duplex.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
           else
           {
             if(half_duplex_supported == false)
             {
               c$ui.option({$object: $duplex, list: c$replace["duplex"], selected: settings[name].duplex});
               $duplex.attr("disabled", true).css("background-color", "silver");
             }
             else
             {
               c$ui.option({$object: $duplex, list: c$replace["duplex"], selected: duplexDataValue});
               $duplex.attr("data-value", duplexDataValue).css("background-color", $duplex.attr("data-value") === $duplex.val() ? "white" : "skyblue");
             }
           }
         }
       }
     }
   }else{
     
     if($cable.text() == "combo"||$cable.text() == "Multiple cable"){
       $autoNego.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
       $speed.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
       $duplex.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
       $speed.attr("data-value","-1")
       $duplex.attr("data-value","-1")
     }else{
       if($autoNego.val() == 1||$autoNego.val()=="Multiple values"){ //auto
         $speed.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
         $duplex.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
         $speed.attr("data-value","-1");
         $duplex.attr("data-value","-1");
         if($autoNego.val()=="Multiple values")
         {
           for(var i = 0; i < rowDatas.length; i++)
           {
             if(checkOnlyAutoNegoForce(cswitches, rowDatas[i].cswitch_id, $("#cable").text(), rowDatas[i].name, rowDatas[i].no))
             {
               $autoNego.attr("disabled", true).css("background-color", "silver");
               break;
             }
           }
         }
         
         if(!checkMaxSpeedOfAutoNegoForce(cswitches, rowDatas))
         {
           if($autoNego.val() == 1)
             $autoNego.attr("disabled", true).css("background-color", "silver");
           $speed.html("<option value='-1'>"+ jQuery.i18n.prop('ports.word.differentSpeedRanges') + "</option>").val(-1);
         }
       }else{ //force
         //var rowDatas = $scope.gridOptions.getSelected()          
         var speedMultiple = c$array.isMultiple(rowDatas, "speed");
         var duplexMultiple = c$array.isMultiple(rowDatas, "duplex");
         var speedChangedStatus = false;
         var duplexChangedStatus = false;
         var maxSpeedValueStatus = false;
         
         for(var i = 0; i < rowDatas.length; i++)
         {
           if(checkOnlyAutoNegoForce(cswitches, rowDatas[i].cswitch_id, $("#cable").text(), rowDatas[i].name, rowDatas[i].no))
           {
             $autoNego.attr("disabled", true).css("background-color", "silver");
             break;
           }
         }
         
         if($cable.text() == "fiber")
         {
        	$duplex.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
        	duplexChangedStatus = true;
         }
         
         if(speedMultiple && !speedChangedStatus){
           $speed.changed({"data-value":"Multiple values"}).val("Multiple values");
         }

         if(!checkMaxSpeedOfAutoNegoForce(cswitches, rowDatas) && !speedChangedStatus)
         {
           $speed.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>"+ jQuery.i18n.prop('ports.word.differentSpeedRanges') + "</option>").val(-1);
           $speed.attr("data-value","-1");
         }
         
         if(duplexMultiple && !duplexChangedStatus){
           $duplex.changed({"data-value":"Multiple values"}).val("Multiple values");
           duplexChangedStatus = true;
         }
         
         for(var i = 0; i < rowDatas.length; i++)
         {
           var cswitch = getCswitch(cswitches, rowDatas[i].cswitch_id);
           if(isHalfDuplexSupported(cswitch.cswitch_port_speed_info, $("#cable").text()) == false)
           {
             $duplex.attr("disabled", true).css("background-color", "silver");
             break;
           }
         }
         
         if(!duplexMultiple && !duplexChangedStatus && rowDatas[0].duplex == -1 && $cable.text() == "copper") {
           var cswitch = getCswitch(cswitches, rowDatas[0].cswitch_id);
           var target_cswitch_model = c$ui.getDrawPortModel(cswitch.model);
           var model_speed_info = cswitch.cswitch_port_speed_info;
           if(model_speed_info != undefined) {
             var combo_port = model_speed_info["combo_port"];
             for(var i = 0; i < combo_port.length; i++) {
               if(combo_port[i] == rowDatas[0].no) {
                 $duplex.attr("data-value", -1).css("background-color", "skyblue").val(1).trigger("change");
                 break;
               }
             }
           }
         }
         //c$ui.option({$object: $speed, list: c$replace["speed"], selected: $speed.attr("data-value")});
         //c$ui.option({$object: $duplex, list: c$replace["duplex"], selected: $duplex.attr("data-value")});
         //$speed.css("background-color", $autoNego.attr("data-value") === $autoNego.val() ? "white" : "skyblue");
         //$duplex.css("background-color", $autoNego.attr("data-value") === $autoNego.val() ? "white" : "skyblue");
       }
     }
   }
 }; //end: function changeAutoNego(chnaged){
 
 function changePortActive(rowDatas){
   var ports = "";
   var storm_control_port_down = "";
   if(rowDatas.length > 1) {
     for(var i = 0; i < rowDatas.length; i++) {
       if(storm_control_port_down.length > 0)
         storm_control_port_down != ",";       
       storm_control_port_down = getStormControlPortDown(rowDatas[i], storm_control_port_down);      
       if(rowDatas[i].active_schedule == 1) {
         if(ports.length > 0)
           ports +=",";
         ports += rowDatas[i].name;
       }
     }
   } else {
     storm_control_port_down = getStormControlPortDown(rowDatas[0], storm_control_port_down);     
     if(rowDatas[0].active_schedule == 1)
       ports = rowDatas[0].name;
   }
   
   if(storm_control_port_down.length > 0 && ports.length > 0) {
     var str = jQuery.i18n.prop("ports.msg.warningSetSchedulePortActive") + "(port:" + ports + ")";
     str += "<br>" + jQuery.i18n.prop("ports.msg.warningStormPortDown") + "(port:" + storm_control_port_down + ")";
     $.alert(str, 2);
     return;
   }
   
   if(storm_control_port_down.length > 0) {
     var str = jQuery.i18n.prop("ports.msg.warningStormPortDown") + "(port:" + storm_control_port_down + ")";
     $.alert(str, 2);
     return;
   }
   
   if(ports.length > 0) {
     var str = jQuery.i18n.prop("ports.msg.warningSetSchedulePortActive") + "(port:" + ports + ")";
     $.alert(str, 2);
     return;
   }
 }
 
 function getStormControlPortDown(data, storm_control_port_down) {
   if(data.name.indexOf(",")  != -1) {
     if(data.storm_control_active_status != undefined 
         && data.storm_control_active_status == 1
         && data.storm_control_port_down != undefined
         && data.storm_control_port_down.length > 0) {
       storm_control_port_down += data.storm_control_port_down;
     }
   } else {
     if(data.active == 0 
         && data.storm_control_active_status != undefined
         && data.storm_control_active_status == 1) {
       storm_control_port_down += data.name;
     }
   }
   
   return storm_control_port_down;
 }

 
 /* chj97 added 151110 - for issue #30553 */    
 function changeChannelGroup(changed, rowDatas){
   
   var $channel_group_type = $("#channel_group_type");     
   var $channel_group_lb = $("#channel_group_lb");     
   
   if(changed === undefined)
   {
     console.log("changeChannelGroup : changed == false");
   
     var name = $("#name").text().substring(0, 2);
        
         $channel_group_type.css("background-color", $channel_group_type.attr("data-value") === 0 ? "white" : "skyblue");
         if($channel_group_type.val() == 0 ||$channel_group_type.val() =="Multiple values"){
           $channel_group_type.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);             
           $channel_group_lb.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
         }else{ 
         
           var arr = JSON.parse($("#cswitch_port_keys").val());
          
           if(arr.length > 1){
            // var rowDatas = $scope.gridOptions.getSelected();
             var channelGroupTypeMultiple = c$array.isMultiple(rowDatas, "channel_group_type");                
             var channelGroupLBMultiple = c$array.isMultiple(rowDatas, "channel_group_lb");
             
             if(channelGroupTypeMultiple){
                 if($channel_group_type.attr("data-value")!="Multiple values"){
                   c$ui.option({$object: $channel_group_type, list: c$replace["channel_group_type"], "multiple": true, "data-value": true});
                   $channel_group_type.changed({"data-value":"Multiple values"}).val("Multiple values");
                   $channel_group_type.attr("disabled", false);
                 }else{
                   //console.log($cable.text());
                   c$ui.option({$object: $channel_group_type, list: c$replace["channel_group_type"], selected: "2"});
                   $channel_group_type.attr("data-value", -1).css("background-color", $channel_group_type.attr("data-value") === $channel_group_type.val() ? "white" : "skyblue");
                 }
               }else{
                 c$ui.option({$object: $channel_group_type, list: c$replace["channel_group_type"], selected: "2"});
                 $channel_group_type.attr("data-value", -1).css("background-color", $channel_group_type.attr("data-value") === $channel_group_type.val() ? "white" : "skyblue");
               }                
             
             if(channelGroupLBMultiple){
                 if($channel_group_type.attr("data-value")!="Multiple values"){
                   c$ui.option({$object: $channel_group_lb, list: c$replace["channel_group_lb"], "multiple": true, "data-value": true});
                   $channel_group_lb.changed({"data-value":"Multiple values"}).val("Multiple values");
                   $channel_group_lb.attr("disabled", false);
                 }else{
                   //console.log($cable.text());
                   c$ui.option({$object: $channel_group_lb, list: c$replace["channel_group_lb"], selected: "1"});
                   $channel_group_lb.attr("data-value", -1).css("background-color", $channel_group_lb.attr("data-value") === $channel_group_lb.val() ? "white" : "skyblue");
                 }
               }else{
                 c$ui.option({$object: $channel_group_lb, list: c$replace["channel_group_lb"], selected: "1"});
                 $channel_group_lb.attr("data-value", -1).css("background-color", $channel_group_lb.attr("data-value") === $channel_group_lb.val() ? "white" : "skyblue");
               }
            
           }else{
             console.log($channel_group_type.attr("data-value"));
             
             var channelGroupTypeDataValue = $channel_group_type.attr("data-value");
             if(channelGroupTypeDataValue == -1){                  
               c$ui.option({$object: $channel_group_type, list: c$replace["channel_group_type"], selected: "2"});
               $channel_group_type.attr("data-value", channelGroupTypeDataValue).css("background-color", $channel_group_type.attr("data-value") === $channel_group_type.val() ? "white" : "skyblue");
             }else{
               c$ui.option({$object: $channel_group_type, list: c$replace["channel_group_type"], selected: channelGroupTypeDataValue});
               $channel_group_type.attr("data-value", channelGroupTypeDataValue).css("background-color", $channel_group_type.attr("data-value") === $channel_group_type.val() ? "white" : "skyblue");
             } 
          
             var channelGroupLBDataValue = $channel_group_lb.attr("data-value");
             if(channelGroupLBDataValue == -1){
               c$ui.option({$object: $channel_group_lb, list: c$replace["channel_group_lb"], selected: "1"});
               $channel_group_lb.attr("data-value", channelGroupLBDataValue).css("background-color", $channel_group_lb.attr("data-value") === $channel_group_lb.val() ? "white" : "skyblue");
             }else{
               c$ui.option({$object: $channel_group_lb, list: c$replace["channel_group_lb"], selected: channelGroupLBDataValue});
               $channel_group_lb.attr("data-value", channelGroupLBDataValue).css("background-color", $channel_group_lb.attr("data-value") === $channel_group_lb.val() ? "white" : "skyblue");
             }      
           }
         }
   }
   else
   {         
     console.log("changeChannelGroup : changed == false");
     if($("#name").text().indexOf(',') < 0)
     {         
       $channel_group_type.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);         
           $channel_group_lb.attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
           $channel_group_type.attr("data-value","-1")             
           $channel_group_lb.attr("data-value","-1")
     }
     else
     {
       //var rowDatas = $scope.gridOptions.getSelected() 
       var channelGroupTypteMultiple = c$array.isMultiple(rowDatas, "channel_group_type");            
           var channelGroupLBMultiple = c$array.isMultiple(rowDatas, "channel_group_lb");
           
           if(channelGroupTypeMultiple){
             $channel_group_type.changed({"data-value":"Multiple values"}).val("Multiple values");
           }           
           
           if(channelGroupLBMultiple){
             $channel_group_lb.changed({"data-value":"Multiple values"}).val("Multiple values");
           }
     }
   }
 } //end: function changeChannelGroup(changed){  

 
 
function isMultipleTag(rowDatas,key){
  if(rowDatas.length == 1){
    return false;
  }
  let arr = c$array.getKeysJsonArray(rowDatas,[key]);
  let len = arr.length;
  for(let i=1;i<len;i++){
    let len2 = arr[i-1].tags.length;
    let len3 = arr[i].tags.length;
    if(len2 != len3){
      console.log("diff1");
      return true;
    }else{
      for(let j=0;j<len2;j++){
        let find = false;
        for(var k=0;k<len3;k++){
          if(arr[i-1].tags[j].name == arr[i].tags[k].name) find = true;
        }        
        if(!find) return true;
      }
    }
  }
  return false;
}

function isMultipleStpVlans(rowDatas,vid,key){
  var result = false;
  var copied = c$array.copy(rowDatas);
  while(copied.length > 1){
    var src = copied.splice(0, 1);
    for(var i = 0; i < copied.length; i++){
      for(var j = 0; j < copied[i].cswitch_port_stp_vlans.length; j++){
        if($.trim(src[0].cswitch_port_stp_vlans[j].vlan) == vid && $.trim(copied[i].cswitch_port_stp_vlans[j].vlan) == vid) {
          if($.trim(src[0].cswitch_port_stp_vlans[j][key]) !== $.trim(copied[i].cswitch_port_stp_vlans[j][key])){
            result = true;
            return result;
          }
          break;
        }
      }
    }
  } //end: while(copied.length > 1){
  return result;
}

function isStpVlansItemsEnabled(rowDatas){
  var result = true;
  var copied = c$array.copy(rowDatas);

  while(copied.length > 1){
    var src = copied.splice(0, 1);
    
    for(var i = 0; i < copied.length; i++){
      var tagged1 = ti$common.changeVlanStringToArray(src[0].vlan_tagged);
      var untagged1 = ti$common.changeVlanStringToArray(src[0].vlan_untagged);
      var vlans1 = tagged1.concat(untagged1);
      vlans1 = vlans1.sort(function(a,b) {return a - b;});
      
      var tagged2 = ti$common.changeVlanStringToArray(copied[i].vlan_tagged);
      var untagged2 = ti$common.changeVlanStringToArray(copied[i].vlan_untagged);
      var vlans2 = tagged2.concat(untagged2);
      vlans2 = vlans2.sort(function(a,b) {return a - b;});
      
      if(vlans1.length != vlans2.length) {
        result = false;
        return result;
      } 
      
      if(JSON.stringify(vlans1) !== JSON.stringify(vlans2)) {
        result = false;
        return result;
      } 
    }
  } //end: while(copied.length > 1){
  return result;
}


function lsAlreadyKey(arr,key){
  var len = arr.length;
  console.log("chj97 test key ", arr, key)
  for(var i=0;i<len;i++){
    console.log("chj97 test key ", arr[i].name, key)
    if(arr[i].name == key){
      return true;
    }
    return false;
  }
}

function changeJumboFrame(){
  if($("#jumbo_frame").val() == 1){
    $("#mtu").attr("readonly", true).css("background-color", "silver").val(-1);
  }else{
    $("#mtu").attr("readonly", false).css("background-color", "white").val($("#mtu").attr("data-value"));
  }
}; //end: function changeJumboFrame(){

function changePoePowerThreshold(rowDatas, changed){
  if(rowDatas != undefined && rowDatas.length > 0)
  {
    var multiple = c$array.isMultiple(rowDatas, "power_threshold_user");
    var power_threshold = $("#power_threshold").val();
    var value = "";
    var invalid_multiple = false;
    var power_threshold_supported = true;
    
    for(var i = 0; i < rowDatas.length; i++) {
      if(rowDatas[i].poe_auto_power_up_supported != undefined &&rowDatas[i]. poe_auto_power_up_supported == 0) {
        power_threshold_supported = false;
        break;
      }
    }
    
    if(power_threshold_supported == false) {
      $("#power_threshold").attr("disabled", true).css("background-color", "silver");
    }
    
    if(changed == undefined && rowDatas.length <= 1)
      power_threshold = rowDatas[0].power_threshold;
    
    if(power_threshold != 2)
    {
      value = "-";
      if(power_threshold == "Multiple values")
      {
        for(var i = 0; i < rowDatas.length; i++)
        {
          if(!rowDatas[i].hasOwnProperty("power_threshold_user"))
          {
            invalid_multiple = true;
            break;
          }
        }
        
        if(invalid_multiple != true)
          value = "Multiple values";
      }
       
      $("#power_threshold_user").attr("disabled", true).css("background-color", "silver").val(value);
      //console.log(" changePoePowerThreshold " + value);
    }
    else
    {
      if(multiple)
      {
        for(var i = 0; i < rowDatas.length; i++)
        {
          console.log(rowDatas[i])
          if(!rowDatas[i].hasOwnProperty("power_threshold_user"))
          {
            invalid_multiple = true;
            break;
          }
        }
        if(invalid_multiple != true)
          value = "Multiple values";
      }
      else if((rowDatas.length <= 1 && rowDatas[0].power_threshold_user != "-")
          || (rowDatas.length > 1))
        value = rowDatas[0].power_threshold_user;
      $("#power_threshold_user").attr("disabled", false).css("background-color", "white").val(value);
      
      if(power_threshold_supported == false)
        $("#power_threshold_user").attr("disabled", true).css("background-color", "silver");
    }
  }
  return;
}; 

function changePoeFourPair(rowDatas){
  if(rowDatas != undefined && rowDatas.length > 0)
  {
    for(var i = 0; i < rowDatas.length; i++)
    {
      var cswitch_poe_port = rowDatas[i];
      if(cswitch_poe_port.poe_four_pair_supported != undefined 
          && cswitch_poe_port.poe_four_pair_supported == 0)
      {
        $("#four_pair").attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
        return;
      }
    }
  }
};

function changePoeAutoPower(rowDatas){
  if(rowDatas != undefined && rowDatas.length > 0)
  {
    for(var i = 0; i < rowDatas.length; i++)
    {
      var cswitch_poe_port = rowDatas[i];
      if(cswitch_poe_port.poe_auto_power_up_supported != undefined 
          && cswitch_poe_port.poe_auto_power_up_supported == 0)
      {
        $("#auto_power_up").attr("disabled", true).css("background-color", "silver");
        return;
      }
    }
  }
};

function changePoeTimer(rowDatas, changed){
  var multiple = c$array.isMultiple(rowDatas, "timer");
  var multiple_stime = c$array.isMultiple(rowDatas, "start_time");
  var multiple_etime = c$array.isMultiple(rowDatas, "end_time");
  var timer = $("#timer").val();
  
  //console.log("changePoeTimer changed " + changed + " multiple " + multiple + " timer " + timer);
  
  if(timer == 0){
    $("#start_time").attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
    $("#end_time").attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
  }else{
    if(multiple && timer == "Multiple values")
    {
      c$ui.option({$object: $("#start_time"), list: getPoeStartTimeOption(), "multiple": true, "data-value": true});
      $("#start_time").changed({"data-value":"Multiple values"});
      $("#start_time").attr("disabled", true).css("background-color", "silver");
      c$ui.option({$object: $("#end_time"), list: getPoeEndTimeOption(), "multiple": true, "data-value": true});
      $("#end_time").changed({"data-value":"Multiple values"});
      $("#end_time").attr("disabled", true).css("background-color", "silver");
    }
    else
    {
      if(changed) {
        var selected_time = "00:00";
        if(!multiple_stime && rowDatas[0].hasOwnProperty("start_time"))
          selected_time =  rowDatas[0]["start_time"];
        c$ui.option({$object: $("#start_time"), list: getPoeStartTimeOption(), selected: getKeyPoeTimeOptions(getPoeStartTimeOption(), selected_time), "data-value": true});
        $("#start_time").changed({"data-value":getKeyPoeTimeOptions(getPoeStartTimeOption(), selected_time)});
        if(!multiple_stime && rowDatas[0].hasOwnProperty("end_time"))
          selected_time =  rowDatas[0]["end_time"];
        c$ui.option({$object: $("#end_time"), list: getPoeEndTimeOption(), selected: getKeyPoeTimeOptions(getPoeEndTimeOption(),selected_time), "data-value": true});
        $("#end_time").changed({"data-value":getKeyPoeTimeOptions(getPoeEndTimeOption(), selected_time)});        
      } else {
        if(!multiple_stime) {
          let selected_time = "00:00";
          if(rowDatas[0].hasOwnProperty("start_time"))
            selected_time =  rowDatas[0]["start_time"];
          c$ui.option({$object: $("#start_time"), list: getPoeStartTimeOption(), selected: getKeyPoeTimeOptions(getPoeStartTimeOption(), selected_time), "data-value": true});
          $("#start_time").changed({"data-value":getKeyPoeTimeOptions(getPoeStartTimeOption(), selected_time)});
        }
        
        if(!multiple_etime) {
          let selected_time = "00:00";
          if(rowDatas[0].hasOwnProperty("end_time"))
            selected_time =  rowDatas[0]["end_time"];
          c$ui.option({$object: $("#end_time"), list: getPoeEndTimeOption(), selected: getKeyPoeTimeOptions(getPoeEndTimeOption(),selected_time), "data-value": true});
          $("#end_time").changed({"data-value":getKeyPoeTimeOptions(getPoeEndTimeOption(), selected_time)});
        }
      }
    }
  }
}; 

function controlPanel(data){
  var $type = $("select[name='type']");
  var $id = $("input[name='id']");
  var $ip = $("input[name='ip']");
  var $vlan = $("input[name='vlan']");
  var $gateway = $("input[name='gateway']");
  var $subnetMask = $("input[name='subnet_mask']");
  var $primaryDns = $("input[name='primary_dns']");
  var $secondaryDns = $("input[name='secondary_dns']");

  if(data === undefined){//select
    /*
    $ip.val($ip.attr("data-value"));
    $vlan.val($vlan.attr("data-value"));
    $gateway.val($gateway.attr("data-value"));
    $subnetMask.val($subnetMask.attr("data-value"));
    $primaryDns.val($primaryDns.attr("data-value"));
    $secondaryDns.val($secondaryDns.attr("data-value"));
    */

    $ip.val("");
    $vlan.val($vlan.attr("data-value"));
    $gateway.val("");
    $subnetMask.val("");
    $primaryDns.val("");
    $secondaryDns.val("");
    setCswitchIp();
  }else{ //end: if(data === undefined){
    if(data.length === 1){
      if(data[0].cswitch_ip !== undefined){
        $("input[name='uplink']").val(data[0].uplink);

        $type.changed({"data-value":data[0].cswitch_ip.type}).val(data[0].cswitch_ip.type)
        $id.changed({"data-value":data[0].cswitch_ip.id}).val(data[0].cswitch_ip.id)
        $ip.changed({"data-value":data[0].cswitch_ip.ip}).val(data[0].cswitch_ip.ip)
        $vlan.changed({"data-value":data[0].cswitch_ip.vlan}).val(data[0].cswitch_ip.vlan)
        $gateway.changed({"data-value":data[0].cswitch_ip.gateway}).val(data[0].cswitch_ip.gateway)
        $subnetMask.changed({"data-value":data[0].cswitch_ip.subnet_mask}).val(data[0].cswitch_ip.subnet_mask)
        $primaryDns.changed({"data-value":data[0].cswitch_ip.primary_dns}).val(data[0].cswitch_ip.primary_dns)
        $secondaryDns.changed({"data-value":data[0].cswitch_ip.secondary_dns}).val(data[0].cswitch_ip.secondary_dns)
        
        setCswitchIp();

        $("#cswitch_ip_form div.con").show();
      }else{ //end: if(data[0].cswitch_ip !== undefined){
        $("#cswitch_ip_form div.con").hide();
        /* chj97 modified 151112 - for issue #30553 (560 -> 650) */
        $("div.divPopup.pop_update_port2").height(650);
      } //end: }else{ //end: if(data[0].cswitch_ip !== undefined){
    }else{ //end: if(length === 1 && uplink === 1){
      $("#cswitch_ip_form div.con").hide();
      /* chj97 modified 151112 - for issue #30553 (560 -> 650) */
      $("div.divPopup.pop_update_port2").height(650 + $("#cswitch_ports").height() - 18);
    } //end: }else{ //end: if(length === 1 && uplink === 1){

    $("#cswitch_port_form div.con").eq(0).show();
  } //end: }else{ //end: if(data === undefined){
} //end: function controlPanel(data){


function setCswitchIp(){
  
  console.log("setCswitchIp");
  var $type = $("select[name='type']");
  console.log($type.val());
  var $id = $("input[name='id']");
  var $ip = $("input[name='ip']");
  var $vlan = $("input[name='vlan']");
  var $gateway = $("input[name='gateway']");
  var $subnetMask = $("input[name='subnet_mask']");
  var $primaryDns = $("input[name='primary_dns']");
  var $secondaryDns = $("input[name='secondary_dns']");

  if($type.val() === "0"||$type.val()===null){
    /* chj97 modified 151112 - for issue #30553 (710 -> 800) */
    $("div.divPopup.pop_update_port2").height(800);
    $ip.closest("tr").hide();
    $vlan.closest("tr").show();
    $gateway.closest("tr").hide();
    $subnetMask.closest("tr").hide();
    $primaryDns.closest("tr").hide();
    $secondaryDns.closest("tr").hide();
  }else{ //end: if($type.val() === "0"){
    /* chj97 modified 151112 - for issue #30553 (860 -> 950) */
    $("div.divPopup.pop_update_port2").height(950);
    $ip.closest("tr").show();
    $vlan.closest("tr").show();
    $gateway.closest("tr").show();
    $subnetMask.closest("tr").show();
    $primaryDns.closest("tr").show();
    $secondaryDns.closest("tr").show();
  } //end: }else{ //end: if($type.val() === "0"){
} //end: function setCswitchIp(){

function getCswitch(cswitches, cswitch_id)
{
  var cswitch;
  
  if(cswitches != undefined){
    if(Array.isArray(cswitches)){
      for(var i = 0; i < cswitches.length; i++) {
        if(cswitches[i].cswitch_id == cswitch_id) {
          cswitch = cswitches[i];
          break;
        }
      }
    } else {
      if(cswitches.id == cswitch_id)
        cswitch = cswitches;
    }
  }
  return cswitch;
}

function getCswitchModel(cswitches, cswitch_id)
{
  var cswitch_model;
  
  if(cswitches != undefined)
  {
    if(Array.isArray(cswitches))
    {
      for(var i = 0; i < cswitches.length; i++)
      {
        if(cswitches[i].cswitch_id == cswitch_id)
        {
          cswitch_model = cswitches[i].model;
          break;
        }
      }
    }
    else
    {
      if(cswitches.id == cswitch_id)
        cswitch_model = cswitches.model;
    }
  }
  return cswitch_model;
}

function getCswitchModuleTypes(cswitches, cswitch_id)
{
  var module_types = [];
  
  if(cswitches != undefined)
  {
    if(Array.isArray(cswitches))
    {
      for(var i = 0; i < cswitches.length; i++)
      {
        if(cswitches[i].cswitch_id == cswitch_id)
        {
          module_types = cswitches[i].module_types;
          break;
        }
      }
    }
    else
    {
      if(cswitches.id == cswitch_id)
        module_types = cswitches.module_types;
    }
  }
  return module_types;
}

function getCswitchFiberModule(cable, port_no, module_types) {
  var tmp_port_no;
  if($.type(port_no) == "string" && port_no.indexOf(",") > -1)
  {
    var str_port_no = port_no.split(",");
    tmp_port_no = str_port_no[0] * 1;
  }
  else
    tmp_port_no = port_no * 1;
  
  console.log("getCswitchFiberModule cable " + cable + " port_no " + port_no + " " + typeof(port_no) + " tmp_port_no " + tmp_port_no);
  console.log(module_types);
  
  if(module_types != undefined && module_types.length >= 3) {
    if((tmp_port_no >= 1 && tmp_port_no <= 8 && module_types[0] == 2) 
        || (tmp_port_no >= 9 && tmp_port_no <= 16 && module_types[1] == 2)
        || (tmp_port_no >= 17 && tmp_port_no <= 24 && module_types[2] == 2))
      return "fiber_module_1g";
  }
  return cable;
}

function getOnlyFiberPortSpeedRangeStr(model, cable, port_name, port_no, auto_nego, module_types, model_speed_info)
{
  var result_str = "speed_";
  var range_str;
  
  console.log(model + " " + cable + " " + port_name + " " + port_no + " " + auto_nego);
  console.log(module_types);
  
  if(model != undefined)
  {
    var target_cswitch_model = c$ui.getDrawPortModel(model);
    if(model_speed_info != undefined)
    {
      if(!auto_nego)
      {
        var speed_info = model_speed_info["force"];
        if(speed_info != undefined)
        {
          // lacp 묶은 포트는  port_no : "23,24" 
          // model_speed_info["combo_port"] 항목은 number type 위의 경우 항상 -1
          // port_no 가 하나 이상일 경우 첫번째 항목의 값을 비교하여 표시 - 항상 동일한 cable 일때
          const port = (port_no == undefined) ? undefined : port_no.toString().split(',')[0];
          console.log(model_speed_info["combo_port"].indexOf(port) + " " + cable);
          if((cable == "fiber" && model_speed_info["combo_port"].indexOf(port) != -1)
              || (cable == "combo"))
            range_str = speed_info["fiber_combo_1g"];
          else if(module_types != undefined && cable == "fiber") {
            range_str = speed_info[getCswitchFiberModule(cable, port, module_types)];
            console.log("range_str " + range_str);
          }
          else
            range_str = speed_info[cable];
        }
      }
    }
  }
  
  if(range_str == undefined)
  {
    if(cable == "fiber" && port_name.indexOf("ge") != -1)
      range_str = cable + "_1g";
    else
      range_str = cable;
  }
  
  if(range_str != undefined)
    result_str += range_str;
  
  console.log(result_str);
  
  return result_str;
}

function isHalfDuplexSupported(cswitch_port_speed_info, cable)
{
  if(cswitch_port_speed_info != undefined && cable == "copper")
  {
    if(cswitch_port_speed_info.half_duplex_unsupported != undefined
        && cswitch_port_speed_info.half_duplex_unsupported == 1)
      return false;
  }
  
  return true;
}


function getStpPriorityOptions() {
  var options = { "0": 0 };
  
  for(var i = 1; i < 16; i++) {
    var property = (i * 16) + "";
    options[property] = (i * 16);
  }
  
  //console.log(options);
  
  return options;
}

var c$PortFiltering = {
    getMinLogInterval: function() {
     var min_log_interval = 1;
     return min_log_interval;
    } //end: getLogInterval: function()
  
  , getMaxLogInterval: function() {
    var min_log_interval = 600;
    return min_log_interval;
   } //end: getLogInterval: function()
  
  , setPopupData: function(rowDatas){
      var selectOptions = ["netbios", "smb", "dhcp_reply", 
        "dhcp_request", "dhcp_reply_log_level", "dhcp_request_log_level",
        "ethertype_arp", "ethertype_ipv4", "ethertype_ipv6"];
      var dhcp_show = true;
      var ethertype_arp_show = true;
      
      for(var i = 0; i < rowDatas.length; i++) {
        if(!rowDatas[i].dhcp_filtering_support) {
          dhcp_show = false;
        }
        
        if(!rowDatas[i].arp_filtering_support) {
          ethertype_arp_show = false;
        }
      }
      
      for(var i = 0; i < selectOptions.length; i++){
        var options = this.getOptions(selectOptions[i]);
        var service_type = this.getServiceType(selectOptions[i]);
        var filtering_type = this.getFilteringType(selectOptions[i]);
        var key = this.getKeyOfServiceType(selectOptions[i]);
        var multiple = this.isMultiple(rowDatas, service_type, filtering_type, key);
        if(multiple) {
          c$ui.option({$object: $("#" + selectOptions[i]), list: options, "multiple": true, "data-value": true});
          $("#" + selectOptions[i]).changed({"data-value":"Multiple values"});          
          if((!dhcp_show && (selectOptions[i] == "dhcp_reply" || selectOptions[i] == "dhcp_request"
            || selectOptions[i] == "dhcp_reply_log_level" || selectOptions[i] == "dhcp_request_log_level"))
            || (!ethertype_arp_show && selectOptions[i] == "ethertype_arp")) {           
            c$ui.option({$object: $("#" + selectOptions[i]), list: options, "multiple": true, "data-value": true});
            $("#" + selectOptions[i]).changed({"data-value":"Multiple values"}).attr("disabled", true).css("background-color", "silver");
          } else {
            c$ui.option({$object: $("#" + selectOptions[i]), list: options, "multiple": true, "data-value": true});
            $("#" + selectOptions[i]).changed({"data-value":"Multiple values"});
          }
        } else {
          var selected = this.getValueByServiceType(selectOptions[i], rowDatas[0]);
          if((!dhcp_show && (selectOptions[i] == "dhcp_reply" || selectOptions[i] == "dhcp_request"
            || selectOptions[i] == "dhcp_reply_log_level" || selectOptions[i] == "dhcp_request_log_level")) 
            || (!ethertype_arp_show && selectOptions[i] == "ethertype_arp")) {
            if(selectOptions[i] == "dhcp_reply" ||  selectOptions[i] == "dhcp_request" || selectOptions[i] == "ethertype_arp") {
              selected = 0;
            }            
            c$ui.option({$object: $("#" + selectOptions[i]), list: options, selected: selected, "data-value": true});
            $("#" + selectOptions[i]).changed({"data-value":selected}).attr("disabled", true).css("background-color", "silver");
          } else {
            c$ui.option({$object: $("#" + selectOptions[i]), list: options, selected: selected, "data-value": true});
            $("#" + selectOptions[i]).changed({"data-value":selected});
          }
        }
      }
      
      this.setInputBox(rowDatas, "dhcp_reply_log_interval", dhcp_show);
      this.setInputBox(rowDatas, "dhcp_request_log_interval", dhcp_show);
      this.setCustomInputBox(rowDatas, "ethertype_custom");
    } //end: setPortFilteringData: function(rowDatas){

  , setInputBox: function(rowDatas, filtering_type_str, show){
      var service_type = this.getServiceType(filtering_type_str);
      var filtering_type = this.getFilteringType(filtering_type_str);
      var value = 0;
      var key = this.getKeyOfServiceType(filtering_type_str);
      
      if(key == "log_interval")
        value = 300;
     
      var multiple = this.isMultiple(rowDatas, service_type, filtering_type, key);
      if(multiple){
        if(show) {
          $("#" + filtering_type_str).changed({"data-value":"Multiple values"}).val("Multiple values");
        } else {
          $("#" + filtering_type_str).changed({"data-value":"Multiple values"}).val("Multiple values").attr("disabled", true).css("background-color", "silver");
        }
      }else{
        if(rowDatas[0] != undefined 
            && rowDatas[0].cswitch_port_filtering != undefined
            && rowDatas[0].cswitch_port_filtering.length > 0) {
          var cswitch_port_filtering = rowDatas[0].cswitch_port_filtering.filter(function(filtering) {
            return filtering.service_type == service_type && filtering.filtering_type == filtering_type;
          });
          
          if(cswitch_port_filtering != undefined) { 
              for(var i = 0; i < cswitch_port_filtering.length; i++) {
                value = cswitch_port_filtering[i][key];
              }
          }
        }

        if(show) {
          $("#" + filtering_type_str).changed({"data-value":value}).val(value);
        } else {
          $("#" + filtering_type_str).changed({"data-value":value}).val(value).attr("disabled", true).css("background-color", "silver");
        }
      }
    } //end: setInputBox: function(rowDatas, filtering_type_str){
  
  , setCustomInputBox: function(rowDatas, filtering_type_str) {
      var event_flags = true;
      var service_type = this.getServiceType(filtering_type_str);
      var filtering_type = this.getFilteringType(filtering_type_str);
      var key = this.getKeyOfServiceType(filtering_type_str);
      var $custom_info = '<li class="custom_list">'
        +   '<a></a>'
        +    '<button type="button" class="edit" title="' + jQuery.i18n.prop("common.edit") + '"><span class="icon"></span></button>'
        +    '<button type="button" class="del" title="' + jQuery.i18n.prop("common.delete") + '"><span class="icon"></span></button>'
        +    '<button type="button" class="add" title="' + jQuery.i18n.prop("common.add") + '"><span class="icon"></span></button>'
        +    '<input type="text" class="name" maxlength="6" style="width:145px;"/>'
        +    '<button type="button" class="ok" title="' + jQuery.i18n.prop("common.ok") + '"><span class="icon"></span></button>'
        +    '<button type="button" class="cancel" title="' + jQuery.i18n.prop("common.cancel") + '"><span class="icon"></span></button>'
        + "</li>";
      
      $("#" + filtering_type_str).find("li.custom_list").remove();
      $("#" + filtering_type_str).find("li.add").show();
      
      
      console.log(rowDatas);
      if(rowDatas.length > 1) {
        var cswitch_port_list = rowDatas.filter(function(cswitch_port) {
          return (cswitch_port.cswitch_port_filtering != undefined && cswitch_port.cswitch_port_filtering.length > (filtering_type + 1));
        });
        
        if(cswitch_port_list != undefined && cswitch_port_list.length > 0) {
          if(cswitch_port_list.length > 1) {
            event_flags = this.checkDisplay(cswitch_port_list);
            if(event_flags) {
              var first_data = cswitch_port_list.splice(0, 1);
              var custom_values = [];
              $("#" + filtering_type_str).find("li.add").hide();
              for(var i = 0; i < cswitch_port_list.length; i++) {
                for(var j = (filtering_type + 1); j < first_data[0].cswitch_port_filtering.length; j++) {
                  var tmp_array = [];
                  tmp_array.push(first_data[0].cswitch_port_filtering[j]);
                  tmp_array.push(cswitch_port_list[i].cswitch_port_filtering[j]);
                  var multiple = c$array.isMultiple(tmp_array, key);
                  if(multiple) {
                    custom_values[j - (filtering_type + 1)] = "Multiple values";
                  } else {
                    if(custom_values[j - (filtering_type + 1)] != "Multiple values")
                      custom_values[j - (filtering_type + 1)] = first_data[0].cswitch_port_filtering[j][key];
                  }
                }
              }
              
              console.log("custom_values ", custom_values);
              $.each(custom_values, function(index, custom) {
                $("#" + filtering_type_str).append($custom_info);
                var $custom_li_list = $("#" + filtering_type_str).find("li.custom_list");
                var li_id = $custom_li_list.length - 1;
                $custom_li_list.eq(li_id).find("a").text(custom);
                $custom_li_list.eq(li_id).find("input.name").changed({"data-value":custom}).val(custom);
              });
            }
          } else {
            event_flags = false;
          }
          
          console.log("event_flags " + event_flags);
          if(!event_flags) {
            $("#" + filtering_type_str).find("li.add").hide();
            $("#" + filtering_type_str).append($custom_info);
            var $custom_li_list = $("#" + filtering_type_str).find("li.custom_list");
            var li_id = $custom_li_list.length - 1;
            $custom_li_list.eq(li_id).find("a").text("-");
            $custom_li_list.eq(li_id).find("input.name").changed({"data-value":"-"}).val("-");
            $custom_li_list.eq(li_id).find("button.add").hide();
            $custom_li_list.eq(li_id).find("button.del").hide();
            $custom_li_list.eq(li_id).find("button.edit").hide();
          }
        }
      } else {
        if(rowDatas[0] != undefined 
            && rowDatas[0].cswitch_port_filtering != undefined
            && rowDatas[0].cswitch_port_filtering.length > 0) {
          var cswitch_port_filtering = rowDatas[0].cswitch_port_filtering.filter(function(filtering) {
            return filtering.service_type == service_type && filtering.filtering_type == filtering_type;
          });
          
          if(cswitch_port_filtering != undefined) {
            if(cswitch_port_filtering.length > 0) {
              $("#" + filtering_type_str).find("li.add").hide();
              for(var i = 0; i < cswitch_port_filtering.length; i++) {
                value = cswitch_port_filtering[i][key];
                $("#" + filtering_type_str).append($custom_info);
                var $custom_li_list = $("#" + filtering_type_str).find("li.custom_list");
                var li_id = $custom_li_list.length - 1;
                $custom_li_list.eq(li_id).find("a").text(cswitch_port_filtering[i].custom);
                $custom_li_list.eq(li_id).find("input.name").changed({"data-value":cswitch_port_filtering[i].custom}).val(cswitch_port_filtering[i].custom);
              }
            }
          }
        }
      }
      

      function setPopupHeigth(port_count, li_count) {
        var height;
        if(port_count > 5){
          height = 600 + (5 * 18) + (li_count * 18) + "px";
        }else{
          height = 600 + (port_count * 18) + (li_count * 18) + "px"; 
        }
        console.log("height " + height);
        $(".pop_update_port2").css('height', height);
      }  //end: setPopupHeigth: function(port_count, li_count){
      
      if(event_flags) {
        $("#" + filtering_type_str).off().on("click","button.add",function(e){
            if($("#" + filtering_type_str).find("li.custom_list").length < 5) {
              $("#" + filtering_type_str).find("li.add").hide();
              $("#" + filtering_type_str).append($custom_info);
              var $custom_li_list = $("#" + filtering_type_str).find("li.custom_list");
              setPopupHeigth(rowDatas.length, $custom_li_list.length);
              var li_id = $custom_li_list.length - 1;
              $custom_li_list.eq(li_id).find("input.name").changed({"data-value":""}).val("");
              if(!$custom_li_list.eq(li_id).hasClass("edit_name"))
                $custom_li_list.eq(li_id).addClass("edit_name");
            } else {
              $.alert(jQuery.i18n.prop("ports.msg.filteringCustomMaxCount"));
            }
        }).on("click","button.ok",function(e){
          if($(e.target).closest("li.custom_list").find("input.name").val() != undefined 
              && $(e.target).closest("li.custom_list").find("input.name").val() != "") {
            if($(e.target).closest("li.custom_list").find("input.name").val() != "Multiple values" 
              && !c$PortFiltering.checkHexValue($(e.target).closest("li.custom_list").find("input.name").val())) {
              $.alert(jQuery.i18n.prop("ports.msg.invaildFilteringCustom"));
            } else {
              $(e.target).closest("li.custom_list").find("a").text($(e.target).closest("li.custom_list").find("input.name").val());
              if($(e.target).closest("li.custom_list").hasClass("edit_name"))
                $(e.target).closest("li.custom_list").removeClass("edit_name");
            }
          } else {
            $.alert(jQuery.i18n.prop("ports.msg.emptyFilteringCustom"));
          }
        }).on("click","button.cancel",function(e){
          var old_value = $(e.target).closest("li.custom_list").find("a").text();
          if(old_value != undefined && old_value != "") {
            $(e.target).closest("li.custom_list").find("input.name").val(old_value);
            if($(e.target).closest("li.custom_list").hasClass("edit_name"))
              $(e.target).closest("li.custom_list").removeClass("edit_name");
          } else {
            $(e.target).closest("li.custom_list").remove();
            if($("#" + filtering_type_str).find("li.custom_list").length <= 0)
            $("#" + filtering_type_str).find("li.add").show();
            setPopupHeigth(rowDatas.length, $("#" + filtering_type_str).find("li.custom_list").length);
          }
        }).on("click","button.edit",function(e){
          var old_value = $(e.target).closest("li.custom_list").find("a").text();
          $(e.target).closest("li.custom_list").find("input.name").val(old_value);
          if(!$(e.target).closest("li.custom_list").hasClass("edit_name"))
            $(e.target).closest("li.custom_list").addClass("edit_name");
        }).on("click","button.del",function(e){
          $(e.target).closest("li.custom_list").remove();
          var $custom_li_list = $("#" + filtering_type_str).find("li.custom_list");
          if($custom_li_list.length <= 0)
            $("#" + filtering_type_str).find("li.add").show();
          setPopupHeigth(rowDatas.length, $custom_li_list.length);
        });
      }
    }  //end: setCustomInputBox: function(rowDatas, filtering_type_str){
  , checkDisplay: function(port_list) {
    var result = true;
    var copied = c$array.copy(port_list);
    while(copied.length > 1){
      var src = copied.splice(0, 1);
      for(var i = 0; i < copied.length; i++){
        if(src[0].cswitch_port_filtering.length != copied[i].cswitch_port_filtering.length) {
          return false;
        }
      }
    }
    return result;
  } //end: checkDisplay: function(port_list)
  
  , isMultiple: function(rowDatas, service_type, filtering_type, key) {
      var result = false;
      var copied = c$array.copy(rowDatas);
      while(copied.length > 1){
        var src = copied.splice(0, 1);
        for(var i = 0; i < copied.length; i++){
          for(var j = 0; j < copied[i].cswitch_port_filtering.length; j++){
            if(src[0].cswitch_port_filtering[j] != undefined 
                && copied[i].cswitch_port_filtering[j] != undefined 
                && ($.trim(src[0].cswitch_port_filtering[j]["service_type"]) == service_type
                && $.trim(copied[i].cswitch_port_filtering[j]["service_type"]) == service_type)
                && ($.trim(src[0].cswitch_port_filtering[j]["filtering_type"]) == filtering_type
                    && $.trim(copied[i].cswitch_port_filtering[j]["filtering_type"]) == filtering_type)) {
                if($.trim(src[0].cswitch_port_filtering[j][key]) !== $.trim(copied[i].cswitch_port_filtering[j][key])){
                  result = true;
                  return result;
                }
            }
          }
        }
      } //end: while(copied.length > 1){
      return result;
    } //end: isMultiple: function(rowDatas, service_type, filtering_type, key){
  
  , getOptions: function(select_option_type) {
    var type = select_option_type;
    var result = {"undefined": "-",  "0": "disabled", "1": "enabled"};
    
    switch(type) {
      case "dhcp_reply_log_level":
      case "dhcp_request_log_level":
        result = {"undefined": "-",  "0": 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7};
        break;
      default:
        break;
    }
    return result;
  } // end: getOptions: function(select_option_type) 

  , getServiceType: function(type) {
    var service_type = 0;
    
    switch(type) {
      case "smb":
        service_type = 1;
        break;
      case "dhcp_reply":
      case "dhcp_reply_log_level":
      case "dhcp_reply_log_interval":
      case "dhcp_request":
      case "dhcp_request_log_level":
      case "dhcp_request_log_interval":
        service_type = 2;
        break;
      case "ethertype_arp":
      case "ethertype_ipv4":
      case "ethertype_ipv6":
      case "ethertype_custom":
        service_type = 3;
        break;
      default:
        break;
    }
    
    return service_type;
  } //end: getServiceType: function(type)

  , getFilteringType: function(type) {
    var filtering_type = 0;
    
    switch(type) {
      case "dhcp_reply":
      case "dhcp_reply_log_level":
      case "dhcp_reply_log_interval":
        filtering_type = 1;
        break;
      case "dhcp_request":
      case "dhcp_request_log_level":
      case "dhcp_request_log_interval":
        filtering_type = 2;
        break;
      case "ethertype_arp":
        filtering_type = 3;
        break;
      case "ethertype_ipv4":
        filtering_type = 4;
        break;
      case "ethertype_ipv6":
        filtering_type = 5;
        break;
      case "ethertype_custom":
        filtering_type = 6;
        break;
      default:
        break;
    }
    
    return filtering_type;
  } //end: getFilteringType: function(type)

  , getKeyOfServiceType: function(type) {
    var key = "status";
    
    switch(type) {
      case "dhcp_reply_log_level":
      case "dhcp_request_log_level":
        key = "log_level";
        break;
      case "dhcp_reply_log_interval":
      case "dhcp_request_log_interval":
        key = "log_interval";
        break;
      case "ethertype_custom":
        key = "custom";
        break;
      default:
        break;
    }
    
    return key;
  } //end:getKeyOfServiceType: function(type)

  , getValueByServiceType: function(type, cswitch_port) {
    var value = 0;
    var service_type = this.getServiceType(type);
    var filtering_type = this.getFilteringType(type);
    
    if(cswitch_port != undefined 
        && cswitch_port.cswitch_port_filtering != undefined
        && cswitch_port.cswitch_port_filtering.length > 0) {
      var cswitch_port_filtering = cswitch_port.cswitch_port_filtering.filter(function(filtering) {
        return filtering.service_type == service_type && filtering.filtering_type == filtering_type;
      });
      if(cswitch_port_filtering != undefined) { 
        for(var i = 0; i < cswitch_port_filtering.length; i++) {
          var key = this.getKeyOfServiceType(type);
          value = cswitch_port_filtering[i][key];
        }
      }
    }
    
    //console.log("value " + value);
    return value;
  } // end: getValueByServiceType: function(type, cswitch_port)
  
  , setChangedData: function($object, rowDatas){ 
      if($object.attr("id").indexOf("ethertype_custom") != -1) {
        var $custom_list = $object.find("li.custom_list");
        var changedFlags = false;
        var custom_values = [];
        var custom_port_list = [];
        var filtering_type = this.getFilteringType($object.attr("id"));
        var cswitch_port_list = rowDatas.filter(function(cswitch_port) {
          return (cswitch_port.cswitch_port_filtering != undefined && cswitch_port.cswitch_port_filtering.length > (filtering_type + 1));
        });
        
        /* all delete */
        if($custom_list.length <= 0 && cswitch_port_list != undefined && cswitch_port_list.length > 0) {
          c$PortFiltering.getCustomData(custom_values, rowDatas[0], custom_port_list);
          changedPortFilteringData["custom_port_list"] = custom_port_list;
          return 0;
        }
        
        for(var i = 0; i < $custom_list.length; i++) {
          if($custom_list.eq(i).find("input.name").attr("data-value") === $custom_list.eq(i).find("input.name").val()) {
            $custom_list.eq(i).find("input.name").css("background-color", "white");
          } else {
            $custom_list.eq(i).find("input.name").css("background-color", "skyblue");
            changedFlags = true;
          }
          custom_values.push($custom_list.eq(i).find("input.name").val());
        }
        console.log("changedPortFilteringFlags " + changedFlags, custom_values);
        
        /* first new add */
        if(changedFlags && (cswitch_port_list == undefined || cswitch_port_list.length <= 0)) {
          $.each(rowDatas, function(index, cswitch_port) {
            c$PortFiltering.getCustomData(custom_values, cswitch_port, custom_port_list);
          });
        /* update(new add or delete) */
        } else if(cswitch_port_list != undefined && cswitch_port_list.length > 0) {
          var len = cswitch_port_list[0].cswitch_port_filtering.length - (filtering_type + 1);
          
          /* check delete */
          if(!changedFlags && custom_values.length != len)
            changedFlags = true;
          
          if(changedFlags) {
            $.each(cswitch_port_list, function(index, cswitch_port) {
              var new_custom_values = [];
              var old_custom_values = cswitch_port.cswitch_port_filtering.slice(7);
              console.log("custom_values ", custom_values);
              console.log("old_custom_values ", old_custom_values);
              $.each(custom_values, function(i, custom_value) {
                if(old_custom_values.length >= (i+1) && custom_value == "Multiple values") 
                  new_custom_values[i] = old_custom_values[i].custom;
                else 
                  new_custom_values[i] = custom_value;
              });
              
              console.log("new_custom_values ", new_custom_values);
              c$PortFiltering.getCustomData(custom_values, cswitch_port, custom_port_list);
            });
          }
        }
        
        console.log("custom_port_list ", custom_port_list);
        if(changedFlags)
          changedPortFilteringData["custom_port_list"] = custom_port_list;
        else
          delete changedPortFilteringData["custom_port_list"];
      } else {
        if($object.attr("data-value") === $object.val()){
          $object.css("background-color", "white");
          delete changedPortFilteringData[$object.attr("name")];
        }else{
          $object.css("background-color", "skyblue");
          changedPortFilteringData[$object.attr("name")] = $object.val();
        }
      }
      
      return 0;
    } //end: function setChangedData($object, rowDatas){
  
  , getCustomData: function(custom_values, rowData, custom_port_list) {
    if(typeof(rowData.id) === 'string') {
      var port_ids = rowData.id.split(",");
      var ports = rowData.name.split(",");
      for(var j = 0; j < ports.length; j++) {
        var custom_value = {"cswitch_port_id" : port_ids[j], "name" :  ports[j], "custom_values" : custom_values};
        custom_port_list.push(custom_value);
      }
    } else {
      custom_port_list.push({"cswitch_port_id" : rowData.id, "name" :  rowData.name, "custom_values" : custom_values});
    }
  }
  
  , isCustomDuplicate: function(rowDatas){
      var custom_values = [];
      var result;
      var filtering_type = this.getFilteringType("ethertype_custom");
      var $custom_list = $("#ethertype_custom").find("li.custom_list");
      
      if($custom_list.length <= 0)
        return result;
      
      for(var i = 0; i < $custom_list.length; i++) 
        custom_values.push($custom_list.eq(i).find("input.name").val());
      
      if(rowDatas.length > 0) {
        if(rowDatas.length > 1) {
          var cswitch_port_list = rowDatas.filter(function(cswitch_port) {
            return (cswitch_port.cswitch_port_filtering != undefined && cswitch_port.cswitch_port_filtering.length > (filtering_type + 1));
          });
          
          if(cswitch_port_list.length > 0) {
            $.each(cswitch_port_list, function(index, cswitch_port) {
              var new_custom_values = [];
              var old_custom_values = cswitch_port.cswitch_port_filtering.slice(7);
              for(var i = 0; i < custom_values.length; i++) {
                if(old_custom_values.length >= (i+1) && custom_values[i] == "Multiple values") 
                  new_custom_values[i] = old_custom_values[i].custom;
                else 
                  new_custom_values[i] = custom_values[i];
              }
              var tmp_result = new_custom_values.reduce(function(acc, el, i, arr) {
                if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
              }, []);
              
              if(tmp_result != undefined && tmp_result.length > 0) {
                result = tmp_result;
                return false;
              }
            });
          }
        } else {
          result = custom_values.reduce(function(acc, el, i, arr) {
            if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
          }, []);
        }
      }
      
      return result;
   } //end: function isCustomDuplicate($object){
  
  , getUpdate: function(rowDatas){
      var filterings = ["netbios", "smb", "dhcp_reply", 
        "dhcp_request", "ethertype_arp", "ethertype_ipv4", "ethertype_ipv6"];
      var cswitch_port_filtering = [];
      
      for(var i = 0; i < filterings.length; i++) {
        var service_type = this.getServiceType(filterings[i]);
        var filtering_type = this.getFilteringType(filterings[i]);
        var status = null;
        var log_level = null;
        var log_interval = null;
        
        if($("#"+filterings[i]).val() != "Multiple values")
          status = $("#"+filterings[i]).val()*1;
        
        if(filterings[i] == "dhcp_reply" || filterings[i] == "dhcp_request") {
          if($("#"+filterings[i]+"_log_level").val() != "Multiple values")
            log_level = $("#"+filterings[i]+"_log_level").val()*1;
          if($("#"+filterings[i]+"_log_interval").val() != "Multiple values")
            log_interval = $("#"+filterings[i]+"_log_interval").val()*1;
        }
        
        var filtering = {"service_type": service_type
            , "filtering_type": filtering_type
            , "status": status
            , "log_level": log_level
            , "log_interval": log_interval
            , "custom": ""
            };
        
        cswitch_port_filtering.push(filtering);
      }

      if(changedPortFilteringData.hasOwnProperty("custom_port_list")) {
        var service_type = this.getServiceType("ethertype_custom");
        var filtering_type = this.getFilteringType("ethertype_custom");
        var custom_list = changedPortFilteringData["custom_port_list"];
        
        $.each(custom_list, function(index, custom_data) {
          $.each(custom_data.custom_values, function(index, custom) {
            var filtering = {"service_type": service_type
                , "filtering_type": filtering_type
                , "name" : custom_data.name
                , "status": 1
                , "log_interval": 300
                , "log_level" : 3
                , "custom": custom
                };
            
            cswitch_port_filtering.push(filtering);
          });
        });
      } else {
        var service_type = this.getServiceType("ethertype_custom");
        var filtering_type = this.getFilteringType("ethertype_custom");
        
        var cswitch_port_list = rowDatas.filter(function(cswitch_port) {
          return (cswitch_port.cswitch_port_filtering != undefined && cswitch_port.cswitch_port_filtering.length > (filtering_type + 1));
        });
        
        if(cswitch_port_list.length > 0) {
          $.each(cswitch_port_list, function(index, cswitch_port) {
            var old_custom_values = cswitch_port.cswitch_port_filtering.slice(7);
            for(var i = 0; i < old_custom_values.length; i++) {
              var filtering = {"service_type": service_type
                  , "filtering_type": filtering_type
                  , "name" : cswitch_port.name
                  , "status": 1
                  , "log_interval": 300
                  , "log_level" : 3
                  , "custom": old_custom_values[i].custom
                  };
              cswitch_port_filtering.push(filtering);
            }
          });
        }
      }
      //console.log(cswitch_port_filtering);
      return cswitch_port_filtering;
    }  //end: getUpdate: function ($object){
  
  , checkHexValue: function(value) {  
      var regexr = (/^0{1}[xX]{1}[A-Fa-f0-9]{4}/);
      if(!regexr.test(value))
        return false;
      else
        return true;
    } //end: checkHexValue: function()

}; //end: var c$PortFiltering = {

function checkActiveMultipleValueByStormControl(rowDatas) {
  for(var i = 0; i < rowDatas.length; i++) {
    if(rowDatas[i].name.indexOf(",")  != -1) {
      if(rowDatas[i].storm_control_active_status != undefined 
          && rowDatas[i].storm_control_active_status == 1
          && rowDatas[i].storm_control_port_down != undefined
          && rowDatas[i].storm_control_port_down.length > 0) 
        return 1;
    }
  }
  return 0;
}

function checkActiveByPortScheduel(rowDatas) {
  let schedule_count = 0;
  for(var i = 0; i < rowDatas.length; i++) {
    if(rowDatas[i].active_schedule != undefined 
        && rowDatas[i].active_schedule == 1
        && rowDatas[i].uplink != undefined
            && rowDatas[i].uplink == 0
            && rowDatas[i].ticontroller != undefined
                && rowDatas[i].ticontroller == 0
                && rowDatas[i].downlink != undefined
                    && rowDatas[i].downlink == 0) {
      schedule_count++;
    }
  }
  return schedule_count;
}

function getPoeShowStatus(rowDatas, cswitches) {
  let poe_show_status = true;
  for(let i = 0; i < rowDatas.length; i++) {
    let rowData = rowDatas[i];
    for(let j = 0; j < cswitches.length; j++) {
      let cswitch = cswitches[j];
      if(cswitch.cswitch_id == rowData.cswitch_id
          && cswitch.poe_low_firmware_version == 0) {
        poe_show_status = false;
        return poe_show_status;
      }
    }
  }

  return poe_show_status;
}

function setEditPop(rowDatas, cswitches, one_row_port_data, poe_show_status){
  if(rowDatas.length > 0){
    $("#cswitch_ports").text("");
    
    var texts = ["tags", "cable", "name", "vlan_pvid", "vlan_untagged", "vlan_tagged", "mtu", "storm_control_broadcast_pps", "storm_control_multicast_pps", "storm_control_dlf_pps", "stp_vlans"]; 
    /* chj97 modified 151110 - for issue #30553 */
    var selectOptions = ["rstp", "channel_group_active", "channel_group_type", "channel_group", "channel_group_lb", "poe", "secure", "active", "link", "auto_nego", "speed", "duplex", "flow_control", "jumbo_frame", 
      "self_loop_active", "storm_control_broadcast_action", "storm_control_multicast_action", "stp_portfast"];
    var cswitch_port_keys = c$array.getKeysJsonArray(rowDatas, ["cswitch_id", "id"]);
    var showPoe = true;
    var tmpShowPoe = this.getPoeShowStatus(rowDatas, cswitches);
    
    for(var i = 0; i < rowDatas.length; i++){
      $("#cswitch_ports").append("<div>" + replaceTag(rowDatas[i].cswitch_name) + " / " + rowDatas[i].no + "</div>");
      if(rowDatas[i].poe_supported==0){
        showPoe = false;
      }
    }
    
    if((poe_show_status != undefined && poe_show_status) || !tmpShowPoe)
      showPoe = false;
    
    if(showPoe){
      $("#poe").closest("tr").show();
      $("#poe_supported").text(1);
    }else{
      $("#poe").closest("tr").hide();
      $("#poe_supported").text(0);
    }
    
    $("#secure").closest("tr").show();
    
    console.log(rowDatas);
    
    for(var i = 0; i < texts.length; i++){
      //console.log(texts[i]);
      var multiple = c$array.isMultiple(rowDatas, texts[i]);
      if(texts[i] === "cable"){
        if(multiple){
          $("#" + texts[i]).text("Multiple cable");
        }else{
          $("#" + texts[i]).text(c$replace.cable[rowDatas[0][texts[i]]]);
        }
      }else if(texts[i] === "name"){
        $("#" + texts[i]).text(rowDatas[0][texts[i]]);
      }else if(texts[i] === "tags"){
        var tagMultipleFlag = isMultipleTag(rowDatas, texts[i]);
        if(tagMultipleFlag){
          $("#" + texts[i]).changed({"data-value":"Multiple values"}).val("Multiple values");
        }else{
          var str = "";
          for(var j = 0, tags = rowDatas[0][texts[i]]; j < tags.length; j++){
            str += j === 0 ? tags[j].name : " " + tags[j].name;
          }
          $("#" + texts[i]).changed({"data-value":str}).val(str);
        }
      } else if(texts[i] === "storm_control_broadcast_pps" || texts[i] === "storm_control_multicast_pps" || texts[i] === "storm_control_dlf_pps"){
          if(multiple){
            $("#" + texts[i]).changed({"data-value":"Multiple values"}).val("Multiple values");
          }else{
            if(rowDatas[0][texts[i]] == undefined || rowDatas[0][texts[i]] == disable_storm_control_pps)
              $("#" + texts[i]).changed({"data-value":""}).val("");
            else
              $("#" + texts[i]).changed({"data-value":rowDatas[0][texts[i]]}).val(rowDatas[0][texts[i]]);
          }
      }else if(texts[i] === "stp_vlans"){
          setPathCostOfPortStpVlans(rowDatas);
      }else{
        if(multiple){
          $("#" + texts[i]).changed({"data-value":"Multiple values"}).val("Multiple values");
        }else{
          $("#" + texts[i]).changed({"data-value":rowDatas[0][texts[i]]}).val(rowDatas[0][texts[i]]);
        }
      }
    } //end: for(var i = 0; i < texts.length; i++){
    
    for(var i = 0; i < selectOptions.length; i++){
      var multiple = c$array.isMultiple(rowDatas, selectOptions[i]);
      if(multiple){
        if(selectOptions[i] == "speed"){
          var cswitch = getCswitch(cswitches, rowDatas[0].cswitch_id);
          var cswitch_model = cswitch.model;
          var module_types = [];
          if(cswitch.module_types != undefined && cswitch.module_types.length > 0)
            module_types = cswitch.module_types;
          var speed_range = getOnlyFiberPortSpeedRangeStr(cswitch_model, $("#cable").text(), $("#name").text(), rowDatas[0].no, rowDatas[0].auto_nego, module_types, cswitch.cswitch_port_speed_info);
          console.log("multiple - cswitch_model : " + cswitch_model + " speed_range : " + speed_range);
          c$ui.option({$object: $("#" + selectOptions[i]), list: c$replace[speed_range], "multiple": true, "data-value": true});
          //$("#" + selectOptions[i]).changed({"data-value":rowDatas[0][selectOptions[i]]});
          $("#" + selectOptions[i]).changed({"data-value":"Multiple values"});
        } else if(selectOptions[i] == "active"){
          let schedule_count = checkActiveByPortScheduel(rowDatas);
          if(schedule_count > 0) {
            let schedule  = "";              
            if(schedule_count < rowDatas.length)
              schedule = "schedule(" + schedule_count + "port)";
            else
              schedule = "schedule";              
            $("#" + selectOptions[i]).attr("disabled", true).css("background-color", "silver").html("<option value='-1'>"+schedule+"</option>").val(-1);
          } else {
            c$ui.option({$object: $("#" + selectOptions[i]), list: c$replace[selectOptions[i]], "multiple": true, "data-value": true});
            $("#" + selectOptions[i]).changed({"data-value":"Multiple values"});
          }
        }else{
          c$ui.option({$object: $("#" + selectOptions[i]), list: c$replace[selectOptions[i]], "multiple": true, "data-value": true});
          $("#" + selectOptions[i]).changed({"data-value":"Multiple values"});
        }
      }else{
        if(selectOptions[i] == "speed"){
          var cswitch = getCswitch(cswitches, rowDatas[0].cswitch_id);
          var cswitch_model = cswitch.model;
          var module_types = [];
          if(cswitch.module_types != undefined && cswitch.module_types.length > 0)
            module_types = cswitch.module_types;
          var speed_range = getOnlyFiberPortSpeedRangeStr(cswitch_model, $("#cable").text(), $("#name").text(), rowDatas[0].no, rowDatas[0].auto_nego, module_types, cswitch.cswitch_port_speed_info);
          console.log("one - cswitch_model : " + cswitch_model + " speed_range : " + speed_range);
          c$ui.option({$object: $("#" + selectOptions[i]), list: c$replace[speed_range], selected: rowDatas[0][selectOptions[i]], "data-value": true});
          $("#" + selectOptions[i]).changed({"data-value":rowDatas[0][selectOptions[i]]});
        }else if(selectOptions[i] == "active"){
          let schedule_count = checkActiveByPortScheduel(rowDatas);
          if(schedule_count > 0) {
            let schedule  = "";              
            if(schedule_count < rowDatas.length)
              schedule = "schedule(" + schedule_count + "port)";
            else
              schedule = "schedule";    
            $("#" + selectOptions[i]).attr("disabled", true).css("background-color", "silver").html("<option value='-1'>"+schedule+"</option>").val(-1);
          }else if(checkActiveMultipleValueByStormControl(rowDatas) == 1) {
            c$ui.option({$object: $("#" + selectOptions[i]), list: c$replace[selectOptions[i]], "multiple": true, "data-value": true});
            $("#" + selectOptions[i]).changed({"data-value":"Multiple values"});
          }else{
            c$ui.option({$object: $("#" + selectOptions[i]), list: c$replace[selectOptions[i]], selected: rowDatas[0][selectOptions[i]], "data-value": true});
            $("#" + selectOptions[i]).changed({"data-value":rowDatas[0][selectOptions[i]]});
          }
        }else{
          c$ui.option({$object: $("#" + selectOptions[i]), list: c$replace[selectOptions[i]], selected: rowDatas[0][selectOptions[i]], "data-value": true});
          $("#" + selectOptions[i]).changed({"data-value":rowDatas[0][selectOptions[i]]});
        }
      }
    } //end: for(var i = 0; i < selectOptions.length; i++){
    
    if(isPortFilteringEnabled != undefined && isPortFilteringEnabled)
      c$PortFiltering.setPopupData(rowDatas);
    
    changeAutoNego(true, cswitches, rowDatas);
    changeJumboFrame();
    /* chj97 added 151110 - for issue #30553 */
    changeChannelGroup(true, rowDatas);

    var height;
    if(rowDatas.length > 5){
      $("#cswitch_ports").css("overflow-y", "scroll").height(5 * 18);
      height = 600 + (5 * 18) + "px";
    }else{
      $("#cswitch_ports").height(rowDatas.length * 18);
      height = 600 + (rowDatas.length * 18) + "px"; 
    }

    $("div.pop_update_port2 h4").text(rowDatas.length + jQuery.i18n.prop("ports.word.port")+" "+jQuery.i18n.prop("common.edit"));
    $("#update_btn").text(rowDatas.length + jQuery.i18n.prop("ports.word.port")+" "+jQuery.i18n.prop("common.edit"));
    $("#cswitch_port_keys").val(JSON.stringify(cswitch_port_keys));

    $("#vlan_pvid").closest("tr").hide();
    $("#vlan_untagged").closest("tr").hide();
    $("#vlan_tagged").closest("tr").hide();
    /*controlPanel(rowDatas);*/
    $(".pop_update_port2").css('height', height);
    
    setHideAndShowEditPopItem(0, showPoe);
    
    
    $(".pop_update_port2").bPopup({
      onClose: function() { 
        if(one_row_port_data != undefined && one_row_port_data.length > 0)
          one_row_port_data.splice(0, 1);
        changedData = {};
        changedStpVlanPriority = {};
        changedPortFilteringData = {};
      }
    });
  } //end: if(rowDatas.length > 0){
}

function getStpVlanOptions(port) {
  var options = {};
  var tagged = ti$common.changeVlanStringToArray(port.vlan_tagged);
  var untagged = ti$common.changeVlanStringToArray(port.vlan_untagged);
  var vlans = tagged.concat(untagged);
  vlans = vlans.sort(function(a,b) {return a - b;});
  
  for(var i = 0; i < vlans.length; i++) {
    var property = vlans[i] + "";
    options[property] = (vlans[i] * 1);
  }
  return options;
}

function setPathCostOfPortStpVlans(rowDatas) {
  var $stp_vlans = $("#stp_vlans");
  var $stp_path_cost_trs = $stp_vlans.find("tr").remove();
  var $addTrThInfo = '<tr>'
    +   '<th style="text-align: center;">'
    +     'VLAN'
    +   '</th>'
    +   '<th style="text-align: center;">'
    +     jQuery.i18n.prop("ports.word.stpPathCost")
    +   '</th>'
    +   '<th style="text-align: center;">'
    +     jQuery.i18n.prop("ports.word.stpPriority")
    +   '</th>'
    + '</tr>'
    + '<tr>'
    +   '<td>'
    +     '<select id="stp_vlan" name="stp_vlan" style="width:105px;"></select>'
    +   '</td>'
    + '</tr>';
  
  $stp_vlans.append($addTrThInfo);
  $stp_path_cost_trs = $stp_vlans.find("tr");
  
  if(isStpVlansItemsEnabled(rowDatas)) {
    for(var i = 0; i < rowDatas[0].cswitch_port_stp_vlans.length; i++) {
      var $addTdInfo = '<td>'
      +     '<input type="text" class="input_path_cost" id="input_path_cost_' + rowDatas[0].cswitch_port_stp_vlans[i].vlan + '" style="width:80px;" data-valid-number/>'
      +       '<span class="wrap_help" style="position: absolute;">'
      +         '<span class="help_exp showStpPathCostHelp" id="showStpPathCostHelp" style="display: none; width: 185px; left: -160px; top: 50px; word-break: break-all;"></span>'
      +       '</span>'
      +   '</td>'
      +   '<td>'
      +     '<select class="sel_priority" id="sel_priority_' + rowDatas[0].cswitch_port_stp_vlans[i].vlan + '" style="width:110px;"></select>'
      +       '<span class="wrap_help" style="position: absolute;">'
      +       '<span class="help_exp showStpPriorityHelp" id="showStpPriorityHelp" style="display: none; width: 185px; left: -210px; top: 50px; word-break: break-all;"></span>'
      +       '</span>'
      +   '</td>';
      
      $stp_path_cost_trs.eq(1).append($addTdInfo);
      if(i == 0) {
        c$ui.option({$object: $("#stp_vlan"), list: getStpVlanOptions(rowDatas[0]), selected: rowDatas[0].cswitch_port_stp_vlans[i].vlan, "data-value": true});
        $("#stp_vlan").changed({"data-value":rowDatas[0].cswitch_port_stp_vlans[i].vlan});
        $("#stp_vlan").off().on("change",function(evt, params){
          var select_vid = $(evt.target).val();
          $("#stp_vlans").find("td").hide();
          $("#stp_vlan").closest("td").show();
          $("#input_path_cost_" + select_vid).closest("td").show();
          $("#sel_priority_" + select_vid).closest("td").show();
        });
      }
      var multiple = isMultipleStpVlans(rowDatas, rowDatas[0].cswitch_port_stp_vlans[i].vlan, "stp_path_cost");
      if(multiple) {
        $("#input_path_cost_"+rowDatas[0].cswitch_port_stp_vlans[i].vlan).changed({"data-value":"Multiple values"}).val("Multiple values");
      } else {
        if(rowDatas[0].cswitch_port_stp_vlans[i].stp_path_cost == undefined || rowDatas[0].cswitch_port_stp_vlans[i].stp_path_cost == 0) {
          $("#input_path_cost_"+rowDatas[0].cswitch_port_stp_vlans[i].vlan).changed({"data-value":""})
            .val("")
            .mouseover(function(evt, params){
              var msg = jQuery.i18n.prop("ports.word.stpPathCost") + jQuery.i18n.prop("common.word.range")
              + " : 1-200000000, " + jQuery.i18n.prop("ports.msg.stpPathCostHelp");
               $(evt.target).closest("td").find("span").eq(1).text(msg).show();
            })
            .mouseleave(function(evt, params){
              $(evt.target).closest("td").find("span").eq(1).hide();
            });
        }else {
          $("#input_path_cost_"+rowDatas[0].cswitch_port_stp_vlans[i].vlan).changed({"data-value":rowDatas[0].cswitch_port_stp_vlans[i].stp_path_cost})
            .val(rowDatas[0].cswitch_port_stp_vlans[i].stp_path_cost)
            .mouseover(function(evt, params){
              var msg = jQuery.i18n.prop("ports.word.stpPathCost") + jQuery.i18n.prop("common.word.range")
              + " : 1-200000000, " + jQuery.i18n.prop("ports.msg.stpPathCostHelp");
               $(evt.target).closest("td").find("span").eq(1).text(msg).show();
            })
            .mouseleave(function(evt, params){
              $(evt.target).closest("td").find("span").eq(1).hide();
            });
        }
      }
      
      multiple = isMultipleStpVlans(rowDatas, rowDatas[0].cswitch_port_stp_vlans[i].vlan, "stp_priority");
      if(multiple) {
        c$ui.option({$object: $("#sel_priority_" + rowDatas[0].cswitch_port_stp_vlans[i].vlan), list: getStpPriorityOptions(), "multiple": true, "data-value": true});
        $("#sel_priority_" + rowDatas[0].cswitch_port_stp_vlans[i].vlan).changed({"data-value":"Multiple values"});
      } else {
        c$ui.option({$object: $("#sel_priority_" + rowDatas[0].cswitch_port_stp_vlans[i].vlan), list: getStpPriorityOptions(), selected: rowDatas[0].cswitch_port_stp_vlans[i].stp_priority, "data-value": true});
        $("#sel_priority_" + rowDatas[0].cswitch_port_stp_vlans[i].vlan).changed({"data-value":rowDatas[0].cswitch_port_stp_vlans[i].stp_priority});
      }
      
      $("select.sel_priority").off().on("change",function(evt, params){
        setChangedData($(this));
      }).on("mouseover",function(evt, params){
        var msg = jQuery.i18n.prop("ports.word.stpPriority") + jQuery.i18n.prop("common.word.range")
        + " : 0-240(default:128), " + jQuery.i18n.prop("ports.msg.stpPriorityHelp");
       $(evt.target).closest("td").find("span").eq(1).text(msg).show();
      }).on("mouseleave",function(evt, params){
        $(evt.target).closest("td").find("span").eq(1).hide();
      });
      
      if(i != 0) {
        $("#input_path_cost_" + rowDatas[0].cswitch_port_stp_vlans[i].vlan).closest("td").hide();
        $("#sel_priority_" + rowDatas[0].cswitch_port_stp_vlans[i].vlan).closest("td").hide();
      }
    }
  } else {
    var $addTdInfo = '<td>'
      +     '<input type="text" id="input_path_cost_0" style="width:80px;" data-valid-number/>'
      +   '</td>'
      +   '<td>'
      +     '<select id="sel_priority_0" style="width:110px;"/>'
      +   '</td>'

    $stp_path_cost_trs.eq(1).append($addTdInfo);
    c$ui.option({$object: $("#stp_vlan"), list: getStpVlanOptions(rowDatas[0]), "multiple": true, "data-value": true});
    $("#stp_vlan").attr("disabled", true).css("background-color", "silver");
    $("#input_path_cost_0").changed({"data-value":""}).val("").attr("disabled", true).css("background-color", "silver");
    $("#sel_priority_0").attr("disabled", true).css("background-color", "silver").html("<option value='-1'>-</option>").val(-1);
  }
}

function setHideAndShowEditPopItem(tab_num, show_poe) {
  $(".pop_update_port2 .con .tabs ul li").removeClass("selected").eq(tab_num).addClass("selected");
  $(".pop_update_port2.con .wrap_list").css("display", "none").eq(tab_num).css("display", "block");
  if(!isPortFilteringEnabled) {
    $("#port_filtering_tab").remove();
    $(".pop_update_port2 .con .tabs ul").find("li").eq(0).css("width", "33%");
    $(".pop_update_port2 .con .tabs ul").find("li").eq(1).css("width", "33%");
    $(".pop_update_port2 .con .tabs ul").find("li").eq(2).css("width", "34%");
    $(".pop_update_port2 .con .tabs ul li").find("span.wrap_help").eq(0).css("left", "295px");
    $(".pop_update_port2 .con .tabs ul li").find("span.wrap_help").eq(1).css("left", "420px");
    $(".pop_update_port2 .con .tabs ul li").find("span.help_exp").eq(1).css("left", "-195px");
  }
  
  if(tab_num == 1) {
    $("#tags").closest("tr").hide();
    $("#channel_group_type").closest("tr").hide();
    $("#secure").closest("tr").hide();
    $("#auto_nego").closest("tr").hide();
    $("#speed").closest("tr").hide();
    $("#duplex").closest("tr").hide();
    $("#flow_control").closest("tr").hide();
    $("#jumbo_frame").closest("tr").hide();
    $("#self_loop_active").closest("tr").hide();
    $("#active").closest("tr").hide();
    $("#poe").closest("tr").hide();
    
    $("#rstp").closest("tr").hide();
    $("#stp_vlans").closest("tr").hide();
    $("#stp_priority_list").closest("tr").hide();
    $("#stp_portfast").closest("tr").hide();
    
    $("#netbios").closest("tr").hide();
    $("#smb").closest("tr").hide();
    $("#smb").closest("tr").hide();
    $("#dhcp_reply").closest("tr").hide();
    $("#ethertype_arp").closest("tr").hide();
    
    $("#storm_control_broadcast_pps").closest("tr").show();
    $("#storm_control_multicast_pps").closest("tr").show();
    $("#storm_control_dlf_pps").closest("tr").show();
    
    
  } else if(tab_num == 2) {
    $("#tags").closest("tr").hide();
    $("#rstp").closest("tr").hide();
    $("#channel_group_type").closest("tr").hide();
    $("#secure").closest("tr").hide();
    $("#auto_nego").closest("tr").hide();
    $("#speed").closest("tr").hide();
    $("#duplex").closest("tr").hide();
    $("#flow_control").closest("tr").hide();
    $("#jumbo_frame").closest("tr").hide();
    $("#self_loop_active").closest("tr").hide();
    $("#active").closest("tr").hide();
    $("#poe").closest("tr").hide();
    
    $("#storm_control_broadcast_pps").closest("tr").hide();
    $("#storm_control_multicast_pps").closest("tr").hide();
    $("#storm_control_dlf_pps").closest("tr").hide();
    
    $("#netbios").closest("tr").hide();
    $("#smb").closest("tr").hide();
    $("#smb").closest("tr").hide();
    $("#dhcp_reply").closest("tr").hide();
    $("#ethertype_arp").closest("tr").hide();
    
    $("#rstp").closest("tr").show();
    $("#stp_vlans").closest("tr").show();
    $("#stp_priority_list").closest("tr").show();
    $("#stp_portfast").closest("tr").show();
  } else if(tab_num == 3) {
      $("#tags").closest("tr").hide();
      $("#channel_group_type").closest("tr").hide();
      $("#secure").closest("tr").hide();
      $("#auto_nego").closest("tr").hide();
      $("#speed").closest("tr").hide();
      $("#duplex").closest("tr").hide();
      $("#flow_control").closest("tr").hide();
      $("#jumbo_frame").closest("tr").hide();
      $("#self_loop_active").closest("tr").hide();
      $("#active").closest("tr").hide();
      $("#poe").closest("tr").hide();
      
      $("#rstp").closest("tr").hide();
      $("#stp_vlans").closest("tr").hide();
      $("#stp_priority_list").closest("tr").hide();
      $("#stp_portfast").closest("tr").hide();
      
      $("#storm_control_broadcast_pps").closest("tr").hide();
      $("#storm_control_multicast_pps").closest("tr").hide();
      $("#storm_control_dlf_pps").closest("tr").hide();

      if(isPortFilteringEnabled != undefined && isPortFilteringEnabled) {
        $("#netbios").closest("tr").show();
        $("#smb").closest("tr").show();
        $("#smb").closest("tr").show();
        $("#dhcp_reply").closest("tr").show();
        if(isOtUniqueEnable != undefined && isOtUniqueEnable)
          $("#ethertype_arp").closest("tr").show();
      }
  } else {
    $("#storm_control_broadcast_pps").closest("tr").hide();
    $("#storm_control_multicast_pps").closest("tr").hide();
    $("#storm_control_dlf_pps").closest("tr").hide();
    
    $("#rstp").closest("tr").hide();
    $("#stp_vlans").closest("tr").hide();
    $("#stp_priority_list").closest("tr").hide();
    $("#stp_portfast").closest("tr").hide();
    
    $("#netbios").closest("tr").hide();
    $("#smb").closest("tr").hide();
    $("#smb").closest("tr").hide();
    $("#dhcp_reply").closest("tr").hide();
    $("#ethertype_arp").closest("tr").hide();
    
    $("#tags").closest("tr").show();
    $("#channel_group_type").closest("tr").show();
    $("#secure").closest("tr").show();
    $("#auto_nego").closest("tr").show();
    $("#speed").closest("tr").show();
    $("#duplex").closest("tr").show();
    $("#flow_control").closest("tr").show();
    $("#jumbo_frame").closest("tr").show();
    $("#self_loop_active").closest("tr").show();
    $("#active").closest("tr").show();
    if(show_poe)
      $("#poe").closest("tr").show();
  }
}

function setVlanNPortPop(rowDatas, $sce){
	  if(rowDatas.length > 0){
	    $("#cswitch_ports").text("");
	    $("#port_name").text("");
	    
	    var texts = ["vlan_pvid", "vlan_untagged", "vlan_tagged"];
	    var cswitch_port_keys = c$array.getKeysJsonArray(rowDatas, ["cswitch_id", "id"]);
	    
	    $("#cswitch_ports").closest("table.view tbody tr").eq(0).find("th").text(jQuery.i18n.prop("ports.word.switch"));
	    $("#cswitch_ports").append("<div>" + replaceTag(rowDatas[0].cswitch_name) + "</div>");
	    
	    $("#name").append("<div id='port_name'></div>");
	    for(var i = 0; i < rowDatas.length; i++){
	      $("#port_name").append("<div>" + rowDatas[i].name + "</div>");
	    }
	    
	    $("#pop_update_port_tabs").hide();
	    $("#poe").closest("tr").hide();
	    $("#secure").closest("tr").hide();
	    $("#cable").closest("tr").hide();
	    $("#tags").closest("tr").hide();
	    $("#rstp").closest("select").hide();
	    $("#rstp").closest("tr").hide();
	    $("#channel_group_type").closest("select").hide();
	    $("#channel_group_type").closest("tr").hide();
	    $("#speed_row").closest("tr").hide();
	    $("#duplex_row").closest("tr").hide();
	    $("#flow_control").closest("tr").hide();
	    $("#jumbo_frame").closest("tr").hide();
	    $("#active").closest("tr").hide();
	    $("#auto_nego").closest("tr").hide();
	    $("#self_loop_active").closest("tr").hide();
	    $("#stp_vlans").closest("tr").hide();
	    $("#stp_portfast").closest("tr").hide();
	    $("#storm_control_broadcast_pps").closest("tr").hide();
	    $("#storm_control_multicast_pps").closest("tr").hide();
	    $("#storm_control_dlf_pps").closest("tr").hide();
	    $("#netbios").closest("tr").hide();
	    $("#smb").closest("tr").hide();
	    $("#smb").closest("tr").hide();
	    $("#dhcp_reply").closest("tr").hide();
	    $("#ethertype_arp").closest("tr").hide();
	    
	    for(var i = 0; i < texts.length; i++){
	      var multiple = c$array.isMultiple(rowDatas, texts[i]);
	      if(texts[i] === "cable"){
	        if(multiple){
	          $("#" + texts[i]).text("Multiple cable");
	        }else{
	          $("#" + texts[i]).text(c$replace.cable[rowDatas[0][texts[i]]]);
	        }
	      }else if(texts[i] === "name"){
	        $("#" + texts[i]).text(rowDatas[0][texts[i]]);
	      }else{
	        if(multiple){
	          $("#" + texts[i]).changed({"data-value":"Multiple values"}).val("Multiple values");
	        }else{
	          $("#" + texts[i]).changed({"data-value":rowDatas[0][texts[i]]}).val(rowDatas[0][texts[i]]);
	        }
	      }
	    } //end: for(var i = 0; i < texts.length; i++){
	    
	    var height;
	    
	    if(rowDatas.length > 5){
	      $("#port_name").css("overflow-y", "scroll").height(5 * 18);
	      height = 250 + (5 * 18) + "px";
	    }else{
	      $("#port_name").css("overflow-y", "visible").height(rowDatas.length * 18);
	      height = 250 + (rowDatas.length * 18) + "px";
	    }
	   
	    $("div.pop_update_port2 h4").text(rowDatas.length + jQuery.i18n.prop("ports.word.port")+" "+jQuery.i18n.prop("common.edit"));
	    $("#update_btn").text(rowDatas.length + jQuery.i18n.prop("ports.word.port")+" "+jQuery.i18n.prop("common.edit"));
	    $("#cswitch_port_keys").val(JSON.stringify(cswitch_port_keys));

	    controlPanel(rowDatas);
	    
	    $(".pop_update_port2").css('min-height', '250px').css('height', height);
	    
	    $(".pop_update_port2").bPopup();
	  } //end: if(rowDatas.length > 0){
}

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function getPoeStartTimeOption()
{
  var timeOption = {"undefined": "-" , "0" : "00:00", "1" : "01:00", "2" : "02:00"
                    , "3" : "03:00", "4" : "04:00", "5" : "05:00", "6" : "06:00"
                    , "7" : "07:00", "8" : "08:00", "9" : "09:00", "10" : "10:00"
                    , "11" : "11:00", "12" : "12:00", "13" : "13:00", "14" : "14:00"
                    , "15" : "15:00", "16" : "16:00", "17" : "17:00", "18" : "18:00"
                    , "19" : "19:00", "20" : "20:00", "21" : "21:00", "22" : "22:00"
                    , "23" : "23:00"
  };
  return timeOption;
}

function getPoeEndTimeOption()
{
  var timeOption = {"undefined": "-" , "0" : "00:00", "1" : "00:30", "2" : "01:00"
                    , "3" : "01:30", "4" : "02:00", "5" : "02:30", "6" : "03:00"
                    , "7" : "03:30", "8" : "04:00", "9" : "04:30", "10" : "05:00"
                    , "11" : "05:30", "12" : "06:00", "13" : "06:30", "14" : "07:00"
                    , "15" : "07:30", "16" : "08:00", "17" : "08:30", "18" : "09:00"
                    , "19" : "09:30", "20" : "10:00", "21" : "10:30", "22" : "11:00"
                    , "23" : "11:30", "24" : "12:00", "25" : "12:30", "26" : "13:00"
                    , "27" : "13:30", "28" : "14:00", "29" : "14:30", "30" : "15:00"
                    , "31" : "15:30", "32" : "16:00", "33" : "16:30", "34" : "17:00"
                    , "35" : "17:30", "36" : "18:00", "37" : "18:30", "38" : "19:00"
                    , "39" : "19:30", "40" : "20:00", "41" : "20:30", "42" : "21:00"
                    , "43" : "21:30", "44" : "22:00", "45" : "22:30", "46" : "23:00"
                    , "47" : "23:30"
  };
  return timeOption;
}

function getKeyPoeTimeOptions(timeOption, value)
{
  for(key in timeOption)
  {
    if(timeOption[key] == value)
      return key;
  }
  
  return 0;
}

function getValueByKeyOfPoeTimeOptions(timeOption, key)
{
  if(timeOption[key] != undefined)
    return timeOption[key];
  
  return "00:00";
}

function setPoePortEditPop(rowDatas, cswitches){
  if(rowDatas.length > 0){
    $("#cswitch_poe_ports").text("");
    
    let texts = ["port_cable", "port_name", "power_threshold_user"];
    let selectOptions = ["poe_active", "auto_power_up", "four_pair", "port_priority", "power_mode", "power_threshold", "timer", "start_time", "end_time", "detection_type"];
    let cswitch_port_keys = c$array.getKeysJsonArray(rowDatas, ["cswitch_id", "cswitch_port_id"]);
    let show_poe = true;
    let show_detection_type = true;
    let popup_height = 490;
    for(let i = 0; i < rowDatas.length; i++){
      $("#cswitch_poe_ports").append("<div>" + replaceTag(rowDatas[i].cswitch_name) + " / " + rowDatas[i].no + "</div>");
      if(rowDatas[i].poe_supported == 0){
        show_poe = false;
      }
      if(rowDatas[i].detected_type_supported == 0) {
        show_detection_type = false;
      }
    }
    
    if(show_poe){
      $("#poe_active").closest("tr").show();
    }else{
      $("#poe_active").closest("tr").hide();
    }
    
    if(show_detection_type) {
      $("#detection_type_dt").show();
      $("#detection_type_dd").show();
    } else {
      $("#detection_type_dt").hide();
      $("#detection_type_dd").hide();
    }
    
    for(var i = 0; i < texts.length; i++){
      var multiple = c$array.isMultiple(rowDatas, texts[i]);
      if(texts[i] === "port_cable"){
        if(multiple){
          $("#" + texts[i]).text("Multiple cable");
        }else{
          $("#" + texts[i]).text(c$replace.cable[rowDatas[0]["cable"]]);
        }
      }else if(texts[i] === "port_name"){
        $("#" + texts[i]).text(rowDatas[0][texts[i]]);
      }else if(texts[i] == "power_threshold_user"){
        if(multiple) {
          $("#" + texts[i]).changed({"data-value":"Multiple values"}).val("Multiple values");
        } else {
          if(rowDatas[0][texts[i]] == undefined)
            $("#" + texts[i]).changed({"data-value":"-"}).val("-");
          else
            $("#" + texts[i]).changed({"data-value":rowDatas[0][texts[i]]}).val(rowDatas[0][texts[i]]);
        }
      }else{
        if(multiple){
          $("#" + texts[i]).changed({"data-value":"Multiple values"}).val("Multiple values");
        }else{
          $("#" + texts[i]).changed({"data-value":rowDatas[0][texts[i]]}).val(rowDatas[0][texts[i]]);
        }
      }
    } //end: for(var i = 0; i < texts.length; i++){
   
    for(var i = 0; i < selectOptions.length; i++){
      var multiple = c$array.isMultiple(rowDatas, selectOptions[i]);
      //console.log(selectOptions[i] + " " + multiple);
      var options = {};
      var selected_value = 0;
      if(selectOptions[i] == "start_time")
      {
        options = getPoeStartTimeOption();
        selected_value = getKeyPoeTimeOptions(options, rowDatas[0][selectOptions[i]]);
      }
      else if(selectOptions[i] == "end_time")
      {
        options = getPoeEndTimeOption();
        selected_value = getKeyPoeTimeOptions(options, rowDatas[0][selectOptions[i]]);
      }
      else if(selectOptions[i] == "poe_active")
      {
        options = c$replace["active"];
        selected_value = rowDatas[0]["poe"];
        multiple = c$array.isMultiple(rowDatas, "poe");
      }
      else
      {
        options = c$replace[selectOptions[i]];
        selected_value = rowDatas[0][selectOptions[i]];
      }
      /*console.log(options);
      console.log(selected_value);*/
      if(multiple){
        c$ui.option({$object: $("#" + selectOptions[i]), list: options, "multiple": true, "data-value": true});
        if(selectOptions[i] == "detection_type" && !show_detection_type) {
          $("#" + selectOptions[i]).changed({"data-value":"Multiple values"}).attr("disabled", true).css("background-color", "silver");
        } else {
          $("#" + selectOptions[i]).changed({"data-value":"Multiple values"});
        }
      }else{
        c$ui.option({$object: $("#" + selectOptions[i]), list: options, selected: selected_value, "data-value": true});
        if(selectOptions[i] == "detection_type" && !show_detection_type) {
          $("#" + selectOptions[i]).changed({"data-value":selected_value}).attr("disabled", true).css("background-color", "silver");
        } else {
          $("#" + selectOptions[i]).changed({"data-value":selected_value});
        }
      }
    } //end: for(var i = 0; i < selectOptions.length; i++){
    
    changePoePowerThreshold(rowDatas);
    changePoeFourPair(rowDatas);
    changePoeTimer(rowDatas);
    changePoeAutoPower(rowDatas);

    //console.log("popup_height " + popup_height)
    /* Changed for timer deactivation(320 -> 280, 220 -> 180) - Changed for timer activation(280 -> 320, 180 -> 220) */
    var height;
    var watt_top_value = 320 + (rowDatas.length * 20) + "px";
    var four_pair_top_value = 220 + (rowDatas.length * 20) + "px";
    
    if(rowDatas.length > 5){
      $("#cswitch_poe_ports").css("overflow-y", "scroll").height(5 * 18);
      height = popup_height + (5 * 18) + "px";
      four_pair_top_value = 220 + (5 * 20) + "px";
      watt_top_value = 320 + (5 * 20) + "px";
    }else{
      $("#cswitch_poe_ports").height(rowDatas.length * 18);
      height = popup_height + (rowDatas.length * 18) + "px";
    }
    
    /* Added for timer deactivation - Deletion required for timer activation */
    $("div.pop_update_poe_port").css('min-height', "490px");

    $("#showPoeFourPair").css('top', four_pair_top_value);
    $("#showPoeUserThresholdWatts").css('top', watt_top_value);

    $("div.pop_update_poe_port h4").text(rowDatas.length + jQuery.i18n.prop("ports.word.port")+" "+jQuery.i18n.prop("common.edit"));
    $("#poe_update_btn").text(rowDatas.length + jQuery.i18n.prop("ports.word.port")+" "+jQuery.i18n.prop("common.edit"));
    $("#cswitch_poe_port_keys").val(JSON.stringify(cswitch_port_keys));
    /*controlPanel(rowDatas);*/
    $(".pop_update_poe_port").css('height', height);
    
    $(".pop_update_poe_port").bPopup();
  } //end: if(rowDatas.length > 0){
}

function setChangedData($object){ 
      var $form = $object.closest("form");
     /* console.log($object.attr("id"));
      console.log($object.attr("data-value") + ", " + $object.val() + " = " + ($object.attr("data-value") === $object.val()));*/
      if($object.attr("data-value") === $object.val()){
        $object.css("background-color", "white");
        if($form.attr("id") === "cswitch_ip_form"){
          delete changedData.cswitch_ip[$object.attr("name")];
        }else{
          if($object.attr("id").indexOf("sel_priority_") != -1) {
            var tmp_arr = $object.attr("id").split("sel_priority_");
            var vid = tmp_arr[1] * 1;
            delete changedStpVlanPriority[vid];
          } else if($object.attr("name") === "auto_nego"){
            delete changedData[$object.attr("name")];
            delete changedData["speed"]
            delete changedData["duplex"]
            delete changedData["enabled"]
            delete changedData["rpvstp"]
          } else {
            delete changedData[$object.attr("name")];
          }
        }
      }else{
        $object.css("background-color", "skyblue");
        
          if($object.attr("id") === "tags"){
            var values = $object.val().split(" ");
            var _tags = [];
            var total_length = 0;
            for(var i = 0; i < values.length; i++){
              if((values[i].length > 64) || (values[i] < 0))
                return 1;
              total_length += values[i].length;
              if(total_length > 255 || total_length < 0)
                return 2;
              var json = {"id": "", "name": values[i]};
              _tags.push(json);
            }
            
            changedData[$object.attr("name")] = _tags;
          }else if($object.attr("id") === "auto_nego"){
            changedData["auto_nego"] = $object.val();
            changedData["speed"] = $("#speed").val();
            changedData["duplex"] = $("#duplex").val();
            changedData["enabled"] = $("#enabled").val();
            changedData["rpvstp"] = $("#rpvstp").val();
          }else if($object.attr("id") === "start_time"){
            changedData[$object.attr("name")] = getValueByKeyOfPoeTimeOptions(getPoeStartTimeOption(), $object.val());
          }else if($object.attr("id") === "end_time"){
            changedData[$object.attr("name")] = getValueByKeyOfPoeTimeOptions(getPoeEndTimeOption(), $object.val());
          }else if($object.attr("id") === "poe_active"){
            changedData["poe"] = $object.val();
          }else if($object.attr("id") == "storm_control_broadcast_pps") {
            if($object.val().length <= 0)
              changedData["storm_control_broadcast_pps"] = disable_storm_control_pps;
            else
              changedData["storm_control_broadcast_pps"] = $object.val();
          }else if($object.attr("id") == "storm_control_multicast_pps") {
            if($object.val().length <= 0)
              changedData["storm_control_multicast_pps"] = disable_storm_control_pps;
            else
              changedData["storm_control_multicast_pps"] = $object.val();
          }else if($object.attr("id") == "storm_control_dlf_pps") {
            if($object.val().length <= 0)
              changedData["storm_control_dlf_pps"] = disable_storm_control_pps;
            else
              changedData["storm_control_dlf_pps"] = $object.val();
          }else if($object.attr("id").indexOf("sel_priority_") != -1) {
            var tmp_arr = $object.attr("id").split("sel_priority_");
            var vid = tmp_arr[1] * 1;
            changedStpVlanPriority[vid] = $object.val();
          }else if($object.attr("id") == "stp_vlans") {
            $object.css("background-color", "white");
            var $trs = $object.find("tr");
            if($trs.length > 1) {
              $tds = $trs.eq(1).find("td");
              var cswitch_port_stp_vlans = [];
              for(var i = 1; i < $tds.length; (i+=2)) {
                if($tds.eq(i).find("input").attr("data-changed")== "false")
                  continue;
                var tmp_arr = $tds.eq(i).find("input").attr("id").split("input_path_cost_");
                var vid = tmp_arr[1];
                var path_cost = $tds.eq(i).find("input").val() * 1;
                var json = {"id":"", "vlan": (vid * 1), "stp_path_cost": path_cost};
                if(!($tds.eq(i+1).find("select").attr("data-value") == "Multiple values" && $tds.eq(i+1).find("select").val() == "Multiple values")) 
                  json.stp_priority = $tds.eq(i+1).find("select").val() * 1;
                cswitch_port_stp_vlans.push(json);
                if(changedStpVlanPriority[vid] != undefined)
                  delete changedStpVlanPriority[vid];
              }
              
              if(Object.keys(changedStpVlanPriority).length > 0) {
                for(key in changedStpVlanPriority) {
                  var json = {"id":"", "vlan": (key * 1), "stp_priority": (changedStpVlanPriority[key] * 1)};
                  if(!($("#input_path_cost_"+key).attr("data-value") == "Multiple values" && $("#input_path_cost_"+key).val() == "Multiple values")) {
                    if($("#input_path_cost_"+key).val() != "")
                      json.stp_path_cost = $("#input_path_cost_"+key).val() * 1;
                    else
                      json.stp_path_cost = 0;
                  }
                  cswitch_port_stp_vlans.push(json);
                }
                changedStpVlanPriority = {};
              }
              if(cswitch_port_stp_vlans.length > 0)
                changedData["cswitch_port_stp_vlans"] = cswitch_port_stp_vlans;
            }
          }else{
            changedData[$object.attr("name")] = $object.val();
          }
      }
      
      return 0;
    } //end: function setChangedData($object){

function checkInvailedPoePowerThresholdUser()
{
  var power_threshold = c$replace["power_threshold"][$("#power_threshold").val()];
  if(power_threshold != "user_threshold")
    return true;
  console.log("checkInvailedPoePowerThresholdUser watt " + $("#power_threshold_user").val());
  var threshold_user = $("#power_threshold_user").val();
  if(threshold_user == "")
    return false;
  
  if(threshold_user == "Multiple values")
    return true;
  
  console.log(threshold_user.length);
  if(threshold_user.length >= 1 && threshold_user.length <= 4)
  {
    var pattern_watt = /^(\d{1,2}([.]\d{0,1})?)?$/;
    if(pattern_watt.test(threshold_user) == true)
    {
      if(threshold_user >= 0 && threshold_user <= 15.4)
      {
        if(threshold_user.indexOf('.') != -1)
        {
          var threshold_user_array = threshold_user.split('.');
          var lsb_value = threshold_user_array[1];
          if((lsb_value > 10) || (lsb_value % 2 != 0))
            return false;
        }
        return true;
      }
    }
  }
  return false;
}

function updatePort(changedDataLength, changedPortFilteringDataLength, rowDatas, one_row_port_data){
  /* chj97 added 151214 - for issue #30553 */     
  var tmp = JSON.parse($("#cswitch_port_keys").val());
  var cswitch_port_keys = []; 
  var json = { };     
  var ret = 0;
  for(var i = 0; i < tmp.length; i++)
  {     
    if(typeof(tmp[i].id) === 'string')
    {
      var ports = tmp[i].id.split(",");     
      for(var j = 0; j < ports.length; j++)
      {           
        var value = {"cswitch_id" : 0, "id": 0};
        value.cswitch_id = tmp[i].cswitch_id;
        value.id = ports[j];          
        cswitch_port_keys.push(value);
      } 
    }
    else
    {
      var value = {"cswitch_id" : 0, "id": 0};
      value.cswitch_id = tmp[i].cswitch_id;
      value.id = tmp[i].id;           
      cswitch_port_keys.push(value);
    }
  }
  
  if(cswitch_port_keys.length > 0)
    json = {"cswitch_port_keys": JSON.stringify(cswitch_port_keys)};
  else
    json = {"cswitch_port_keys": $("#cswitch_port_keys").val()};
  
  if(changedDataLength != 0)
    json.cswitch_port_data = JSON.stringify(changedData);
  
  if(changedPortFilteringDataLength != 0 )
    json.cswitch_port_filtering = JSON.stringify(c$PortFiltering.getUpdate(rowDatas));
  
  console.log("----------+==========");
  console.log(json);
  if(changedDataKeys != undefined)
    changedDataKeys = cswitch_port_keys;
  c$http.delegate({"success": success, "fail": fail, "url": "/configure/cswitch_port_update.json?network_id=" + watch_object.net_id, "params": json, "block": true});
  function success(data){
    //getLogList(getSearchObject(false), termType, true);
    $(".pop_update_port2").bPopup().close();
    if(one_row_port_data != undefined && one_row_port_data.length > 0)
      one_row_port_data.splice(0, 1);
    changedData = {};
    changedStpVlanPriority = {};
    changedPortFilteringData = {};
  }
  function fail(jqXHR, textStatus, errorThrown){
    var err = textStatus + ", " + errorThrown;
    console.log("Request Failed: " + err);
    ret = 1;
  }
  
  return ret;
}


function updatePoePort(){
  var tmp = JSON.parse($("#cswitch_poe_port_keys").val());
  var cswitch_poe_port_keys = []; 
  var json = { };
  var ret = 0;
  for(var i = 0; i < tmp.length; i++)
  {     
    if(typeof(tmp[i].id) === 'string')
    {
      var ports = tmp[i].id.split(",");
      for(var j = 0; j < ports.length; j++)
      {           
        var value = {"cswitch_id" : 0, "cswitch_port_id": 0};
        value.cswitch_id = tmp[i].cswitch_id;
        value.cswitch_port_id = ports[j];
        cswitch_poe_port_keys.push(value);
      } 
    }
    else
    {
      var value = {"cswitch_id" : 0, "cswitch_port_id": 0};
      value.cswitch_id = tmp[i].cswitch_id;
      value.cswitch_port_id = tmp[i].cswitch_port_id;
      cswitch_poe_port_keys.push(value);
    }
  }
  
  if(cswitch_poe_port_keys.length > 0)
    json.cswitch_poe_port_keys = JSON.stringify(cswitch_poe_port_keys);
  else
    json.cswitch_poe_port_keys = $("#cswitch_poe_port_keys").val();
  
  json.cswitch_poe_port_data = JSON.stringify(changedData);
  
  console.log("----------+==========");
  console.log(json);
  if(changedDataKeys != undefined)
    changedDataKeys = cswitch_poe_port_keys;
  c$http.delegate({"success": success, "fail": fail, "url": "/configure/cswitch_poe_port_update.json?network_id=" + watch_object.net_id, "params": json, "block": true});
  function success(data){
    //getLogList(getSearchObject(false), termType, true);
    $(".pop_update_poe_port").bPopup().close();
    
    changedData = {};
  }
  function fail(jqXHR, textStatus, errorThrown){
    var err = textStatus + ", " + errorThrown;
    console.log("Request Failed: " + err);
    ret = 1;
  }
  
  return ret;
}

/* hs */
var deepDiffMapper = function() {
  return {
      VALUE_CREATED: 'created',
      VALUE_UPDATED: 'updated',
      VALUE_DELETED: 'deleted',
      VALUE_UNCHANGED: 'unchanged',
      map: function(obj1, obj2) {
          if (this.isFunction(obj1) || this.isFunction(obj2)) {
              throw 'Invalid argument. Function given, object expected.';
          }
          if (this.isValue(obj1) || this.isValue(obj2)) {
              return {
                  type: this.compareValues(obj1, obj2),
                  data: (obj1 === undefined) ? obj2 : obj1
              };
          }

          var diff = {};
          for (var key in obj1) {
              if (this.isFunction(obj1[key])) {
                  continue;
              }

              var value2 = undefined;
              if ('undefined' != typeof(obj2[key])) {
                  value2 = obj2[key];
              }

              diff[key] = this.map(obj1[key], value2);
          }
          for (var key in obj2) {
              if (this.isFunction(obj2[key]) || ('undefined' != typeof(diff[key]))) {
                  continue;
              }

              diff[key] = this.map(undefined, obj2[key]);
          }

          return diff;

      },
      compareValues: function(value1, value2) {
          if (value1 === value2) {
              return this.VALUE_UNCHANGED;
          }
          if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
              return this.VALUE_UNCHANGED;
          }
          if ('undefined' == typeof(value1)) {
              return this.VALUE_CREATED;
          }
          if ('undefined' == typeof(value2)) {
              return this.VALUE_DELETED;
          }

          return this.VALUE_UPDATED;
      },
      isFunction: function(obj) {
          return {}.toString.apply(obj) === '[object Function]';
      },
      isArray: function(obj) {
          return {}.toString.apply(obj) === '[object Array]';
      },
      isDate: function(obj) {
          return {}.toString.apply(obj) === '[object Date]';
      },
      isObject: function(obj) {
          return {}.toString.apply(obj) === '[object Object]';
      },
      isValue: function(obj) {
          return !this.isObject(obj) && !this.isArray(obj);
      }
  }
}();
