if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined' ? args[number] : match;
    });
  };
}

function FixedDelay(callbackFn, timeout) {
  this.callbackFn = callbackFn;
  this.timeout = timeout;
  this.timerId = setTimeout(this.callbackFn, this.timeout, this);
  
  this.cancel = function() {
    clearTimeout(this.timerId);
  };
 
  this.reschedule = function() {
    this.schedule();
  }
  
  this.schedule = function() {
    this.timerId = setTimeout(this.callbackFn, this.timeout, this);
  };
}

/*
* AS-IS: 동일
* array에서 indexOf를 사용하기 위해 작성
* 해당 함수 없을 경우 낮은 버전의 IE에서 에러발생함.
* ex)
* if([1, 2, 3, ...].indexOf(3) !== -1){
* 	console.log(true);
* }
*/
Array.prototype.indexOf = function(obj){
	for(var i = 0, length = this.length; i < length; i++){
		if(this[i] == obj){
			return i;
		}
	}
	return -1;
};
/*
 * AS-IS: 동일
 * array index change
 * ex)
 * Example code: ArrayMove(arr,0, 1) gives [2, 1, 3].

 */
var ArrayMove = function (arr,old_index, new_index) {
  if (new_index >= arr.length) {
      var k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing purposes
};

function isUndefined(value) {return typeof value === 'undefined';}

function isEmpty(value) {
  if (isUndefined(value) || value === "" || value === null) return true;
  return false;
}


function replaceAll(str, searchStr, replaceStr) {

  return str.split(searchStr).join(replaceStr);
}

function replaceTag(str){
  str = replaceAll(str,"<","&lt;");
  str = replaceAll(str,">","&gt;")
  return str;
}

function replaceReverseTag(str){
  str = replaceAll(str,"&lt;","<");
  str = replaceAll(str,"&gt;",">")
  return str;
}

/*
* AS-IS: 동일
* setTimeout과 유사한 기능으로 지정한 milliseconds 이후에 구현부를 실행한다.
* ex)
* delay(function(){
* 	console.log("delay...");
* }, 1000);
*/
var delay = (function(){
	var timer = 0;
	return function(callback, ms){
		clearTimeout (timer);
		timer = setTimeout(callback, ms);
	};
})(); //end: var delay = (function(){

/*
 * String.prototype.toCamelCase
 * 파라메터로 넘긴  스트링을 camelcase 로 바꿔줍니다.
 * 현재는 _ (snakecase) 만 적용 했습니다.
 * - 최영화
 */
String.prototype.toCamelCase = function(){
  return this.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
};
/*
 * String.prototype.toSnakeCase
 * 파라메터로 넘긴  스트링을 snakecase 로 바꿔줍니다.
 * 현재는 camelcase to snakecase 만 적용 했습니다.
 * - 최영화
 */
String.prototype.toSnakeCase = function(){
  return this.replace(/([A-Z])/g, function (g) { return "_" + g[0].toLowerCase(); });
}

/*
* number type의 unix timestamp 값을 받아서 문자열로 반환한다.
* 파라미터로 넘기는 날짜형식을 원하는대로 구성할 수 있다.
* ex)
* var formatted = 86400000.format("yy-mm-dd HH:mi:ss");
* console.log(formatted);
*/
Number.prototype.format = function(f){
	var d = new Date(this);

	String.prototype.string = function(len){
		var s = '', i = 0;
		while(i++ < len){
			s += this;
		}
		return s;
	}; //end: String.prototype.string = function(len){
	String.prototype.zf = function(len){
		return "0".string(len - this.length) + this;
	}; //end: String.prototype.zf = function(len){
	Number.prototype.zf = function(len){
		return this.toString().zf(len);
	}; //end: Number.prototype.zf = function(len){

	if(!this.valueOf()){
		return " "
	};

	var weeks= ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	return f.replace(/(yyyy|yy|mm|Me|dd|E|hh|mi|ss|a\/p)/gi, function(pattern){
		switch(pattern){
      case "YYYY":
			case "yyyy":
				return d.getFullYear();
      case "YY":
			case "yy":
				return (d.getFullYear() % 1000).zf(2);
      case "MM":
			case "mm":
				return (d.getMonth() + 1).zf(2);
			case "Me":
				return months[d.getMonth()];
      case "DD":
			case "dd":
				return d.getDate().zf(2);
			case "E":
				return weeks[d.getDay()];
			case "HH":
				return d.getHours().zf(2);
			case "hh":
				return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mi":
				return d.getMinutes().zf(2);
			case "ss":
				return d.getSeconds().zf(2);
			case "a/p":
				return d.getHours() < 12 ? "오전" : "오후";
			default:
				return pattern;
		} //end: switch(pattern){
	}); //end: return f.replace(/(yyyy|yy|mm|Me|dd|E|hh|mi|ss|a\/p)/gi, function(pattern){
}; //end: Date.prototype.format = function(f){

/*
* parameter로 받은 두 값을 비교해서 boolean으로 return한다.
* parameter는 array이거나 json일 수 있으며 내부 값을 비교함.
* ex)
* var arr1 = [1, 2, 3];
* var arr2 = [2, 3, 4];
* var result1 = compare(arr1, arr2);
* console.log(result1);
*
* var json1 = {"id": "1", "name": "name1"};
* var json2 = {"id": "2", "name": "name2"};
* var result2 = compare(json1, json2);
* console.log(result2);
*/

function deepCompareObject () {
  var i, l, leftChain, rightChain;

  function compare2Objects (x, y) {
    var p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
         return true;
    }

    // Compare primitives and functions.     
    // Check if both arguments link to the same object.
    // Especially useful on step when comparing prototypes
    if (x === y) {
        return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if ((typeof x === 'function' && typeof y === 'function') ||
       (x instanceof Date && y instanceof Date) ||
       (x instanceof RegExp && y instanceof RegExp) ||
       (x instanceof String && y instanceof String) ||
       (x instanceof Number && y instanceof Number)) {
        return x.toString() === y.toString();
    }

    // At last checking prototypes as good a we can
    if (!(x instanceof Object && y instanceof Object)) {
        return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
        return false;
    }

    if (x.constructor !== y.constructor) {
        return false;
    }

    if (x.prototype !== y.prototype) {
        return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
         return false;
    }

    // Quick checking of one object beeing a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        }
        else if (typeof y[p] !== typeof x[p]) {
            return false;
        }
    }

    for (p in x) {
        if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
            return false;
        }
        else if (typeof y[p] !== typeof x[p]) {
            return false;
        }

        switch (typeof (x[p])) {
            case 'object':
            case 'function':

                leftChain.push(x);
                rightChain.push(y);

                if (!compare2Objects (x[p], y[p])) {
                    return false;
                }

                leftChain.pop();
                rightChain.pop();
                break;

            default:
                if (x[p] !== y[p]) {
                    return false;
                }
                break;
        }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {

      leftChain = []; //Todo: this can be cached
      rightChain = [];

      if (!compare2Objects(arguments[0], arguments[i])) {
          return false;
      }
  }

  return true;
}

var compare = function(a, b){
	var i = 0, j;
	if(typeof a == "object" && a){
		if(Array.isArray(a)){
			if(!Array.isArray(b) || a.length != b.length){
				return false;
			}
			for(j = a.length ; i < j ; i++) if(!compare(a[i], b[i])){
				return false;
			}
			return true;
		}else{
			for(j in b){
				if(b.hasOwnProperty(j)){
					i++;
				}
			}
			for(j in a){
				if(a.hasOwnProperty(j)){
					if(!compare(a[j], b[j])){
					  console.log(a[j]);
					  console.log(b[j]);
						return false;
					}
					i--;
				}
			}
			return !i;
		} //end: }else{
	} //end: if(typeof a == "object" && a){
	return a === b;
} //end: var compare = function(a, b){
/*
*
*/
$.extend({
  getUrlVars: function() {
      var vars = [], hash;
      var hashes = window.location.search.slice(window.location.search.indexOf('?') + 1).split('&');
          for (var i = 0; i < hashes.length; i++) {
              hash = hashes[i].split('=');
              vars.push(hash[0]);
              vars[hash[0]] = hash[1];
          }
          return vars;
      },
      getUrlVar: function(name) {
          return $.getUrlVars()[name];
      }
  });
$.fn.changed = function(data){
	var defaults = {
		"before": "white"
		, "after": "skyblue"
		, "data-value": 0
		, "data-changed": false
		, "event": []
	}; //end: var defaults = {

	$.extend(true, defaults, data);

	return this.each(function(){
		var $this = $(this);
		var $tagName = $this.prop("tagName");

		switch($tagName){
			case "SELECT":
				if(defaults.event.length === 0){
					defaults.event.push("change"); 
				}
				break;
			case "INPUT":
				if(defaults.event.length === 0){
					defaults.event.push("keyup");
					defaults.event.push("change");
				}
			case "TEXTAREA":
			  if(defaults.event.length === 0){
			    defaults.event.push("keyup"); 
			  }
				break;
		} //end: switch($tagName){

		$this.attr({"data-value": defaults["data-value"], "data-changed": defaults["data-changed"]}).css({"background-color": defaults.before});
		for(var i = 0; i < defaults.event.length; i++){
			$this[defaults.event[i]](function(){
				$this.css("background-color", $this.attr("data-value") === $this.val() ? defaults.before : defaults.after).attr("data-changed", $this.attr("data-value") === $this.val() ? false : true);
			});
		}
	}); //end: return this.each(function(){
} //end: $.fn.changed = function(data){

/*
* json을 다루는 클래스
*/
var c$json = {
	/*
	* AS-IS: copyJson
	* json 객체를 복사한다.
	* ex)
	* var fromServer = {"id": "1", "name": "name1"};
	* var json = c$json.copy(fromServer);
	*/
	copy: function(json){
		return JSON.parse(JSON.stringify(json));
	} //end: copy: function(json){

	/*
	* AS-IS: getJsonLength 
	* json 객체의 key의 갯수를 구한다.
	* ex)
	* var json = {"id": "1", "name": "name1"};
	* console.log(c$json.getLength(json));
	*/
	, getKeyLength: function(json){ //json 객체의 key의 갯수를 구한다.
		return Object.keys(json).length;
	} //end: , getKeyLength: function(json){

	/*
	* AS-IS: objcetRemoveNull
	* json 객체 내에서 값이 공백인 key를 삭제하고, 그 객체를 반환한다.
	* ex)
	* var json = {"id": "1", "name": "name1", "tags": ""};
	* var removed = c$json.removeNull(json);
	* for(var i in removed){
	* 	console.log(i);
	* }
	*/
	, removeNull: function(json){ 
		for(var i in json){
			if(json[i] === ""){
				delete json[i];
			}
		}
		return json;
	} //end: , removeNull: function(json){
}; //end: var c$json = {

/*
* 배열 객체를 다루는 클래스
*/
var c$array = {
	/*
	* AS-IS: copyArray
	* 배열 객체를 복사한다.
	* ex)
	* var arr1 = ["a", "b", "c"];
	* var arr2 = c$array.copy(arr1);
	*/
	copy: function(arr){
		return arr.slice();
	} //end: copy: function(arr){

	/*
	* AS-IS: DuplicateCheck
	* jsonArray 내에서 중복된 값이 있는지 확인한다.
	* ex)
	* var jsonArray = [
	* 	{"id": "1", "name": "name1"}
	* 	, {"id": "2", "name": "name2"}
	* 	, {"id": "3", "name": "name2"}
	* 	, {"id": "4", "name": "name4"}
	* ];
	* console.log(c$array.isDuplicateJson(jsonArray, "name");
	*/
	, isDuplicateJson: function(jsonArray, key){
		var values = [];
		for(var i = 0; i < jsonArray.length; i++){
			values.push(jsonArray[i][key]);
		}

		values.sort();    
		for(var i = 1; i < values.length; i++){
			if(values[i - 1] == values[i]){
				return false;
			}
		}
		return true;
	} //end: , isDuplicatedJson: function(jsonArray, key){

	/*
	* AS-IS: getArrayAfterCompare
	* parameter로 받은 두 array를 비교해서 json으로 return한다.
	* 서로 값이 다를 경우 두번째 parameter의 값을 대입한다.
	*/
	, getCompareJsonArray: function(a, b){
		var c = [];
		for(var i = 0; i < a.length; i++){
			var json = {};
			for(var j in a[i]){
				json[j] = a[i][j] === b[i][j] ? a[i][j] : b[i][j];
			}
			c.push(json);
		} //end: for(var i = 0; i < a.length; i++){
		return c;
	} //end: getCompareJsonArray: function(a, b){

	/*
	* AS-IS: 동일
	* index에 맞는 key만 찾아서 다시 배열로 담아서 return한다.
	*/
	, getKeyJsonArray: function(json){
		var key = json.key;
		var list = json.list;
		var index = json.index === undefined ? false : json.index;

		var arr = [];
		for(var i = 0; i < list.length; i++){
			for(var j = 0 ; j < key.length; j++){
				var tmp = {};
				if(!index){
					tmp[key[j]] = list[i][key[j]];
					arr.push(tmp);
				}else{
					for(var k = 0; k < index.length; k++){
						if(i === k){
							tmp[key[j]] = list[index[k]][key[j]];
							arr.push(tmp);
						}
					} //end: for(var k = 0; k < index.length; k++){
				}
			} //end: for(var j = 0 ; j < key.length; j++){
		} //end: for(var i = 0; i < list.length; i++){
		return arr;
	} //end: , getKeyJsonArray: function(json){
	
	/*
	* 바로 위의 getKeyJsonArray 함수의 simple 버전으로 추후 완전히 대체될 수도 있음.
	* ex)
	* var jsonArray = [
	*   {id: 1, name: "name1", some: "some1"}
	*   , {id: 2, name: "name2", some: "some2"}
	* ];
	* c$array.getKeysJsonArray(jsonArray, ["id", "name"]);
	*/
	, getKeysJsonArray: function(jsonArray, keys){
	  var results = [];
	  for(var i = 0; i < jsonArray.length; i++){
	    var json = {};
	    for(var j = 0; j < keys.length; j++){
	      json[keys[j]] = jsonArray[i][keys[j]];
	    }
      results.push(json);
	  }
	  return results;
  } //end: , getKeysJsonArray: function(jsonArray, keys){
  /*
   * 특정 필드를 제외 그외는 위 함수(getKeysJsonArray) 와 동일
   * 
   */
  , getKeysJsonArrayByFieldExcept: function(jsonArray, keys, fieldKey, fieldValue){
    var results = [];
    for(var i = 0; i < jsonArray.length; i++){
      var json = {};
      for(var j = 0; j < keys.length; j++){
        json[keys[j]] = jsonArray[i][keys[j]];
      }
      if (jsonArray[i][fieldKey] != fieldValue){
        results.push(json);
      }
    }
    return results;
  } //end: , getKeysJsonArray: function(jsonArray, keys){
	
	/*
	* AS-IS: 동일
	* index에 맞는 key만 찾아서, 다른 값이 하나라도 존재하면 true를 모두 같은 값이면 false를 반환한다.
	* ex)
	* var jsonArray = [
	*   {id: 1, name: "name1"}
	*   , {id: 2, name: "name2"}
	* ];
	* var result = c$array.isMultiple(jsonArray, "name");
	* console.log(result);
	*/
	, isMultiple: function(jsonArray, key){
    var result = false;
    var copied = c$array.copy(jsonArray);

    while(copied.length > 1){
      var src = copied.splice(0, 1);
      
      for(var i = 0; i < copied.length; i++){
        //console.log("[isMultiple]" + $.trim(src[0][key]) + ", " + $.trim(copied[i][key]));
        if($.trim(src[0][key]) !== $.trim(copied[i][key])){
          result = true;
          return result;
        }
        else if(src[0].hasOwnProperty("cswitch_poe_port"))
        {
          if($.trim(src[0].cswitch_poe_port[key]) !== $.trim(copied[i].cswitch_poe_port[key])){
            result = true;
            return result;
          }
        }
      }
    } //end: while(copied.length > 1){
    return result;
	} //end: , isMultiple(jsonArray, key){
	/*
	 * 
	 * var result = c$array.jsonSortByKey(jsonArray,key)
	 */
	,jsonSortByKey: function(array, key) {
      return array.sort(function(a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
	}
	/*
	 * 
	 * var boolean = c$array.isDuplicate(array,key)
	 */
	,isDuplicate:function(array,key){
	  var len = array.length;
	  for(var i=0;i<len;i++){
	    if(array[i]==key){
	      return true;
	    }
	  }
	  return false;
	}
	/*
	 * 
	 * var boolean = c$array.isAllDifferent(array1,array2)
	 */
	,isAllDifferent:function(array1,array2){
	  if(array1==""||array1==undefined||array2==""||array2==undefined){
	    return true;
	  }
	  var len = array1.length;
	  for(var i=0;i<len;i++){
	    var len2 = array2.length;
	    for(var j=0;j<len2;j++){
	      if(array1[i]==array2[j]){
	        return false;
	      }
	    }
	  }
	  return true;
	}
	/*
	 * 
	 * var boolean = c$array.isRangeIn(array1,array2)
	 */
	,isRangeIn:function(parent,child){
	  if(parent==""||parent==undefined){
	    return false;
	  }
	  if(child==""||child==undefined){
	    return true;
	  }
	  var len = child.length;
	  for(var i=0;i<len;i++){
      if(parent.indexOf(child[i]) == -1){
        return false;
      }
	  }
	  return true;
	}

	
}; //end: var c$array = {

/*
* 문자열 객체를 다루는 클래스
*/
var c$string = {
	/*
	* AS-IS: mapToJson
	* map({"key": "value", ...})형식으로 구성된 문자열 데이터를 json 형태로 parsing한다.
	* 일반적으로 server에서 넘어온 데이터가 json이 아니라 map구조로 넘어오는 경우에 사용된다.
	* ex)
	* {"id"="1","name"="test#1","tags"="virtuals"} //server data
	* var json = c$string.jsonize(map);
	* console.log(json.id);
	*/
	jsonize: function(map){
		var str = map.substring(1, map.length - 1); //앞, 뒤 brace 제거
		var arr = str.split(","); //배열로 대입
		var json = {};
		for(var i = 0; i < arr.length; i++){
			var _arr = arr[i].split("=");
			json[_arr[0].replace(/ /gi, "")] = _arr[1];
		}
		return json;
	} //end: jsonize: function(map){

	/*
	* AS-IS: c$util.comma
	* 숫자를 받아서 3자리마다 쉼표를 입력하고 반환한다.
	* var tmp = 32767;
	* var result = c$string.comma(tmp);
	* console.log(result);
	*/
	, comma: function(n){
	  if(n == undefined){
	    return "-";
	  }else{
	    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
	  }
	} //end: , comma: function(n){
  /*
   * firmware full name을 version만 짤라서 return
   * c$string.getFirmwareVersionFromFullName(firmware);
   * e.g) PLOS-CS-V1.0.3.0.0 => return V1.0.3.0.0
   */
  ,getFirmwareVersionFromFullName: function(firmwareFullName){
    let pattern = /-V\d/;
    let patternResult = pattern.exec(firmwareFullName);
    let foundIdx = patternResult == null ? 0 : patternResult.index;
    return firmwareFullName === undefined ? "-" : firmwareFullName.substr(foundIdx + 1);
  } //end: getFirmwareVersionFromFullName: function(firmwareFullName){
  /*
   * firmware version 을 받아서 비교
   * c$string.compareFirmwareVersion(target, standard);
   * e.g) 1.0.3.0.0 와 1.0.4.0.1 을 비교 => return false
   * e.g) 1.0.4.0.1 와 1.0.3.0.0 을 비교 => return true
   * e.g) 1.0.4.0.1 와 1.0.4.0.1 을 비교 => return true
   */
  ,compareFirmwareVersion: function(target, standard, target_full_verison){
    if (target.indexOf("V") !== -1) {
      target = target.substring(1);
    }
    if (target.indexOf("-rc") !== -1) {
      target = target.substr(0, target.indexOf("-rc"));
    }
    
    var targetSplit = target.split(".");
    var standardSplit = standard.split(".");
    
    if (targetSplit.length != 5 && standardSplit.length != 5) {
      return false;
    }
    /* chj97 added 200421 - for issue #68339 */
    if(target_full_verison != undefined && target_full_verison.indexOf("SS") !== -1) {
      if(targetSplit[0] == "3") {
            let ver1 = targetSplit[1]*1;
            let ver2 = targetSplit[2]*1;
            if(ver1 == 0 && ver2 >= 10) {
                targetSplit[2] = ver2 + 4;
            }
        }
    }
    
    // convert: 2.0.16.1105.0 -> 3.0.11.5.0
    if (targetSplit[0] == "2" && targetSplit[3].length == 4) {
        var str = targetSplit[3];
        var sb = "3.0.";
        sb +=  str.substring(0, 2);
        sb += ".";
        sb +=  str.substring(2, 4).replace(/^0+/gi, "");
        sb += ".";
        sb += targetSplit[4];
        targetSplit = sb.split(".");
        //console.log(targetSplit);
    }
    
    for (var i = 0; i < 5; i++) {
      if (Number(targetSplit[i]) == Number(standardSplit[i])) {
        continue;
      } else if (Number(targetSplit[i]) > Number(standardSplit[i])) {
        return true;
      } else {
        return false;
      }
    }
    
    return true;
  } //end: compareFirmwareVersion: function(target, standard){
  ,compareApFirmwareVersion: function (target, standard) { 
    var targetSplit = target.split(".");
    var standardSplit = standard.split(".");
    if (targetSplit.length != 3 && standardSplit.length != 3) {
      return false;
    }

    for (var i = 0; i < 3; i++) { 
      if (Number(targetSplit[i]) == Number(standardSplit[i])) {
        continue;
      } else if (Number(targetSplit[i]) > Number(standardSplit[i])) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
  ,compareNormalStrings: function(a, b){
    let ax = [], bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
    
    while(ax.length && bx.length) {
        let an = ax.shift();
        let bn = bx.shift();
        let nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
        if(nn) return nn;
    }

    return ax.length - bx.length;
  } //end: getFirmwareVersionFromFullName: function(firmwareFullName){
}; //end: var c$string = {

/*
* 숫자 객체를 다루는 클래스
*/
var c$number = {
	/*
	* AS-IS: c$util.convertByte
	* 입력받은 숫자를 1024 byte로 계산하여 단위별로 반환한다.
	* var num = 1000000;
	* var bytes = c$number.convertByte(num);
	* console.log(bytes);
	*/
	convertByte: function(bytes, point){
		var units = ["B", "KB", "MB", "GB", "TB", "PB"];
		if(bytes === 0){
			return "0 B";
		}
		var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		var result = point === undefined ? Math.round(bytes / Math.pow(1024, i), 2) : (bytes / Math.pow(1024, i)).toFixed(point);
		return result + " " + units[i];
	} //end: convertByte: function(bytes, point){
  /*
   * AS-IS: c$util.convertBit
   * 입력받은 숫자를 1024 byte로 계산하여 단위별로 반환한다.
   * var num = 1000000;
   * var bytes = c$number.convertByte(num);
   * console.log(bytes);
   */
  ,convertBit: function(bit, point){
    var units = ["b", "Kb", "Mb", "Gb", "Tb", "Pb"];
    if(bit === 0){
      return "0 b";
    }
    var i = parseInt(Math.floor(Math.log(bit) / Math.log(1024)));
    var result = point === undefined ? Math.round(bit / Math.pow(1024, i), 2) : (bit / Math.pow(1024, i)).toFixed(point);
    return result + " " + units[i];
  } //end: convertByte: function(bytes, point){
  /*
	* AS-IS: c$util.convertBps
	* 입력받은 숫자를 1000 bps로 계산하여 단위별로 반환한다.
	* var num = 1000000;
	* var bps = c$number.convertBps(num);
	* console.log(bps);
	*/
  /* chj97 added 160909 - for issue #38043 */
  ,convertBps: function(bps, point){
	var units = ["bps", "kbps", "Mbps", "Gbps", "Tbps", "Pbps"];
	if(bps === 0){
		return "0 bps";
	}
	var i = parseInt(Math.floor(Math.log(bps) / Math.log(1000)));
	var result = point === undefined ? Math.round(bps / Math.pow(1000, i), 2) : (bps / Math.pow(1000, i)).toFixed(point);
	return result + " " + units[i];
  } //end: convertByte: function(bytes, point){
  /*
   * AS-IS: c$number.convertMillisecondToString
   * millisecond 를 받아서 시/분/초/일 을 계산하여 반환한다.
   */
  , convertMillisecondToString: function(millisecond, isUnit) {
    if (typeof millisecond == "string") {
      parseInt(millisecond);
    }
    
    var arrC = [60, 60, 24];
    var arrS = ["Second", "Minute", "Hour", "Day"];
    var calc = function(value, c) {
      return Math.round(value / c) > 0 ? Math.round(value / c) : value;
    }
    
    var result = calc(millisecond, 1000);
    for (var i = 0; i < arrC.length; i++) {
      var tempValue = calc(result, arrC[i]);
      
      if (result == tempValue) {
        break;
      } else {
        result = tempValue;
      }
    }
    return isUnit ? result + " " + arrS[i] : result;
  } // end: convertMillisecondToString: function()
}; //end: var c$number = {

/*
* 날짜 객체를 다루는 클래스
*/
var c$date = {
	/*
	* 입력된 날짜에 시간을 더하거나 빼서 원하는 날짜를 출력한다.
	* ex)
	* 현재시간을 기준으로 1일전
	* var yesterday = c$date(new Date(), "day", -1);
	* console.log(yesterday);
	*/
	add: function(date, interval, units){
		var result = new Date(date);
		switch(interval.toLowerCase()){
			case 'year':
				result.setFullYear(result.getFullYear() + units);
				break;
			case 'quarter':
				result.setMonth(result.getMonth() + 3 * units);
				break;
			case 'month':
				result.setMonth(result.getMonth() + units);
				break;
			case 'week':
				result.setDate(result.getDate() + 7 * units);
				break;
			case 'day':
				result.setDate(result.getDate() + units);
				break;
			case 'hour':
				result.setTime(result.getTime() + units * 3600000);
				break;
			case 'minute':
				result.setTime(result.getTime() + units * 60000);
				break;
			case 'second':
				result.setTime(result.getTime() + units * 1000);
				break;
			default:
				result = undefined;
				break;
		} //end: switch(interval.toLowerCase()){
		return result;
	} //end: add: function(date, interval, units){
  /*
   * 지속시간(milesecond)을  지정된 문자열 포맷(시:분:초)으로  변환해서 반환한다.
   * ex)
   * var mstimeElapse = c$date.msToTime(3711000);
   * console.log(mstimeElapse);
   */
   ,msToTime: function(duration){
      var seconds = parseInt((duration/1000)%60);
      var minutes = parseInt((duration/(1000*60))%60);
      var hours = parseInt((duration/(1000*60*60))%24);
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
      return hours + ":" + minutes + ":" + seconds;
   } //end: msToTime: function(duration){
}; //end: var c$date = {

function checkIP(strIP) {
  var delMask = strIP.split('/');
  if (delMask.length != 2) {
    return false; //no subnet Mask
  }
  
  var patt = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  var match = delMask[0].match(patt);
  if(match == null)
    return false;
  
  var arrIP = delMask[0].split('.');
  if (arrIP.length == 4) {
    var nMask = Number(delMask[1]);
    if (!isNaN(nMask)) {
      if(delMask[1].indexOf(".") != -1)
        return false;
      
      if (nMask > 0 && nMask < 33) {
        if (arrIP[0]*1 < 256 && arrIP[1]*1 < 256 && arrIP[2]*1 < 256 && arrIP[3]*1 < 256) {
          return true;
        }
      }
    }
  }
  return false;
}

function checkIPWithoutMask(strIP) {
  var patt = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  var match = strIP.match(patt);
  if(match == null)
    return false;
  
  var arrIP = strIP.split('.');
  if (arrIP.length == 4) {
    if (arrIP[0]*1 < 256 && arrIP[1]*1 < 256 && arrIP[2]*1 < 256 && arrIP[3]*1 < 256) {
      return true;
    }
  }
  return false;
}

function isReportLogoFileValid($target) {
  var size = $target[0].files[0].size;
  var maxSize = 30720;
  if ($target.val() !== "") {
    var ext = $target.val().split(".").pop().toLowerCase();
    if ($.inArray(ext, ["svg"]) == -1 || maxSize < size) {
      $.alert(messageProp.logoValid);
      $(".file_route").val("");
      return false;
    }
  }
  return true;
}

function setDate(date, $day, $hour, $min) {
  var day = date.format("yyyy-mm-dd");
  var hour = date.format("HH");
  var min = date.format("mi");
  $day.datepicker("setDate", day);
  $hour.val(hour);
  $min.val(min);
}

function getTime($date, $hour, $min) {
  var strDate = $date.datepicker().val()+" "+$hour.val() + ":" + $min.val();
  var date = new Date(strDate.replace(/-/g, "/"));
  return date.getTime();
}


/*
 * jquery 엘리먼트 스왑
 * 
 */
$.fn.swap = function (elem) {
  elem = elem.jquery ? elem : $(elem);
  return this.each(function () {
      $(document.createTextNode('')).insertBefore(this).before(elem.before(this)).remove();
  });
};

function nameCompare(a, b) {
  let ax = [], bx = [];
  a.name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
  b.name.replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });
  while(ax.length && bx.length) {
      let an = ax.shift();
      let bn = bx.shift();
      let nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
      if(nn) return nn;
  }
  return ax.length - bx.length;
}

function getDuplicateValue(data) {
  var duplicate_values = data.reduce(function(acc, el, i, arr) {
    if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) acc.push(el); return acc;
  }, []);
  return duplicate_values;
}

// cswitch_id 존재 여부로 버전 체크
function isOldVersion(item) { 
  if (item.cswitch_id != null) {
    return true;
  }
  return false;
}

/*
*  remote_termina
*/ 
Storage.prototype.setObject = function(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  
  Storage.prototype.printObject(key);
}

Storage.prototype.getObject = function(key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
};

Storage.prototype.removeObject = function(key) {
  localStorage.removeItem(key);
  
  Storage.prototype.printObject(key);
}

Storage.prototype.printObject = function(key) {
  console.debug(Storage.prototype.getObject(key));
}

function removeStorageItem (key, itemKey) {
  let cswitch_terminals = Storage.prototype.getObject(key);
  if (cswitch_terminals) {
      for (let i =0;i < cswitch_terminals.length; i++ ){
          if (cswitch_terminals[i].name === itemKey) {
            cswitch_terminals.splice(i, 1);
            break;
          }
      }
      
      if (cswitch_terminals.length == 0)
        Storage.prototype.removeObject(key);
      else
        Storage.prototype.setObject(key, cswitch_terminals);
  }
}

function runRemoteConsole(objName, device_ids, datetime) {
  let cswitch_terminals = Storage.prototype.getObject(objName);
  
  if (cswitch_terminals!= null && cswitch_terminals.length >= remoteConsole.MAX_REMOTE_CONSOLE_COUNT) {
    $.alert(jQuery.i18n.prop("titerm.remoteConsole.popup.count_exceed", remoteConsole.MAX_REMOTE_CONSOLE_COUNT));
    return;
  }

  let name = "terminal"+ datetime;
  let url = (objName === 'switch_terminals') 
      ? "/monitor/titerminal.do?ids=" + device_ids.join()+ "&type=" + objName
      : "/monitor/titerminal_third_party.do?ids=" + device_ids.join()+ "&type=" + objName;  // cswitch_id
  window.open(url, name, "width=800, height=430, scrollbars=no, menubar=no, status=no, titlebar=no");
}

function executeRemoteConsole(gridOptions, device_ids, datetime) {
  if (device_ids == undefined) {
    var rowDatas = gridOptions.getSelected(); //row 선택된 grid data
    device_ids = c$array.getKeysJsonArray(gridOptions.getSelected(), ["device_id", "terminalStatus"]);
  }
  if (device_ids && device_ids.length > 0) {
    const valid_devices = device_ids.filter(device => device.terminalStatus).map(device => device.device_id.toString());
    
    if (valid_devices.length == 0) {
      $.alert(jQuery.i18n.prop('titerm.remoteConsole.target.empty'));
    } else if (valid_devices.length > remoteConsole.MAX_REMOTE_CONSOLE_COUNT) {
      $.alert(jQuery.i18n.prop('titerm.remoteConsole.target.count_exceed', remoteConsole.MAX_REMOTE_CONSOLE_COUNT));
    } else {
      runRemoteConsole(remoteConsole.SWITCH_TERMINAL, valid_devices, datetime);
    }
  } else {
    $.alert(jQuery.i18n.prop("titerm.remoteConsole.target.empty")); 
 }
}

function getCountryCity(data) {
  var result = { country: null, city: null };
  for (var key in data) {
    var address = data[key];
    if (address["types"].indexOf("administrative_area_level_1") !== -1) {
      if (address["long_name"].indexOf(" ") !== -1) {
        result.city = address["long_name"].substring(0, address["long_name"].indexOf(" "));
      } else {
      }
      result.city = address["long_name"];
    } else if (address["types"].indexOf("country") !== -1) {
      result.country = address["short_name"];
    }
  }

  if (result.country === 'CN') {
    result.city = result.city.substring(0, result.city.indexOf(" "));
  }

  return result;
}
/* 
 *  #89747 : grid column resize 
 */
function applyGridfixedColumn(cols) {
  const isfixed_cols = cols.some(el =>el.fixed_name != undefined );
  if (isfixed_cols) {
    let user_fixed_width_cols = Storage.prototype.getObject('fixed_width_column');
    
    if (user_fixed_width_cols) {
      cols.forEach(el => {
        if (el.fixed_name) {
          let findidex = user_fixed_width_cols.findIndex(t => t.fixed_name === el.fixed_name);
          if (findidex > -1 && user_fixed_width_cols[findidex].fixed_pinned) {
            el.width = user_fixed_width_cols[findidex].width;
            el.fixed_pinned = user_fixed_width_cols[findidex].fixed_pinned;
          }
        }
      });
    }
  }
  return cols;
}

function getGridfixedColumn(fixed_column_name, width_orign) {
  let custom_width = width_orign;
  const user_fixed_width_cols = localStorage['fixed_width_column'];
  if (user_fixed_width_cols) {
    let temps = JSON.parse(user_fixed_width_cols);
    let findidex = temps.findIndex(t => t.fixed_name === fixed_column_name);
    if (findidex > -1) {
      custom_width = temps[findidex].width;
    }
  }
  console.log(custom_width);
  return custom_width;
}

function setGridfixedColumn(cols) {
  let key ="fixed_width_column";
  Storage.prototype.setObject(key, cols);
}

function getGridfixedColumn() {
  let key ="fixed_width_column";
  return Storage.prototype.getObject(key);
}
