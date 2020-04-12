var express = require("express");
var comment = require("./comment");
var post = require("./post");
var board = require("./board");
var account = require("./account");
var router = express.Router();

// /api/post 경로 라우터 연결
router.use("/post", post);

// /api/board 경로 라우터 연결
router.use("/board", board);

// /api/comment 경로 라우터 연결
router.use("/comment", comment);

// /api/comment 경로 라우터 연결
router.use("/account", account);

module.exports = router;
