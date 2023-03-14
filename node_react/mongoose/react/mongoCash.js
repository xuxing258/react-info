const mongoose = require("mongoose");

// 设置收款信息
let schema = new mongoose.Schema({
    cashWay: String,    // 转账方式
    cashAcc: String,  // 收款账号
    cashName: String,  // 收款人姓名
    cashBank: String,   // 开户行
    cashMake: {         // 是否还能使用
        type: Boolean,
        default: true,
    },  
    cashCode: String,   // 收款码地址
    cashInfo: String,  // 备注信息
    cashAbout: {				// 管理员身份
		type: mongoose.Schema.Types.ObjectId,
		ref: "mongoLogin"
	},
}, {
    versionKey: false
})

module.exports = mongoose.model("mongoCash", schema)