const express = require("express");
const router = express.Router();
const {
	requireLogin,
	noLogin,
	changePerson,
	changeAvatar,
	setRote,
	getMSg,
	rmoveRoteInfo,
	setManage,
	getManageinfo,
	getPageUser,
	getSearch,
	removeUser
} = require("../module/handler/hnadlerRoot.js")


//账号登录
router.post("/login", requireLogin)

//免登录
router.get("/dismiss", noLogin)

// 修改个人信息
router.post("/change", changePerson)

// 上传头像
router.post("/avatar", changeAvatar)

// 设置角色
router.post("/rote", setRote)

// 获取角色数据
router.get("/msg", getMSg)

// 删除角色数据
router.post("/remove", rmoveRoteInfo)

// 添加管理员
router.post("/manage", setManage)

// 获取管理数据
router.get("/manageinfo", getManageinfo)

// 分页管理数据
router.get("/page", getPageUser)

// 获取搜索数据
router.post("/search", getSearch)

// 删除管理数据
router.post("/delete", removeUser)

module.exports = router




