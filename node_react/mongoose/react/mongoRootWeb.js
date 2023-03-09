const mongoose = require("mongoose");
// 前端用户账号

let schema = new mongoose.Schema({
  webPhone: String,  // 用户名
  webPass: String,  // 用户密码
  webTime: String,   // 用户创建时间
  webProxyBol: Boolean, // 用户是否是代理
  webStatusBol: {  // 用户账号状态
    type: Boolean,
    default: true
  },
  webCreate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "mongoLogin"
  },
}, {
  versionKey: false
})

module.exports = mongoose.model("mongoRootWeb", schema)