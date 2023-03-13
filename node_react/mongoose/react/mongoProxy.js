const mongoose = require("mongoose");
// 用户及代理用户资金管理

let schema = new mongoose.Schema({
  proxyDivide: String,  // 代理分成比例
  proxyInvite: Array, // 邀请人手机号码
  webStatusBol: {  // 用户账号状态
    type: Boolean,
    default: true
  },
}, {
  versionKey: false
})

module.exports = mongoose.model("mongoRootWeb", schema)