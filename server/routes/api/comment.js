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
            console.log(data);
            return _.map(data,item=>{
                return {
                    num:item.num,
                    post:item.post,
                    insert_date:item.insert_date,
                    update_date:item.update_date,
                    nickname:item.nickname,
                    parent:item.parent,
                    comment:item.comment
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
    console.log(req.body.request.data);
    _.go(
        _.mr(req.body.request.data,await pool.getConnection(async conn => conn)),
        async (data, connect) => _.mr(await connect.query("insert into comments set insert_date = now(), seq = 1 ,?",{...data}),connect),
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
router.post("/update",function(req, res, next){
    return res;
});
router.post("/delete",function(req, res, next){
    return res;
});
router.post("/check",function(req, res, next){
    return res;
});

module.exports = router;
