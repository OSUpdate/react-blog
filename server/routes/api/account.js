var express = require("express");
const mysql = require("mysql2/promise");
var crypto = require("crypto");
var bcrypt = require("bcryptjs");
const _ = require("partial-js");
var router = express.Router();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "blog",
    dateStrings: "date"
});
const encrypt = (value) => {
    return crypto.createHash("sha256")
        .update(value)
        .digest("hex");
};
router.post("/signin", async function (req, res, next) {
    _.go(
        _.mr(_.pick(req.body.request.data, ["id","password"]),await pool.getConnection(async conn => conn)),
        (data,connect)=> 
            data?(async (connect)=>_.mr(data,await connect.query("select * from userinfo where id = ? and password = ?",[data.id, encrypt(data.password)]),connect))(connect)
                :((connect)=>{
                    connect.release();
                    res.json({
                        response:{
                            result: false,
                            error: "아이디와 비밀번호를 확인해주세요"
                        }
                    });
                    return _.stop();
                })(connect),
        async (data,[row],connect) => {
            const token = bcrypt.hashSync(data.id + Date.now()).replace(/\/|\./g,"");
            await connect.query("update logged set token = ? where uid = ?", [token, data.id]);
            req.session.loginInfo = {
                token:token,
                id: data.id
            };
            connect.release();
            //console.log(data,"data",row,"row");
            !_.isEmpty(row)?res.json({
                response:{
                    result: true,
                    token: token
                }
            }):res.json({
                response:{
                    result: false
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
router.get("/logout", function (req, res, next) {
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
router.get("/getinfo", function (req, res, next) {
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

router.post("/signup", async function (req, res, next) {

    _.go(
        _.mr(_.pick(req.body.request.data, ["id","password","check","email"]),await pool.getConnection(async conn => conn)),
        (data,connect)=> 
            data?(async (connect)=>_.mr(data,await connect.query("select * from userinfo where id = ? or email = ?",[data.id, data.email]),connect))(connect):((connect)=>{
                connect.release();
                res.json({
                    response:{
                        result: false,
                        error:"이미 존재하는 계정입니다"
                    }
                });
                return _.stop();
            })(connect),
        async (data,[row],connect) => {
            const token = bcrypt.hashSync(data.id + Date.now()).replace(/\/|\./g,"");
            await connect.query("insert into userinfo (id, password, email) values(?, ?, ?)", [data.id, encrypt(data.password), data.email]);
            await connect.query("insert into logged (token, uid) values(?, ?)", [token, data.id]);
            req.session.loginInfo = {
                token:token,
                id: data.id
            };
            connect.release();
            !_.isEmpty(row)?res.json({
                response:{
                    result: true,
                    token: token
                }
            }):res.json({
                response:{
                    result: false,
                    error: "회원가입에 실패했습니다"
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
