var express = require("express");
var fs = require("fs");
var ejs = require("ejs");

var app = express();  //서버 만들었음

// bodyParse -- npm install bodyParser 를 하고 해야한다.
// 새버전에서는 express가 갖고 있다.
// post로 전송할 때 request.body에 보낸 정보를 추가해서 사용이 간편하도록 도와주는 미들웨어이다.
app.use(express.urlencoded({extended:false}));

app.get("/input", (request, response)=>{
    fs.readFile("./html/input.html","utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
})

app.get("/login", (request, response)=>{
    let userid = request.query.userid;  //input태그의 name속성
    let password = request.query.password;

    if(userid=="test" && password=="1234")
    response.send("login success");
    else
    response.send("login fail");
})


app.get("/addform", (request, response)=>{
    fs.readFile("./html/addform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
});
app.get("/add", (request, response)=>{
    let x = request.query.x;
    let y = request.query.y;

    response.send(`${x} + ${y} = ${parseInt(x) + parseInt(y)}`);
});


app.get("/calcform", (request, response)=>{
    fs.readFile("./html/calcform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
});
app.get("/calc", (request, response)=>{
    let x = parseInt(request.query.x);
    let y = parseInt(request.query.y);
    let operator = parseInt(request.query.operator);
    
    if(operator=="1")
    response.send(`${x} + ${y} = ${x+y}`);
    else if(operator=="2")
    response.send(`${x} - ${y} = ${x-y}`);
    else if(operator=="3")
    response.send(`${x} * ${y} = ${x*y}`);
    else
    response.send(`${x} / ${y} = ${x/y}`);
});

app.get("/guguform", (request, response)=>{
    fs.readFile("./html/guguform.html", "utf-8", (err, data)=>{
        response.writeHead(200, {"Content-type":"text/html"});
        response.end(ejs.render(data));
    })
});

app.get("/gugu", (request, response)=>{
    let dan = parseInt(request.query.dan);
    let result = "";
    let operator = request.query.operator;

    if(operator=="gugudan"){
    for(i=1;i<=9;i++){
        result += `<p style="color:blue;font-size:14pt">${dan} * ${i} = ${dan*i}</p>`;
    }
    response.send(result);}
    else{
        response.send("fail");
    }
})


app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});