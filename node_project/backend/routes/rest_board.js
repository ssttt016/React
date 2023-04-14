let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");


/* GET home page. */
// rest_board/list/1
router.get("/list/:pg", async function (req, res, next) {
  let pg = parseInt(req.params.pg);
  // pg=1, 0부터 시작  (pg-1)*10
  // pg=2, 10부터 시작 (2-1)*10
  // pg=3, 20부터 시작 (3-1)*10

  let sql = `SELECT count(*) cnt
             FROM tb_board A
             LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
             LEFT OUTER JOIN tb_member C ON A.writer=C.userid
            `;

  let results = await commonDB.mysqlRead(sql, []);
  let totalCnt = results[0]["cnt"];

  sql = `SELECT A.id, A.title, A.writer, A.num, A.username, date_format(A.wdate, '%Y-%m-%d') wdate 
         FROM (
         SELECT A.id, A.title, A.writer, A.wdate, C.username, @rownum:=@rownum+1 num
         FROM tb_board A 
         LEFT OUTER JOIN (SELECT @rownum:=0) B on 1=1
         LEFT OUTER JOIN tb_member C ON A.writer=C.userid
         ORDER BY id DESC
         )A
         LIMIT ${(pg-1)*10}, 10
         `;

  results = await commonDB.mysqlRead(sql, []);
  console.log(results);
  res.json({boardList: results, totalCnt:totalCnt, pg:pg}); //응답완료
  // 한 함수내에서 res.json 호출하고 또 다시 res.send나 render나 json 호출 못 한다
});

router.get("/view/:id", async function (req, res, next) {
    let id = req.params.id;
    let sql = `SELECT A.id, A.title, A.writer, date_format(A.wdate, '%Y-%m-%d') wdate, 
               (select username from tb_member B where A.writer = B.userid) username
               from tb_board A
               where id=${id}
               `;
    // subquery : select(결과셋이 하나 또는 0일때 가능),
    //from:인라인뷰,
    //where 절에서는 드물다(책은 여기만)
    //조인 => 서브쿼리(캐쉬가 된다) => 함수
    // nested loop join => for문 돌려서 조인을 한다. 10이전 버전
    // hash join => 양쪽 테이블의 join컬럼을 기준으로 해쉬테이블을 만들어 조인한다. (엄청 빠름)
    // 선형검색(n번비교), 이진검색(데이터가 순서대로 있을때), 해쉬검색(젤빠름)

    let results = await commonDB.mysqlRead(sql,[]);
    if(results.length===0){
        res.json({result:"fail", msg:"해당하는 데이터를 찾을 수 없습니다."});
        return;
    }
    res.json({result:"success", msg:"", boardData:results[0]});
});


//{title:"제목",writer:"test",contents:"내용"}
//
router.post("/save", async function (req, res, next) {
    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;

    let sql = `
              INSERT INTO tb_board (title, writer, contents, wdate)
              VALUES ('${title}','${writer}','${contents}', NOW())
    `;

    let results = await commonDB.mysqlRead(sql, []);
    if(results.length===0){
        res.json({result:"fail", msg:"등록실패"})
    }
    res.json({result:"success", msg:"등록성공"})
})


router.post("/write", async function(req,res,next){
    checkInfos = [
        {key:"title", type:"str", range:200},
        {key:"writer", type:"str", range:40},
        {key:"contents", type:"str", range:-1}
    ]

    // 수행결과값이 0이면 문제없는거고 다른 숫자가 온다 오류임
    insertInfo = commonUtil.checkInfo(req, checkInfos);
    if(insertInfo["result"]!=0){
        res.json(insertInfo);
        return;
    }

    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;

    let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
    results = await commonDB.mysqlRead(sql);
    if(results[0]["cnt"]==0){
        res.json({result:"fail", msg:"해당하는 아이디가 없습니다."});
        return;
    }

    sql = `insert into tb_board (title, writer, contents, wdate) values('${title}','${writer}','${contents}', NOW())`;
    await commonDB.mysqlRead(sql, []);
    res.json({"result":"success"});

    // //에러처리에 필요함
    // //아이디와 이름은 중복금지
    // resultCod="0";
    // message = "";
})


module.exports = router;
