import http = require("http");
import { ip } from "../config";

function _setOn(query, obj) {
        if(obj.on === undefined){
            obj = { "on": true }
        }
        else{
            obj = obj
        }

      http.request({
          url: "http://"+ ip +"/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5" + query,
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          content: JSON.stringify(obj)
        }).then(function (response) {
            // alert(response);
        }, function (e) {
            // console.log("Error occurred " + e);
        });
    }


export function setOn(_query, _obj) { _setOn(_query, _obj); }