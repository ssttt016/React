var mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host:"127.0.0.1",
    user : "user01",
    password :"1234",
    database : "mydb",
    port : 3306
});

// 디비와 연결을 한다
pool.getConnection( (err, connection)=>{
    // 디비와 연결을 성공하면 매개변수로 전달된 함수가 호출된다.
    // err - 디비와 연결 실패 시
    if(err){
        console.log(err);
        return;
    }
    // 연결 성공 시 연결객체 connection을 전달한다.
    // 연결 객체
    console.log("connection success");


    new Promise( (resolve, reject)=>{
        sql = `
        insert into tb_board(title, writer, contents, wdate)
        values(?,?,?,now())
        `;
        let params = ['제목3', '장길산', '내용3']
        connection.query(sql, params, (err, rows)=>{
            if(err)
                {reject("db 오류");}
            else
                {resolve("success"); } //then 구문으로 이동한다.
        });
    })
    .then( (result)=>{

        sql = "select * from tb_board";
        connection.query(sql, (err, rows)=>{
            if(err){
                console.log("err");}
            console.log(rows);
        });
    })
    .catch( (error)=>{
        console.log(error);
    });

    
});
console.log("end");