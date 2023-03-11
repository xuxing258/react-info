import { configureStore } from "@reduxjs/toolkit";
// 引入用户仓库
import useUserInfo from "./storeUser";
// 引入其他仓库
import useOther from "./storeOther"

// 创建仓库
export default configureStore({
  reducer: {
    useUserInfo,
    useOther
  }
})