const { createToken, verifyToken } = require("../plugin/token.js")
const mongoRootWeb = require("../../mongoose/react/mongoRootWeb.js")
const sd = require('silly-datetime');


// 获取前端账号数据
exports.getInfo = async (req, res) => {
  let data = await mongoRootWeb.find({})
  res.send({ code: 3, value: '成功', data: data })
}

// 添加前端用户
exports.addMamber = async (req, res) => {
  let { loginPhone, password, remember } = req.body;
  if (!req.headers['authorization']) return res.send({ value: "账户信息失效", code: 4, data: "" });
  let bol = await mongoRootWeb.findOne({ webPhone: loginPhone });
  if (bol) return res.send({ value: "手机号码已注册", code: 0, data: "" });
  let bearer = req.headers['authorization'].split(" ")[1];
  let { value } = await verifyToken(bearer);
  // 创建
  let data = await mongoRootWeb.create({
    webPhone: loginPhone,  // 用户名
    webPass: password,  // 用户密码
    webTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm'),   // 用户创建时间
    webProxyBol: remember, // 用户是否是代理
    webCreate: value._id,
  })
  res.send({ code: 1, value: '添加成功', data: data })
}