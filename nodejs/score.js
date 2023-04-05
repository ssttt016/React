var express = require("express");
var app = express();  //서버 만들었음
var ejs = require("ejs")
app.set("view engine", ejs); //내부변수에 값을 설정한다
app.use(express.urlencoded({extended:false}));


let scoreData = [
    {id:1, name:"홍길동", kor:90, eng:80, mat:100}
]; // 데이터로 사용한다.

// url은 서버 전체에서 유일해야함 /score/list
app.get("/score/list", (request,response)=>{
    //views/score/score_list.ejs
    //express frame work가 디자인 파일은 views에 넣기로 약속되어있음

    //response객체에 render라는 함수를 express가 추가
    //첫 번째 매개변수 : html파일
    //두 번째 매개변수 : 데이터를 JSON형태로 전달해야 한다.
    //이 두 개를 합해서 새로운 문서를 만들어 클라이언트로 전송한다.
    response.render("score/score_list.ejs", {scoreList:scoreData})  //score_list.ejs 폼에서 (실제는 scoreData지만 scoreList로 명명)
});


app.get("/score/view/:id", (request,response)=>{
    let id = request.params.id;
    //filter는 해당 조건을 만족하는 모든 데이터셋(배열로 반환)
    //find함수는 조건을 만족하는 첫 번째 데이터만 본다(배열 아님)
    let scoreItem = scoreData.find(score=>score.id==id);
    response.render("score/score_view.ejs", {score:scoreItem});
});


app.get("/score/write", (request,response)=>{
    response.render("score/score_write.ejs");
});

app.post("/score/save", (request,response)=>{
    let name = request.body.name;
    let kor = parseInt(request.body.kor);
    let eng = parseInt(request.body.eng);
    let mat = parseInt(request.body.mat);
    let id = 0; //젤 마지막에 있는 데이터의 id+1을 해야한다.
    id = scoreData[scoreData.length-1].id+1

    //JSON으로 데이터를 만들어서 배열에 추가한다.
    data = {id:id, name:name, kor:kor, eng:eng, mat:mat};
    scoreData.push(data);

    //redirect함수를 이용해서 /score/list를 호출해야한다.
    response.redirect("/score/list");
});





app.use("/", (request, response)=>{
    response.render("index.ejs");
});


app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>404 Error</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});