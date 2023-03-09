const mongoose = require("mongoose");

let schema = new mongoose.Schema({
	loginName: String,  // 管理员名
	loginPass: String,  // 管理员密码
	loginTime: String,   // 管理员创建时间
	loginRote: {				// 管理员身份
		type: mongoose.Schema.Types.ObjectId,
		ref: "mongoRole"
	},
	logonNick: String,   // 管理员描述
	loginEmail: String,
	loginPhone: String,
	LoginImg: {
		type: String,
		default: "/default/img/02.png"
	}
}, {
	versionKey: false
})

module.exports = mongoose.model("mongoLogin", schema)