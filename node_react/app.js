const express = require("express");
const app = express();

// 配置文件
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static("./public"));
// 设置session

// 配置账号路由
app.use("/root", require("./router/root.js"))
app.use("/web", require("./router/rootWeb.js"))
app.use("/cash", require("./router/cash.js"))



// 链接数据库
require("./mongoose/mongoose.js")


app.listen("8000", () => {
	console.log("8000端口")
})