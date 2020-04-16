const express = require("express");
const comment = require("./comment");
const post = require("./post");
const board = require("./board");
const account = require("./account");
const visit = require("./visit");
const router = express.Router();

// /api/post 경로 라우터 연결
router.use("/post", post);

// /api/board 경로 라우터 연결
router.use("/board", board);

// /api/comment 경로 라우터 연결
router.use("/comment", comment);

// /api/comment 경로 라우터 연결
router.use("/account", account);

router.use("/visit", visit);
module.exports = router;
