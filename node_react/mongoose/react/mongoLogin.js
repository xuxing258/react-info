const mongoose = require("mongoose");

let schema = new mongoose.Schema({
	loginName: String,  // 用户名
	loginPass: String,  // 用户密码
	loginTime: String,   // 用户创建时间
	loginRote: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "mongoRole"
	},
	logonNick: String,
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