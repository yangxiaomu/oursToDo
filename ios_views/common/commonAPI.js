var React = require('react-native');
var _ = require('underscore');

var commonAPI = {
	make_base_auth : function (user, password) {
	  var tok = this.base64_encode(user + ":" + password);
	  return "Basic " + tok;
	},

	base64_encode : function (str){
	  var c1, c2, c3;
	  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";                
	  var i = 0, len= str.length, string = '';

	  while (i < len){
	    c1 = str.charCodeAt(i++) & 0xff;
	    if (i == len){
	      string += base64EncodeChars.charAt(c1 >> 2);
	      string += base64EncodeChars.charAt((c1 & 0x3) << 4);
	      string += "==";
	      break;
	    }
	    c2 = str.charCodeAt(i++);
	    if (i == len){
	      string += base64EncodeChars.charAt(c1 >> 2);
	      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
	      string += base64EncodeChars.charAt((c2 & 0xF) << 2);
	      string += "=";
	            break;
	    }
	    c3 = str.charCodeAt(i++);
	    string += base64EncodeChars.charAt(c1 >> 2);
	    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
	    string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
	    string += base64EncodeChars.charAt(c3 & 0x3F)
	  }
	  return string;
	},

	objToArray: function(obj){
	    if (!_.isUndefined(obj)) {
		    if (parseInt(obj.totalCount) > 1) {
			  return obj;
		    } else if (parseInt(obj.totalCount) == 0) {
			  obj.document = [];
			  return obj;
		    } else {
			  var tmpArray = [];
			  tmpArray.push(obj.document);
			  obj.document = tmpArray;
			  return obj;
		    }
	    } else {
		  var obj = {};
		  obj.document = [];
		  return obj;
	    }	  
    },

    createUser: function(doc){
		var result = {};
		if (!_.isUndefined(doc)) {
			_.each(doc["item"],function(item){
				if(item["key"] == "user_code"){
					result["user_code"] = item["value"];
				}
				else if(item["key"] == "user_pass"){
					result["user_pass"] = item["value"];
				}
			});
		}
		return result;
  	},

  	createGroup: function(doc){
		var result = {};
		if (!_.isUndefined(doc)) {
			_.each(doc["item"],function(item){
				if(item["key"] == "group_code"){
					result["group_code"] = item["value"];
				}
				else if(item["key"] == "group_name"){
					result["group_name"] = item["value"];
				}
				else if(item["key"] == "group_name_short"){
					result["group_name_short"] = item["value"];
				}
				else if(item["key"] == "members"){
					result["members"] = item["value"];
				}
			});
		}
		return result;
  	},

  	createTask: function(doc){
		var result = {};
		result["record_id"] = doc.id;
		
		if (!_.isUndefined(doc)) {
			_.each(doc["item"],function(item){
				if(item["key"] == "task_code"){
					result["task_code"] = item["value"];
				}
				else if(item["key"] == "group_code"){
					result["group_code"] = item["value"];
				}
				else if(item["key"] == "user_code"){
					result["user_code"] = item["value"];
				}
				else if(item["key"] == "endDate"){
					result["endDate"] = item["value"];
				}
				else if(item["key"] == "task_title"){
					result["task_title"] = item["value"];
				}
				else if(item["key"] == "task_body"){
					result["task_body"] = item["value"];
				}
				else if(item["key"] == "task_status"){
					result["task_status"] = item["value"];
				}
				else if(item["key"] == "finish_date"){
					result["finish_date"] = item["value"];
				}
			});
		}
		return result;
  	}
};

module.exports = commonAPI;