const mongoCash = require("../../mongoose/react/mongoCash");
const { verifyToken } = require("../plugin/token.js")
const multer = require('multer')
const upload = require("../plugin/multerCode.js")
const fs = require("fs")

// 设置删除银行卡信息
exports.setDel = async (req, res) => {
    await mongoCash.deleteOne({ _id: req.body.id });
    res.send({ code: 3, value: '删除成功', data: '' })
}

// 设置银行卡执行状态
exports.setManage = async (req, res) => {
    let { id, bol } = req.body
    await mongoCash.updateOne({ _id: id }, { cashMake: bol });
    res.send({ code: 3, value: '修改成功', data: '' })
}

// 设置卡管理
exports.manageBlock = async (req, res) => {
    let result = await mongoCash.find().populate("cashAbout")
    res.send({ code: 3, value: '成功', data: result })
}

// 设置收款码
exports.setCode = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            return res.send({ value: "上传失败", code: 1, data: {} })
        } else if (err) {
            // An unknown error occurred when uploading.
            return res.send({ value: "未知失败", code: 1, data: {} })
        };
        let { cashCode } = req.body
        // 判断是否删除
        if (cashCode) {
            let bol = fs.existsSync("./public" + cashCode);
            if (bol) {
                fs.unlinkSync("./public" + cashCode)
            }
        }
        // 设置新图片地址
        let file = req.file.path.split("public")[1];
        res.send({ value: "上传成功", code: 3, data: file })
    })

}

// 设置银行卡信息
exports.setInfo = async (req, res) => {
    let { cashWay, cashAcc, cashName, cashBank, cashMake, cashInfo, cashCode } = req.body
    let bol = await mongoCash.findOne({ cashAcc });
    if (bol) return res.send({ value: "收款账号已存在", code: 0, data: "" });
    // 获取token
    let bearer = req.headers['authorization'].split(" ")[1];
    let { value } = await verifyToken(bearer);
    let result = await mongoCash.create({
        cashWay,    // 转账方式
        cashAcc,  // 收款账号
        cashName,  // 收款人姓名
        cashBank,   // 开户行
        cashMake,         // 是否还能使用
        cashInfo,  // 备注信息
        cashCode,  // 收款码地址
        cashAbout: value._id	// 管理员身份
    })
    res.send({ value: "添加成功", code: 1, data: result })
}