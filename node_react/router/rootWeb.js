const express = require("express");
const router = express.Router();
const {
  addMamber,
  getInfo,
  deleteInfo,
  setStatus,
  getPages,
  getsearch
} = require("../module/handler/hnadlerRootWeb.js")


router.all("*",(req,res,next)=>{
	if(!req.headers['authorization']) return res.send({code:5,data:"",value:""});
	next()
})


//账号登录
router.post("/add", addMamber)

// 获取会员账号数据
router.get("/info", getInfo)


//账号删除
router.post("/delete", deleteInfo)

// 账号状态
router.post("/status",setStatus)

// 账号分页
router.post("/pages",getPages)

// 搜索账号
router.post("/search",getsearch)


module.exports = router




