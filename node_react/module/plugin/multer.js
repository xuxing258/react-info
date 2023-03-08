const path = require("path")
const multer = require("multer")
let urlInfo = path.resolve(__dirname, "../../public/Img")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, urlInfo)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + file.originalname)
  }
})

module.exports = multer({ storage: storage }).single('file')