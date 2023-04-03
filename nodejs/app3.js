var express = require("express");
var app = express();  //서버 만들었음


//bodyParser 모듈이 있는데 모듈을 설치하고 => express자체적으로
//body에 데이터를 가져온다
app.use(express.urlencoded({extended:false}));
//미들웨어, app 객체 만들고, 다른 url처리전에만 호출되면 된다

app.post("/add",(req,res)=>{
    let x = req.body.x;
    let y = req.body.y;
    let z = parseInt(x) + parseInt(y);

    res.send({x:x, y:y, z:z});
})


app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});


// get 방식의 경우 ?x=4&y=5  request.query.x  이런식으로 보내야하고
// get 방식의 경우 /4/5  request.params.x  이런식으로 보내야하고
// post의 경우는  app.use(express.urlencoded({extended:false})); 가 꼭 선행되어야함
// 그리고 request.body.x 로 처리한다
