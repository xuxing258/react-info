const jwt = require('jsonwebtoken');  // 使用模块  生成token
const SECRET_KEY = 'kite1874'    // 自定义钥匙名称 加密

// 设置token
const createToken = (info) => {
	let token = "Bearer " + jwt.sign(info, SECRET_KEY, { expiresIn: '3days' })
	return token
}

// 解析token
const verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jwt.verify(token, SECRET_KEY, (error, result) => {
			if (error) {
				return false
			} else {
				resolve(result)
			}
		})
	})
}

module.exports = {
	createToken,
	verifyToken
}
