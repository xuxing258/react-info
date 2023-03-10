const { createToken, verifyToken } = require("../plugin/token.js")
const mongoRootWeb = require("../../mongoose/react/mongoRootWeb")
const sd = require('silly-datetime');

// 获取搜索数据
exports.getsearch = async (req, res)=>{
  let {select,val} = req.body;
  let selectValue = ''
  switch (select) {
    case 1:
      // 手机号码
      selectValue = "webPhone"
      break;
    case 2:
      // 身分证
      selectValue = "webID"
      break;
    case 3:
      // 姓名
      selectValue = "webName"
      break;
  }
  let data = await mongoRootWeb.find({[selectValue]:{$regex: val}});
  let len = data.length;
  res.send({ value: "获取成功", code: 3, data: data,len })
}


// 分页获取数据
exports.getPages = async (req, res)=>{
  let num = 10 * req.body.key - 10
  let data = await mongoRootWeb.find({}, {}, { sort: { _id: -1 }, limit: 10, skip: num })
  res.send({ value: "获取成功", code: 3, data: data })
}

// 修改账号状态
exports.setStatus = async (req, res)=>{
  let {id,bol} = req.body;
  await mongoRootWeb.updateOne({_id:id},{webStatusBol:bol})
  res.send({ code: 3, value: '修改成功', data: '' })
}

// 删除前端数据
exports.deleteInfo = async (req, res)=>{
  let {id} = req.body;
  await mongoRootWeb.deleteOne({_id:id})
  res.send({ code: 3, value: '删除成功', data: '' })
}


// 获取前端账号数据
exports.getInfo = async (req, res) => {
  let result = await mongoRootWeb.find({},{},{sort:{_id:-1}})
  let len = result.length;
  let data = result.slice(0, 10);
  res.send({ code: 3, value: '成功', data: data,len })
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