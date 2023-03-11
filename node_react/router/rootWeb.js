const express = require("express");
const router = express.Router();
const {
  addMamber,
  getInfo,
  deleteInfo,
  setStatus,
  getPages,
  getsearch,
  proxyMember,
  changeMamberInfo,
  getInstall,
  getData,
  findProxy
} = require("../module/handler/hnadlerRootWeb.js")


router.all("*", (req, res, next) => {
  if (!req.headers['authorization']) return res.send({ code: 5, data: "", value: "" });
  next()
})


//账号登录
router.post("/add", addMamber)

// 获取会员账号数据
router.get("/info", getInfo)


//账号删除
router.post("/delete", deleteInfo)

// 账号状态
router.post("/status", setStatus)

// 账号分页
router.post("/pages", getPages)

// 搜索账号
router.post("/search", getsearch)

// 修改代理状态
router.post("/proxy", proxyMember)

// 修改代理状态
router.post("/change", changeMamberInfo)

// 下载账号数据
router.get("/install", getInstall)

// 搜索代理信息
router.get("/data", getData)

// 获取代理账号数据
router.post("/find", findProxy)

module.exports = router




