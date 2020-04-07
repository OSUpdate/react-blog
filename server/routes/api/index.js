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
            const token = bcrypt.hashSync(id + Date.now()).replace(/\/|\./g,"");
            connect.query("update logged set token = ? where uid = ?", [token, id]);
            req.session.loginInfo = {
                token:token,
                id: id
            };
            connect.release();
            res.json({
                response:{
                    result: true,
                    token: token
                }
            });
        },
        _.catch(error=>{
            console.log(error);
            res.json({
                response:{
                    result:false,
                    error: "로그인에 실패했습니다"
                }
            });
        })
    );
    /* db와 연동해 계정 확인 */
    return res;

});

router.get("/account/logout", function (req, res, next) {
    _.go(
        req.session.destroy(()=>req.session),
        ()=>res.json({
            response: {
                result: true
            }
        }),
        _.catch((err) => {
            console.log(err);
            res.json({
                response: {
                    result: false,
                    error:"로그아웃에 실패했습니다"
                }
            });
        })
    );
    return res;
});
router.get("/account/getinfo", function (req, res, next) {
    req.session.loginInfo?res.json({
        response: {
            result: true,
            token: req.session.loginInfo.token
        }
    }):res.json({
        response: {
            result: false
        }
    });
    return res;
});
router.post("/account/signup", function (req, res, next) {
    const {id, password, check, email} = req.body.request.data;

    _.go(
        pool.getConnection(async conn => conn),
        (connect) => _.isEmpty(connect.query("select * from userinfo where id = ? or email = ?",[id, email])[0])?
            connect:(function(connect){
                connect.release();
                res.json({
                    response:{
                        result: false,
                        error: "이미 존재하는 계정입니다"
                    }
                });
                _.stop();
            })(connect),
        (connect) => {
            const token = bcrypt.hashSync(id + Date.now()).replace(/\/|\./g,"");
            connect.query("insert into userinfo (id, password, email) values(?, ?, ?)", [id, encrypt(password), email]);
            connect.query("insert into logged (token, uid) values(?, ?)", [token, id]);
            req.session.loginInfo = {
                token:token,
                id: id
            };
            connect.release();
            res.json({
                response:{
                    result: true,
                    token: token
                }
            });
        },
        _.catch(error=>{
            console.log(error);
            res.json({
                response:{
                    result:false,
                    error: "회원가입에 실패했습니다"
                }
            });
        })
    );
    /* db와 연동해 계정 확인 */
    return res;

});
module.exports = router;
