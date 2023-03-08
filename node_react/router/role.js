const express = require("express");
const router = express.Router();
const {
	setName,
	getRole,
	setPermissions,
	getRoleAoount
} =  require("../module/handleRole")

// 添加角色路由
router.post("/setname",async (req,res)=>{
	let result = await setName(req.body,req.session.loginNameSession);
	res.send(result)
})

// 获取角色路由
router.get("/getrole",async (req,res)=>{
	let result = await getRole();
	res.send(result)
})

// 设置权限路由
router.post("/permissions",(req,res)=>{
	setPermissions(req.body);
	res.send({value:"权限设置成功",code:1,data:{}})
})

// 添加角色路由
router.get("/getroleaoount",async (req,res)=>{
 	let result = await getRoleAoount();
 	res.send({value:"权限设置成功",code:1,data:result})
 })
 
 
 
module.exports = router