var express = require("express");
var router = express.Router();

// /api/insert 경로 라우터 연결
router.post("/insert", async function (req, res, next) {
    /* db와 연동해 계정 확인 */
    return res.json({
        Response: {
            result: true,
        }
    });
    

});

// /api/delete 경로 라우터 연결
router.post("/delete", async function (req, res, next) {
    /* db와 연동해 계정 확인 */
    return res.json({
        Response: {
            result: true,
        }
    });

});
// /api/update 경로 라우터 연결
router.post("/update", async function (req, res, next) {
    /* db와 연동해 계정 확인 */
    return res.json({
        Response: {
            result: true,
        }
    });
    

});
module.exports = router;
