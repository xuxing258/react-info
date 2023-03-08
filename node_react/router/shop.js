const express = require("express");
const router = express.Router();
const multer = require('multer')
const path = require("path")
const fs = require("fs")
const { 
	addShop,
	getAddShop,
	removeCongirm,
	chengShop,
	childShop,
	setFrom,
	getFrom,
	getPageFrom,
	getSearchClass
} = require("../module/handleShop.js")
const upload  = require("../module/plugin/multer")

// 添加分类路由
router.post("/addshop",async (req,res)=>{
	let resutl = await addShop(req.body,req.session.loginNameSession)
	res.send(resutl)
})

// 获取一级路由 
router.get("/getshop",async (req,res)=>{
	let resutl = await getAddShop()
	res.send(resutl)
})

// 删除分类
router.post("/congirm",(req,res)=>{
	removeCongirm(req.body)
	res.send( {value:"删除成功",code:1,data:{}})
})

// 修改分类名
router.post("/chengshop",async (req,res)=>{
	let result = await  chengShop(req.body)
	res.send(result)
})

// 获取子类路由
router.post("/childShop",async (req,res) => {
	let result = await  childShop(req.body)
	res.send({value:"获取成功",code:1,data:result})
})

// 上传图片
router.post("/picture",(req,res)=>{
	upload(req, res, function (err) {
	    if (err instanceof multer.MulterError) {
	      // A Multer error occurred when uploading.
		  return 	res.send({value:"失败",code:1,data:{}})
	    } else if (err) {
	      // An unknown error occurred when uploading.
		  return 	res.send({value:"失败",code:1,data:{}})
	    }
	    // Everything went fine.
		res.send({value:"上传成功",code:1,data:{
			imgURL:path.join("shopImg",req.file.filename),
			pathURL:req.file.path
		}})
	  })
	
})

// 删除图片
router.post("/setimg",(req,res)=>{
	fs.unlinkSync(req.body.pathURL)
	res.send({value:"删除成功",code:1,data:{}})
})

// 存储数据
router.post("/setfrom",async (req,res)=>{
	let result = await setFrom(req.body, req.session.loginNameSession)
	res.send(result)
})
// 获取所有分类数据
router.get('/getfrom',async (req,res)=>{
	let result = await getFrom(req.session.loginNameSession)
	res.send(result)
})
// 获取数据
router.post('/getpagefrom',async (req,res)=>{
	let result = await getPageFrom(req.body,req.session.loginNameSession)
	res.send(result)
})

// 选择性获取数据
 router.post("/searchclass",async (req,res)=>{
	let result = await getSearchClass(req.body,req.session.loginNameSession)
	res.send(result)
 })


module.exports = router