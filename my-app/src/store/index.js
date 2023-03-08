import { configureStore } from "@reduxjs/toolkit";
// 引入用户仓库
import useUserInfo from "./storeUser";

// 创建仓库
export default configureStore({
  reducer: {
    useUserInfo
  }
})