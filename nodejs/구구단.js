var express = require("express");
var app = express();  //서버 만들었음

app.use(express.urlencoded({extended:false}));

// http://127.0.0.1:4000/gugu?dan=4
app.get("/gugu", (req,res)=>{
    let dan = req.query.dan;
    let result = "";
    for (i = 1; i<=9;i++){
        result += `${dan} * ${i} = ${dan*i}<br/>`;        
    };
    console.log(result);

    res.writeHead(200, {"Content-type":"text/html"});
    res.end(result);
    // res.end("hello"); // 이미 데이터 보내기를 완료했기때문에 오류발생
})


// http://127.0.0.1:4000/gugu?dan=4
app.get("/gugu/:dan", (req,res)=>{
    let dan = req.params.dan; //url에 따라서 :dan
    let result = "";
    for (i = 1; i<=9;i++){
        result += `${dan} * ${i} = ${dan*i}<br/>`;        
    };
    console.log(result);

    res.writeHead(200, {"Content-type":"text/html"});
    res.end(result);
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});