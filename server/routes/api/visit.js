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
router.get("/get/chart", async function(req,res,next){
    _.go(
        await pool.getConnection(async conn => conn),
        async (connect) => _.mr(await connect.query("select distinct(date_format(visit_date,'%m-%d')) as mon,count(*) as cnt from visit where visit_date BETWEEN DATE_ADD(NOW(),INTERVAL -1 MONTH ) AND NOW() group by mon"),connect),
        ([row],connect) => _.isEmpty(row)?(()=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })():(async (connect)=>{
            connect.release();
            return row;
        })(connect),
        (data) => {
            const mon = _.pluck(data,"mon");
            const cnt = _.pluck(data,"cnt");
            res.json({
                response:{
                    result: true,
                    data:{
                        mon,
                        cnt
                    }
                }
            });
        }
       
    );
    return res;
});
router.get("/get/list", async function(req,res,next){
    _.go(
        await pool.getConnection(async conn => conn),
        async (connect) => _.mr(await connect.query("select ip,count(distinct ip) as cnt from visit where date_format(visit_date,'%Y-%m-%d') = curdate() group by ip"),connect),
        ([row],connect) => _.isEmpty(row)?(()=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })():(async (connect)=>{
            connect.release();
            return row;
        })(connect),
        (data) => {
            const ip = _.map(data,item=>{
                return {
                    title:item.ip
                };
            });
            const cnt = _.pluck(data,"cnt");
            res.json({
                response:{
                    result: true,
                    data:{
                        ip,
                        cnt
                    }
                }
            });
        }
       
    );
    return res;
});
router.post("/set", async function(req, res, next){
    const ip = req.headers["x-forwarded-for"] ||  req.connection.remoteAddress;
    const page = req.body.request.data.page;
    _.go(
        await pool.getConnection(async conn => conn),
        async (connect) => _.mr(await connect.query("insert into visit (ip, visit_date, page) values (?,now(), ?)",[ip,page]),connect),
        ([row],connect) => _.isEmpty(row)?(()=>{
            connect.release();
            res.json({
                response:{
                    result: false
                }
            });
            return _.stop();
        })():(async (connect)=>{
            connect.release();
            return res.json({
                response:{
                    result: true
                }
            });
        })(connect),
       
    );
    return res;
});

module.exports = router;
