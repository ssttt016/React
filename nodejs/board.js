var express = require("express");
var app = express();  //서버 만들었음
var fs = require("fs");
var ejs = require("ejs");

//ejs엔진은 views 폴더 아래서 파일을 검색한다.
app.set("view engine", ejs);
app.use(express.urlencoded({extended:false}));

let boardList = [
    {id:1, title:"제목1", wirter:"작성자1", wdate:"2023-04-04"},
    {id:2, title:"제목2", wirter:"작성자2", wdate:"2023-04-05"},
    {id:3, title:"제목3", wirter:"작성자3", wdate:"2023-04-06"},
    {id:4, title:"제목4", wirter:"작성자4", wdate:"2023-04-07"},
    {id:5, title:"제목5", wirter:"작성자5", wdate:"2023-04-08"},
]

app.use("/board/list",(request, response)=>{
    response.render("board/board_list.ejs", {boardList:boardList});
})

app.use("/board/view/:id", (request, response)=>{
    let id = request.params.id;
    let item = boardList.filter(x=>x.id==id)
    response.render("board/board_view.ejs", {item :item[0]});
})

//페이지만 이동한다. board_write.ejs로 이동만 한다
app.use("/board/write", (request, response)=>{
    response.render("board/board_write.ejs");
})

//저장하기
app.use("/board/save", (request, response)=>{
    let title = request.body.title;
    let contents = request.body.contents;
    let writer = request.body.writer;
    let id = boardList.length+1;
    boardList.push({id:id, title:title, contents, writer:writer});
    response.redirect("/board/list"); //강제이동
})

app.use((request, response)=>{
    response.writeHead(200, {"Content-type":"text/html"});
    response.end("<h1>Express</h1>")
});

app.listen(4000,()=>{
    console.log("server start http://127.0.0.1:4000");
});


// boardList.js (라우팅    /board/list -> board.js 응답을 하고 데이터와 board_list.ejs를 묶어준다
//                      boardList데이터를 ejs엔진의 render 함수가 데이터와 ejs파일을 묶는다)
//                     express에서 view engine 이라는 환경변수에 ejs를 연결하면 response.render함수에 ejs 파일과 데이터를 묶는다
//                     response.render("board/board_list.ejs", {boardList:boardList, totalCnt:5});

// board_list.ejs 목록보기
// board_view.ejs 상세보기
// board_write.ejs 글쓰기     /board/write로 이동하고 등록 /save 가 되고 나면
// redirect로 이동해야 하는가                    