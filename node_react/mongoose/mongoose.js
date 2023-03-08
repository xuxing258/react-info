const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/rootReact")
	.then(() => {
		console.log("数据库链接成功")
	})
	.catch(() => {
		console.log("数据库链接失败")
	})


