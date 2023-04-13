var express = require('express');
var router = express.Router();
let commonDB = require("./commonDB");

router.use('/list', async function(req, res, next) {
    let sql = `
    SELECT a.id, a.score_name, a.kor, a.eng, a.mat, DATE_FORMAT(a.wdate, '%Y-%m-%d')wdate
    FROM tb_score a
    `;
    
    let results = await commonDB.mysqlRead(sql,[]);
    res.json(results);
});

module.exports = router;