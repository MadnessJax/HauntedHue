import {Observable} from 'data/observable';

import http = require("http");


function runConfig() {
    
    runGet();
    
}

function runGet(){
    return http.request({
        url: "http://192.168.192.56/api/gpxQW1KZNAvvdlNpApdLJbabNHl9Y2tu0UgSsxg5/", 
        method: "GET" }).then(function (response) {
    return response.content.toString();
    });
}



export function connect() { runConfig(); }