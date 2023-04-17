let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");
//npm install murter : nodejs에서 파일 업로드를 담당
//https://songhee96.tistory.com/27  참고사이트
let multer = require("multer");
let path = require("path"); //파일이나 디스크 관리 모듈, 주로 경로
//파일을 업로드하는데 필요한 정보를 설정해야 한다.
let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, "uploads/board"); //파일 업로드 경로지정 // cb - 파일업로드 시 이 함수가 호출된다.
    },
    filename : function(req,file,cb){
        //new Date => 현재 날짜와 시간, 분초까지 알아온다. =>valueOf() 문자열로 변경
        // 본래 파일명이 중복날 가능성이 있어서 별도의 파일명을 부여한다
        // 확장자는 본래파일명으로 해야 한다.
        // path.extname(파일명) - 파일의 확장자를 가져온다.
        // 두 번째 인자인 file이 업로드 되는 파일인데 이 파일의 originalfilename에 원래 파일명이 있다.
        let newFilename = new Date().valueOf() + path.extname(file.originalname);
        cb(null, newFilename);
    }
});

//제한
const limits = {
    fieldNameSize: 200, //필드명 사이즈 최대값
    filedSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB)
    fields: 2, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
    fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
    files: 10, //multipart 형식 폼에서 파일 필드 최대 개수 (기본 값 무제한)
  };
  
  
  //확장자 필터
  const fileFilter = (req, file, callback) => {
    const typeArray = file.mimetype.split("/");
    const fileType = typeArray[1];
  
    if (fileType == "jpg" || fileType == "jpeg" || fileType == "png") {
      callback(null, true);
    } else {
      return callback(null, false);
    }
  };
let upload = multer({storage:storage,
    // limits: limits,     //업로드 제한
    // fileFilter: fileFilter,   //파일 확장자 제한
});


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
         ,A.filename, A.filelink
         FROM (
         SELECT A.id, A.title, A.writer, A.wdate, C.username,A.filename,A.filelink, @rownum:=@rownum+1 num
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
               A.filename, A.filelink,
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

// upload.single("file") - 파일업로드 부분만 중간에 따로 처리한다.
// upload.single(폼태그에서 file속성의 name이 file이다)
// <input type="file" name="file"/>  이떄 name 속성값이다
// 파일 전송 시 fomr태그에 enctype="form-data/multipart" 속성이 반드시 있어야 한다.
// ejs나 jsp같은데서 사용
// ajax로 전송할때는 FormData 라는 객체를 이용해서 보내야 한다 ******
// $.ajax나 axios 모던스크립트 fatch라는 ajax모듈 추가되었음
router.post("/write", upload.single("file"), async function(req,res,next){
    checkInfos = [
        {key:"title", type:"str", range:200},
        {key:"writer", type:"str", range:40},
        {key:"contents", type:"str", range:-1}
    ]

    let file = req.file; // body가 아님
    console.log(file.originalname);
    console.log(file.filename);

    // 수행결과값이 0이면 문제없는거고 다른 숫자가 온다 오류임
    insertInfo = commonUtil.checkInfo(req, checkInfos);
    if(insertInfo["result"]!=0){
        res.json(insertInfo);
        return;
    }

    let title = req.body.title;
    let writer = req.body.writer;
    let contents = req.body.contents;
    let filename = file.filename;
    let linkname = "uploads/board/"+filename;

    let sql = `select count(*) cnt from tb_member where userid='${writer}'`;
    results = await commonDB.mysqlRead(sql);
    if(results[0]["cnt"]==0){
        res.json({result:"fail", msg:"해당하는 아이디가 없습니다."});
        return;
    }

    // http://127.0.0.1:9090/uploads/board/1681695486185.png
    sql = `insert into tb_board (title, writer, contents, wdate, filename, filelink) values('${title}','${writer}','${contents}', NOW()
    ,'${filename}', '${linkname}')`;
    await commonDB.mysqlRead(sql, []);
    res.json({"result":"success"});

    // //에러처리에 필요함
    // //아이디와 이름은 중복금지
    // resultCod="0";
    // message = "";
})


module.exports = router;