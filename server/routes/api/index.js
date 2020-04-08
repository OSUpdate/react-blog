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
    database: "blog",
    dateStrings: "date"
});
const encrypt = (value) => {
    return crypto.createHash("sha256")
        .update(value)
        .digest("hex");
};
router.get("/board/get", function(req, res, next){
    _.go(
        pool.getConnection(async conn => conn),
        (connect) => _.mr(connect.query("select board_name,orderNo from board order by orderNo"),connect),
        ([row],connect) => !_.isEmpty(row)?
            ((connect)=>{
                connect.release();
                return row;
            })(connect):(()=>{
                connect.release();
                res.json({
                    response:{
                        result: false
                    }
                });
                return _.stop();
            })(),
        _.map((item,index)=>{
            return {
                num:index,
                title:item.board_name,
                orderNo:item.orderNo,
                update:false,
                new:false
            };
        }),
        (data) => res.json({
            response:{
                result: true,
                data:data
            }
        })
    );
    return res;
});
router.post("/board/update", async function (req, res, next) {
    /* db와 연동해 계정 확인 */
    _.go(
        _.mr(_.pick(req.body.request.data, ["token","orderNo","title"]),pool.getConnection(async conn => conn)),
        (data, connect) => data?((connect)=>_.mr(connect.query("update board set board_name = ? where orderNo = ?",[data.title,data.orderNo]),connect))(connect):(()=>{
            res.json({
                response:{
                    result: false,
                }
            });
            return _.stop();
        })(),
        (row,connect) => {
            connect.release();
            row?res.json({
                response:{
                    result: true
                }
            }):res.json({
                response:{
                    result: false
                }
            });
        },
        _.catch(error=>console.log(error))
    );
    return res;
    

});
router.post("/board/insert", async function (req, res, next) {
    /* db와 연동해 계정 확인 */
    _.go(
        _.mr(_.pick(req.body.request.data, ["token","title"]),pool.getConnection(async conn => conn)),
        (data,connect)=>
            data?((connect)=>_.mr(connect.query("insert into board set ?",{board_name:data.title}),connect))(connect):((connect)=>{
                connect.release();
                res.json({
                    response:{
                        result: false,
                    }
                });
                return _.stop();
            })(connect),
        (row,connect) => {
            connect.release();
            row?res.json({
                response:{
                    result: true
                }
            }):
                res.json({
                    response:{
                        result: false
                    }
                });
        },
        _.catch(error=>console.log(error))
    );
    return res;
    

});
router.post("/account/signin", async function (req, res, next) {
    _.go(
        _.mr(_.pick(req.body.request.data, ["id","password"]),pool.getConnection(async conn => conn)),
        (data,connect)=> 
            data?((connect)=>_.mr(data,connect.query("select * from userinfo where id = ? and password = ?",[data.id, encrypt(data.password)]),connect))(connect)
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
        (data,[row],connect) => {
            const token = bcrypt.hashSync(data.id + Date.now()).replace(/\/|\./g,"");
            connect.query("update logged set token = ? where uid = ?", [token, data.id]);
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
router.post("/post/insert", async function(req, res, next){
    _.go(
        _.mr(_.pick(req.body.request.data, ["token","title","content","board_num","board"]),pool.getConnection(async conn => conn)),
        (data,connect)=>
            data?((connect)=>_.mr(connect.query("insert into post set insert_date = now(), ?",{
                title:data.title,
                board:data.board,
                board_num:data.board_num,
                content:data.content,
            }),connect))(connect):((connect)=>{
                connect.release();
                res.json({
                    response:{
                        result: false,
                    }
                });
                return _.stop();
            })(connect),
        (row,connect) => {
            connect.release();
            row?res.json({
                response:{
                    result: true
                }
            }):
                res.json({
                    response:{
                        result: false
                    }
                });
        },
        _.catch(error=>console.log(error))
    );
    return res;
});
router.get("/post/:num", async function(req, res, next){
    _.go(
        _.mr(req.params.num,pool.getConnection(async conn => conn)),
        (data,connect)=> 
            data?((connect)=>_.mr(connect.query("select * from post where num = ?",[data]),connect))(connect)
                :((connect)=>{
                    connect.release();
                    res.json({
                        response:{
                            result: false,
                            error: "존재하지 않는 게시글입니다"
                        }
                    });
                    return _.stop();
                })(connect),
        ([row],connect) => {
            connect.release();
            !_.isEmpty(row)?res.json({
                response:{
                    result: true,
                    data:{
                        title:row[0].title,
                        num:row[0].board_num,
                        bnum:row[0].num,
                        board:row[0].board,
                        content:row[0].content,
                        hit:row[0].hits,
                        insert:row[0].insert_date,
                        update:row[0].update_date
                    }
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
    return res;
});
router.post("/post/update", async function(req, res, next){
    return res;
});
router.post("/post/delete", async function(req, res, next){
    return res;
});
router.get("/board/:bnum/:num", async function(req, res, next){
    _.go(
        pool.getConnection(async conn => conn),
        (connect) => _.mr(connect.query("select * from post where board_num = ? and num = ? order by num",[req.params.bnum, req.params.num]),connect),
        ([row],connect) =>_.isEmpty(row)?((connect)=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })(connect):((connect)=>{
            connect.release();
            return row[0];
        })(connect),
        (item)=>{
            return {
                num:item.num,
                title:item.title,
                bnum:item.board_num,
                content:item.content,
                board:item.board,
                hit:item.hits,
                insert:item.insert_date,
                update:item.update_date
            };
        },
        (data) => res.json({
            response:{
                result: true,
                data:data
            }
        })
    );
    return res;
});
router.get("/board/:bnum", async function(req, res, next){
    _.go(
        pool.getConnection(async conn => conn),
        (connect) => _.mr(connect.query("select num,title,board,hits,insert_date,update_date from post where board_num = ? order by num",[req.params.bnum]),connect),
        ([row],connect) =>_.isEmpty(row)?((connect)=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })(connect):((connect)=>{
            connect.release();
            return row;
        })(connect),
        _.map((item,index)=>{
            return {
                num:item.num,
                title:item.title,
                bnum:item.board_num,
                board:item.board,
                hit:item.hits,
                insert:item.insert_date,
                update:item.update_date
            };
        }),
        (data) => res.json({
            response:{
                result: true,
                data:data
            }
        })
    );
    return res;
});
router.get("/board/test",(req, res, next)=>{
    console.log("/board/test");
    res.json({
        result:true
    });
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

router.post("/account/signup", async function (req, res, next) {

    _.go(
        _.mr(_.pick(req.body.request.data, ["id","password","check","email"]),pool.getConnection(async conn => conn)),
        (data,connect)=> 
            data?((connect)=>_.mr(data,connect.query("select * from userinfo where id = ? or email = ?",[data.id, data.email]),connect))(connect):((connect)=>{
                connect.release();
                res.json({
                    response:{
                        result: false,
                        error:"이미 존재하는 계정입니다"
                    }
                });
                return _.stop();
            })(connect),
        (data,[row],connect) => {
            const token = bcrypt.hashSync(data.id + Date.now()).replace(/\/|\./g,"");
            connect.query("insert into userinfo (id, password, email) values(?, ?, ?)", [data.id, encrypt(data.password), data.email]);
            connect.query("insert into logged (token, uid) values(?, ?)", [token, data.id]);
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
