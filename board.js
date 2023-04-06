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
    // let sql = `insert `

    // let results = await commonDB.mysqlRead(sql, []);
    res.render("board/board_write.ejs");
})

module.exports = router;
