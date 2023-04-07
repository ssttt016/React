let express = require("express");
let router = express.Router();
let commonDB = require("./commonDB");

/* GET home page. */
router.get("/", async function (req, res, next) {
  let sql = `select id, title, writer, contents, 
               date_format(wdate, '%Y-%m-%d') wdate
               from tb_board
               `;

  let results = await commonDB.mysqlRead(sql, []);
  res.render("board/board_list.ejs", { boardList: results });
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
