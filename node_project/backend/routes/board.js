let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");
let commonUtil = require("./commonUtil");


/* GET home page. */
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
  res.render("board/board_list.ejs", {session:req.session, boardList: results, totalCnt:totalCnt, pg:pg, paging:commonUtil.getPaging(pg, totalCnt)});
});

router.get("/view/:id", async function (req, res, next) {
  let id = req.params.id;
  let sql = `select id, title, writer, contents, 
                date_format(wdate, '%Y-%m-%d') wdate
               from tb_board
               where id = ${id}
               `;

  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_view.ejs", { boardList: results[0] });
});

router.get("/write", async function (req, res, next) {
  res.render("board/board_write.ejs");
})

router.post("/save", async function (req, res) {
  let title = req.body.title;
  let writer = req.body.writer;
  let contents = req.body.contents;

  let sql = `
             INSERT INTO tb_board(title, writer, contents, wdate)
             VALUES('${title}', '${writer}', '${contents}', NOW())
             `;
  let results = await commonDB.mysqlRead(sql, []);
  res.redirect("/board");
})

module.exports = router;
