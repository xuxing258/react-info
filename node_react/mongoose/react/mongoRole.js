const mongoose = require("mongoose");
// 角色权限
let schema = new mongoose.Schema({
	roleName: String,
	roleTime: Date,
	roleInfo: String,
	roleGrade: String,
	roleArray: Array,
	roleKeyArr: Array,
}, {
	versionKey: false
})

module.exports = mongoose.model("mongoRole", schema)