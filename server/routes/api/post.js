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


// 페이지당 게시글 수
const per = 10;

router.get("/get", async function(req, res, next){
    const page = req.query.page?req.query.page:1;
    const start = (page-1)*per;
    _.go(
        await pool.getConnection(async conn => conn),
        async (connect) => _.mr(await connect.query("select * from post order by num desc limit ?,?",[start,per]),connect),
        ([row],connect) => _.isEmpty(row)?(()=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })():(async (connect)=>{
            return _.mr(row,await connect.query("select count(*) from post"),connect);
        })(connect),
        (arr,[row],connect)=> {
            connect.release();
            return _.mr(_.map(arr,(item,index)=>{
                return {
                    num:item.num,
                    title:item.title,
                    bnum:item.board_num,
                    board:item.board,
                    hit:item.hits,
                    insert:item.insert_date,
                    update:item.update_date
                };
            }),row[0]["count(*)"]);
        },
        (data,total) => res.json({
            response:{
                result: true,
                data:{
                    post:data,
                    total:total
                }
            }
        })
    );
    return res;
});
router.get("/:num", async function(req, res, next){
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

router.post("/insert", async function(req, res, next){
    _.go(
        _.mr(_.pick(req.body.request.data, ["token","title","content","board_num","board"]),await pool.getConnection(async conn => conn)),
        (data,connect)=>
            data?(async (connect)=>_.mr(await connect.query("insert into post set insert_date = now(), ?",{
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

router.get("/hit/:num", async function(req, res, next){
    _.go(
        _.mr(req.params.num,await pool.getConnection(async conn => conn)),
        async (data, connect) => _.mr(await connect.query("update post set hits = hits+1 where num = ?",[data]),connect),
        ([row],connect) =>_.isEmpty(row)?((connect)=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })(connect):(async (connect)=>{
            connect.release();
            res.json({
                response:{
                    result: true
                }
            });
        })(connect)
    );
    return res;
});
router.post("/delete", async function(req, res, next){
    _.go(
        _.mr(req.body.request.data.list,await pool.getConnection(async conn => conn)),
        (list,connect) =>{
            const del = _.map(list,async item=>{
                return await connect.query("delete from post where num = ? and board_num = ?",[item.num,item.bnum]);
            });
            return _.mr(del,connect);
        },
        (result,connect) => {
            result?(()=>{
                res.json({
                    response:{
                        result: true
                    }
                });
            })():(()=>{
                connect.release();
                res.json({
                    response:{
                        result: false
                    }
                });
            })();
        }
    );
    return res;
});
module.exports = router;
