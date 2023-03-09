const mongoose = require("mongoose");
// 角色权限
let schema = new mongoose.Schema({
	roleName: String,  // 角色名称
	roleTime: String,   // 时间
	roleInfo: String,  // 描述
	roleGrade: String,  // 等级
	roleArray: Array,   // 权限
	roleKeyArr: Array,  // 等级
}, {
	versionKey: false
})

module.exports = mongoose.model("mongoRole", schema)