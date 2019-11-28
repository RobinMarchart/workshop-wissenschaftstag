import * as http from "http";
import * as https from "https";
import express from "express";
let app=express();
/*

GET / -> single page app html

GET /static -> static, bundled and compiled resources

GET /t -> add survey -> redirect to / with query string

PUT /join -> send id, register and receive survey link

PUT /survey -> send id and receive survey questions and (encrypted) answers

POST /answer -> send id and (encrypted) answer

*/
function serve(use_https:boolean) {
    if(use_https){
        https.createServer(app).listen(443);
    }else{
        http.createServer(app).listen(80);
    }
    }