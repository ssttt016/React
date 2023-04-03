var express = require("express");
var app = express();  //서버 만들었음

app.use(express.urlencoded({extended:false}));


app.get("/gugu", (req,res)=>{
    dan = req.query.dan;
    for (i = 1; i<10;i++){
        y = dan*i;
        
        res.send({dan:dan, i:i, y:y});
    };
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});