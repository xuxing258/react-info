const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/rootReact")
	.then(() => {
		console.log("数据库链接成功")
	})
	.catch((err) => {
		console.log("数据库链接失败",err)
	})


