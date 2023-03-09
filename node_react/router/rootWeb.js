const express = require("express");
const router = express.Router();
const {
  addMamber,
  getInfo
} = require("../module/handler/hnadlerRootWeb.js")


//账号登录
router.post("/add", addMamber)

// 获取会员账号数据
router.get("/info", getInfo)

module.exports = router




