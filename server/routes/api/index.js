var express = require("express");
var router = express.Router();
var crypto = require("crypto");
var bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");
const _ = require("partial-js");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "blog"
});
const encrypt = (value) => {
    return crypto.createHash("sha256")
        .update(value)
        .digest("hex");
};

// /api/insert 경로 라우터 연결
router.post("/insert", function (req, res, next) {
    /* db와 연동해 계정 확인 */
    return res.json({
        Response: {
            result: true,
        }
    });

});

// /api/delete 경로 라우터 연결
router.post("/delete", function (req, res, next) {
    /* db와 연동해 계정 확인 */
    return res.json({
        Response: {
            result: true,
        }
    });

});
// /api/update 경로 라우터 연결
router.post("/update", function (req, res, next) {
    /* db와 연동해 계정 확인 */
    return res.json({
        Response: {
            result: true,
        }
    });
    

});
router.post("/account/signin", async function (req, res, next) {
    const {id, password} = req.body.request.data;
    _.go(
        pool.getConnection(async conn => conn),
        (connect) => _.isEmpty(connect.query("select * from userinfo where id = ? and password = ?",[id, encrypt(password)])[0])?
            connect:(function(connect){
                connect.release();
                res.json({
                    response:{
                        result: false,
                        error: "아이디와 비밀번호를 확인해주세요"
                    }
                });
                _.stop();
            })(connect),
        (connect) => {
            const token = bcrypt.hashSync(req.body.request.id + Date.now()).replace(/\//g,"");
            connect.query("update logged set token = ? where uid = ?", [token, req.body.request.id]);
            req.session.loginInfo = {
                token:token,
                id: req.body.request.id
            };
            connect.release();
            res.json({
                response:{
                    result: true,
                    token: token
                }
            });
        }
    );
    /* db와 연동해 계정 확인 */
    return res;

});
router.post("/account/signup", function (req, res, next) {
    /* db와 연동해 계정 확인 */
    return res.json({
        Response: {
            result: true,
        }
    });

});
module.exports = router;
