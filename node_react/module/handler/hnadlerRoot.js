const mongoLogin = require("../../mongoose/react/mongoLogin")
const mongoRole = require("../../mongoose/react/mongoRole")
const { createToken, verifyToken } = require("../plugin/token.js")
const multer = require('multer')
const upload = require("../plugin/multer.js")
const fs = require("fs")
const sd = require('silly-datetime');

// 删除用户账号
exports.removeUser = async (req, res) => {
  let { id } = req.body;
  await mongoLogin.deleteOne({ _id: id });
  res.send({ value: "删除成功", code: 3, data: "" })
}

// 搜索获取数据
exports.getSearch = async (req, res) => {
  let { value } = req.body
  let data = await mongoLogin.find({ $or: [{ loginName: { $regex: value } }, { logonNick: { $regex: value } }] }, {}).populate("loginRote");
  let len = data.length
  res.send({ value: "获取成功", code: 3, data: data, len })
}

// 分页获取数据
exports.getPageUser = async (req, res) => {
  let num = 10 * req.query.key - 10
  let data = await mongoLogin.find({}, {}, { sort: { _id: -1 }, limit: 10, skip: num }).populate("loginRote");
  res.send({ value: "获取成功", code: 3, data: data })
}

// 获取所有管理员数据
exports.getManageinfo = async (req, res) => {
  let bol = await mongoLogin.find({}, {}, { sort: { _id: -1 } }).populate("loginRote");
  let len = bol.length;
  let data = bol.slice(0, 10);
  res.send({ value: "获取成功", code: 3, data: data, len })
}


// 添加管理员
exports.setManage = async (req, res) => {
  let { loginName, logonNick, loginPass, loginPhone, loginEmail, loginRote } = req.body;
  let bol = await mongoLogin.findOne({ loginName: loginName });
  if (bol) return res.send({ value: "用户已存在", code: 0, data: "" });
  let bolPhobe = await mongoLogin.findOne({ loginPhone: loginPhone });
  if (bolPhobe) return res.send({ value: "手机号码存在", code: 0, data: "" });
  let data = await mongoLogin.create({
    loginName: loginName,  // 用户名
    loginPass: loginPass,  // 用户密码
    loginTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm'),   // 用户创建时间
    logonNick: logonNick,
    loginEmail: loginEmail,
    loginRote: loginRote,
    loginPhone: loginPhone
  })
  let datas = await mongoLogin.findById(data._id).populate("loginRote");
  res.send({ value: "添加成功", code: 3, data: datas })
}

// 删除角色信息
exports.rmoveRoteInfo = async (req, res) => {
  let { id } = req.body;
  await mongoRole.deleteOne({ _id: id });
  res.send({ value: "获取成功", code: 3, data: "bol" })
}

// 获取角色信息
exports.getMSg = async (req, res) => {
  let bol = await mongoRole.find();
  res.send({ value: "获取成功", code: 3, data: bol })
}

// 设置角色
exports.setRote = async (req, res) => {
  let { values, treeKeyArr, accountArr, id } = req.body;
  if (id) {
    await mongoRole.updateOne({ _id: id }, {
      roleName: values.roteName,
      roleInfo: values.info,
      roleGrade: values.grade,
      roleKeyArr: treeKeyArr,
      roleArray: accountArr
    });
    let data = await mongoRole.findOne({ _id: id });
    return res.send({ value: "修改成功", code: 4, data: data });
  }
  // 添加角色
  let roteBol = await mongoRole.findOne({ roleName: values.roteName })
  if (roteBol) return res.send({ value: "角色名称存在", code: 0, data: "" });
  let data = await mongoRole.create({
    roleName: values.roteName,
    roleTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm'),
    roleInfo: values.info,
    roleGrade: values.grade,
    roleKeyArr: treeKeyArr,
    roleArray: accountArr
  })
  res.send({ value: "用户创建成功", code: 3, data: data })
}

// 修改用户头像
exports.changeAvatar = async (req, res) => {
  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.send({ value: "上传失败", code: 1, data: {} })
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.send({ value: "未知失败", code: 1, data: {} })
    };
    let id = req.body.id;
    // 删除图片
    let bol = await mongoLogin.findById(id);
    if (bol.LoginImg !== "/default/img/02.png") {
      fs.unlinkSync("./public" + bol.LoginImg)
    }
    // 设置新图片地址
    let file = req.file.path.split("public")[1];
    await mongoLogin.updateOne({ _id: id }, {
      LoginImg: file,
    });

    bol.LoginImg = file;
    let token = createToken({ name: "token", value: bol })
    // Everything went fine.
    res.send({ value: "上传成功", code: 3, data: bol, token })
  })
}

// 修改change信息
exports.changePerson = async (req, res) => {
  let { logonNick, loginEmail, loginPass, loginPhone, loginName } = req.body
  if (loginPass.length < 6) return res.send({ value: "密码必须是6-16位", code: 0, data: "" });
  await mongoLogin.updateOne({ loginName: loginName }, {
    loginName: loginName,  // 用户名
    loginPass: loginPass,  // 用户密码
    logonNick: logonNick,
    loginEmail: loginEmail,
    loginPhone: loginPhone,
  });
  let bol = await mongoLogin.findOne({ loginName: loginName });
  let token = createToken({ name: "token", value: bol })
  res.send({ value: "修改成功", code: 1, data: bol, token })
}

// 设置免登录 token
exports.noLogin = async (req, res) => {
  if (!req.headers['authorization']) return res.send({ value: "账户信息失效", code: 4, data: "" });
  let bearer = req.headers['authorization'].split(" ")[1];
  let data = await verifyToken(bearer)
  res.send({ value: "", code: 3, data: data.value })
}

// 设置管理登录
exports.requireLogin = async (req, res) => {
  let { username, password } = req.body;
  let bol = await mongoLogin.findOne({ loginName: username });
  if (!bol) return res.send({ value: "账号不存在", code: 0, data: {} });
  if (bol.loginPass != password) return res.send({ value: "密码错误", code: 0, data: {} });
  let tokens = await mongoLogin.findOne({ loginName: username });
  let token = createToken({ name: "token", value: tokens });
  // let data = await mongoLogin.create({
  //   loginName: "root",  // 用户名
  //   loginPass: "123123",  // 用户密码
  //   loginTime: sd.format(new Date(), 'YYYY-MM-DD HH:mm'),   // 用户创建时间
  //   logonNick: "root",
  //   loginEmail: "1163034081@qq.com",
  //   // loginRote: "管理员",
  //   loginPhone: "15116406518"
  // })

  res.send({ value: "登录成功", code: 3, data: bol, token: token });

}

