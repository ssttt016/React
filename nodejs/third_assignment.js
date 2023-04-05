var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();

app.use(express.urlencoded({extended:false}));

app.get("/scoreform", (request, response)=>{
    fs.readFile("./html/third_assignment.html","utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
})

app.get("/score", (request, response)=>{
    let name = request.query.name;
    let kor = parseInt(request.query.kor);
    let eng = parseInt(request.query.eng);
    let mat = parseInt(request.query.mat);
    let temp = (`${name}의 총점:${kor+eng+mat}, 평균:${(kor+eng+mat)/3}.`)

    // result라고 명명한 temp를 넘긴다  -> third_assignment.html 로
    response.json({result:temp});
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});


// 세 개의 디자인 : ejs
//                 list.ejs - 데이터목록         /score/list/:pg
//                 view.ejs - 데이터 하나만 상세 /score/view/:선택항목id 
//                 write.ejs                    /score/write - write페이지로 이동
//                                              /score/save 실제 저장 후 list로 복귀