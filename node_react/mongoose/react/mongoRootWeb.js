const mongoose = require("mongoose");
// 前端用户账号

let schema = new mongoose.Schema({
  webPhone: String,  // 用户名手机
  webPass: String,  // 用户密码
  webTime: String,   // 用户创建时间
  webProxyBol: Boolean, // 用户是否是代理
  webStatusBol: {  // 用户账号状态
    type: Boolean,
    default: true
  },
  webID: String,   // 用户身份证
  webName: String,   // 用户姓名
  webCreate: {    // 谁创建的
    type: mongoose.Schema.Types.ObjectId,
    ref: "mongoLogin"
  },
  webInfo: String, // 用户备注
  webCode: String, // 用户绑定码
  webInfo: String, // 用户备注
  webProxyName: String, // 代理商
  payPass: String, // 支付密码
  webRebates: {  // 代理金额信息
    type: mongoose.Schema.Types.ObjectId,
    ref: "mongoProxy"
  },
}, {
  versionKey: false
})

module.exports = mongoose.model("mongoRootWeb", schema)