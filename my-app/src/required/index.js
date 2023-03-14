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



// addMammder组件设置web用户账号
export const addMamber = (value) => createAxios("post", url + "web/add", value);

// MemberList获取会员信息
export const getMamber = () => createAxios("get", url + "web/info");
// MemberLists删除会员信息
export const removeMamber = (value) => createAxios("post", url + "web/delete", value);
// MemberList会员使用状态
export const statusMamber = (value) => createAxios("post", url + "web/status", value);
// MemberList获取分页会员数据
export const getPangMamber = (value) => createAxios("post", url + "web/pages", value);
// MemberList搜索获取数据
export const getSearch = (value) => createAxios("post", url + "web/search", value);
// MemberList改变代理状态数据
export const proxyMamber = (value) => createAxios("post", url + "web/proxy", value);
// MemberList下载表格数据
export const getTabel = () => createAxios("get", url + "web/install");

// memberChange组件修改会员数据
export const changeMamberInfo = (value) => createAxios("post", url + "web/change", value);

// Proxy组件获取 代理信息
export const getProxyInfo = () => createAxios("get", url + "web/data");
// Proxy组件获取 搜索代理账号
export const getSearchProxy = (value) => createAxios("post", url + "web/find", value);
// Proxy组件获取 搜索代理账号
export const setProxyRebates = (value) => createAxios("post", url + "web/revates", value);

// RechargeCash组件设置银行卡信息
export const setCashWay = (value) => createAxios("post", url + "cash/setInfo", value);
// RechargeCash组件删除多余缓存图片
export const remoevImg = (value) => createAxios("post", url + "cash/remove", value);

// RechargeManage组件管理充值信息
export const manageRecharge = () => createAxios("get", url + "cash/manage");
// RechargeManage组件修改卡状态
export const manageStatus = (value) => createAxios("post", url + "cash/mansta", value);
// RechargeManage删除卡信息
export const ReachageBlock = (value) => createAxios("post", url + "cash/del", value);