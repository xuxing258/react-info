import createAxios from "./axios";
// 设置axios请求地址配置
export const url = "/api/";

// 添加天气接口
export const weatherURL = "https://v0.yiketianqi.com/api?unescape=1&version=v91&appid=43656176&appsecret=I42og6Lm&ext=&cityid=&city=%E8%A1%A1%E9%98%B3";

// Login组件设置登录
export const requireLogin = (value) => createAxios("post", url + "root/login", value);

// Home组件免登录
export const noLogin = () => createAxios("get", url + "root/dismiss");

// Person组件设置个人信息
export const chagnePerson = (value) => createAxios("post", url + "root/change", value);

// Rote组件设置角色信息
export const createRote = (value) => createAxios("post", url + "root/rote", value);
// Rote组件获取角色信息
export const getRoteInfo = () => createAxios("get", url + "root/msg");
// Rote组件删除角色信息
export const rmoveRoteInfo = (value) => createAxios("post", url + "root/remove", value);


// Manage组件设置添加用户
export const setManageInfo = (value) => createAxios("post", url + "root/manage", value);
// Manage组件获取所有用户信息
export const getManageInfo = () => createAxios("get", url + "root/manageinfo");
// Manage组件通过分页获取数据
export const getPageUser = (value) => createAxios("get", url + "root/page", value);
// Manage组件搜索用户数据
export const searchUser = (value) => createAxios("post", url + "root/search", value);
// Manage组件删除用户数据
export const removeUser = (value) => createAxios("post", url + "root/delete", value);



