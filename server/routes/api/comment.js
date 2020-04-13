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
router.get("/get/:num",async function(req, res, next){
    _.go(
        await pool.getConnection(async conn => conn),
        async (connect) => _.mr(await connect.query("select * from comments where post = ? order by IF(ISNULL(parent), num, parent), seq",[req.params.num]),connect),
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
        (data)=>{
            return _.map(data,(item,index)=>{
                return {
                    index:index,
                    num:item.num,
                    post:item.post,
                    insert_date:item.insert_date,
                    update_date:item.update_date,
                    nickname:item.nickname,
                    parent:item.parent,
                    content:item.comment,
                    commentContent:"",
                    commentTitle:"",
                    commentPassword:"",
                    group_no:item.group_no,
                    passwordInput:"",
                    reply:false,
                    modify:false,
                    checkPassword:false

                };
            });
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
router.post("/write",async function(req, res, next){
    _.go(
        _.mr(req.body.request.data,await pool.getConnection(async conn => conn)),
        async (data, connect) => _.mr(
            data.group_no?
                await connect.query(`insert into comments set insert_date = now(), seq = (select max(seq) from comments ALIAS_FOR_SUBQUERY where post = ${req.body.request.data.post} and group_no = ${req.body.request.data.group_no} order by seq desc limit 1)+1 ,?`,{...data}):
                await connect.query(`insert into comments set insert_date = now(), seq = 1 ,group_no=(select if((select max(group_no) from comments ALIAS_FOR_SUBQUERY where post=${data.post}),(select max(group_no) from comments ALIAS_FOR_SUBQUERY where post=${data.post})+1,1)),?`,{
                    parent:null,
                    comment:data.comment,
                    post:data.post,
                    nickname:data.nickname,
                    password:data.password,
                }),connect
        ),
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
            res.json({
                response:{
                    result: true
                }
            });
            return;
        })(connect)
    );
    return res;
});
router.post("/check",async function(req, res, next){
    _.go(
        _.mr(req.body.request.data,await pool.getConnection(async conn => conn)),
        async (data, connect) => _.mr(await connect.query("select * from comments where num = ? and password = ?",[data.num,data.password]),connect
        ),
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
            res.json({
                response:{
                    result: true
                }
            });
            return;
        })(connect)
    );
    return res;
});
router.post("/update",async function(req, res, next){
    _.go(
        _.mr(req.body.request.data,await pool.getConnection(async conn => conn)),
        async (data, connect) => _.mr(data,await connect.query("select * from comments where num = ?",[data.num]),connect),
        (data,[row],connect) =>_.isEmpty(row)?((connect)=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })(connect):(async (connect)=>{
            return _.mr(await connect.query("update comments set comment=? where num = ?",[data.content,data.num]),connect);
        })(connect),
        ([row],connect)=>{
            connect.release();
            _.isEmpty(row)?(()=>{
                res.json({
                    response:{
                        result: false
                    }
                });
                return _.stop();
            })():res.json({
                response:{
                    result: true
                }
            });
        }
    );
    return res;
});
router.post("/delete",async function(req, res, next){
    _.go(
        _.mr(req.body.request.data,await pool.getConnection(async conn => conn)),
        async (data, connect) => _.mr(data,await connect.query("select * from comments where num = ?",[data.num]),connect),
        (data,[row],connect) =>_.isEmpty(row)?((connect)=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })(connect):(async (connect)=>{
            return _.mr(await connect.query("delete from comments where num = ?",[data.num]),connect);
        })(connect),
        ([row],connect)=>{
            connect.release();
            _.isEmpty(row)?(()=>{
                res.json({
                    response:{
                        result: false
                    }
                });
                return _.stop();
            })():res.json({
                response:{
                    result: true
                }
            });
        }
    );
    return res;
});
router.post("/check",function(req, res, next){
    return res;
});

module.exports = router;
