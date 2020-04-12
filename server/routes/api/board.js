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
    dateStrings: "date",
    connectionLimit:10
});
const per = 10;

router.get("/get", async function(req, res, next){
    _.go(
        await pool.getConnection(async conn => conn),
        async (connect) => _.mr(await connect.query("select board_name,orderNo from board order by orderNo"),connect),
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
        }),
        _.catch(error => console.log("get : ",error))
    );
    return res;
});

router.get("/:bnum", async function(req, res, next){
    const page = req.query.page?req.query.page:1;
    const start = (page-1)*per;
    const bname = req.params.bnum?req.params.bnum:1;
    _.go(
        await pool.getConnection(async conn => conn),
        async (connect) => _.mr(await connect.query("select * from post where board_num = ? order by num desc limit ?,?",[bname,start,per]),connect),
        ([row],connect) =>_.isEmpty(row)?((connect)=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })(connect):(async (connect)=>{
            return _.mr(row,await connect.query("select count(*) from post where board_num = ?",[bname]),connect);
        })(connect),
        (arr,[row], connect)=>{
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
        (data,total) => {
            res.json({
                response:{
                    result: true,
                    data:{
                        post:data,
                        total:total
                    }
                }
            });
        },
        _.catch((error)=>console.log("Get BoardList Error: ",error))
    );
    return res;
});
router.get("/:bnum/:num", async function(req, res, next){
    _.go(
        await pool.getConnection(async conn => conn),
        (connect) => _.mr(connect.query("select *,(select num from post where board_num = ? and num > ? order by num limit 1) as next,(select num from post where board_num = ? and num < ? order by num desc limit 1) as prev from post where board_num = ? and num = ? order by num",[req.params.bnum, req.params.num,req.params.bnum, req.params.num,req.params.bnum, req.params.num]),connect),
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
                update:item.update_date,
                next:item.next,
                prev:item.prev
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


router.post("/update", async function (req, res, next) {
    /* db와 연동해 계정 확인 */
    _.go(
        _.mr(_.pick(req.body.request.data, ["token","orderNo","title"]),await pool.getConnection(async conn => conn)),
        (data, connect) => data?(async (connect)=>_.mr(await connect.query("update board set board_name = ? where orderNo = ?",[data.title,data.orderNo]),connect))(connect):(()=>{
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
router.post("/insert", async function (req, res, next) {
    /* db와 연동해 계정 확인 */
    _.go(
        _.mr(_.pick(req.body.request.data, ["token","title"]),await pool.getConnection(async conn => conn)),
        (data,connect)=>
            data?(async (connect)=>_.mr(await connect.query("insert into board set ?",{board_name:data.title}),connect))(connect):((connect)=>{
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


module.exports = router;
