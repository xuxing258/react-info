const express = require("express");
const router = express.Router();
const {
    setInfo,
    setCode,
    manageBlock,
    setManage,
    setDel
} = require("../module/handler/handlerCash.js")


router.all("*", (req, res, next) => {
    if (req.path === "/code") {
        next();
        return
    }
    if (!req.headers['authorization']) return res.send({ code: 5, data: "", value: "" });
    next()
})

//  设置银行卡
router.post("/setInfo", setInfo)

//  设置银行卡
router.post("/code", setCode)

// 设置管理充值信息
router.get("/manage", manageBlock)

//  设置银行卡状态码
router.post("/mansta", setManage)

//  删除银行卡信息
router.post("/del", setDel)


module.exports = router




