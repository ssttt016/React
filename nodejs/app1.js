var express = require("express");
var app = express();  //서버 만들었음

//express 모듈 자체가 use, get, post 함수 3개가 있음
// use - get, post가 오던
// get - get방식으로 온 것만
// post - post 방식으로 온 것만
app.use("/test", (request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Test</h1>")
});
app.get("/get", (request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>GET</h1>")
});
app.use("/post", (request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>POST</h1>")
});
app.get("/userinfo", (request, response)=>{
    let userinfo={name:"Tom","phone":"010-0000-0000"};
    response.send(userinfo); //send함수를 이용해서 JSON데이터 송신
});
//userinfo2?name=Jane&phone=01000000000
app.get("/userinfo2", (req, res)=>{
    let userinfo={
        name:req.query.name,
        "phone":req.query.phone
    };
    res.send(userinfo); //send함수를 이용해서 JSON데이터 송신
});

//get방식 - 새롭게 추가된 url방식
// http://127.0.0.1:4000/userinfo3/Brown/user01
app.get("/userinfo3/:username/:userid", (req, res)=>{
    console.log(req.params);  //.name;
    let userinfo={
        username:req.params.username,
        userid:req.params.userid
    };
    console.log(userinfo);
    res.send(userinfo); //send함수를 이용해서 JSON데이터 송신
});



// 다른 url처리 없을때 처리한다
app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});