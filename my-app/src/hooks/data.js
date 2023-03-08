import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

// manage管理用户组件正则
export const manageRegExp = {
  loginName: [{ required: true, pattern: /^[-_a-zA-Z0-9]{3,12}$/ }],
  logonNick: [{ required: true, pattern: /^^[\u4e00-\u9fa5_a-zA-Z0-9]{3,12}$/, message: "3-12位任意字", }],
  loginPass: [{ required: true, pattern: /^[-_a-zA-Z0-9]{8,18}$/, message: "填写数字字母8-16位", }],
  loginPhone: [{ required: true, pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, message: "未填写正确", }],
  loginEmail: [{ required: true, pattern: /^[a-zA-Z0-9]{1,11}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}$/, message: "未填写正确", }],
  loginRote: [{ validator: (_, val) => { if (val !== "请选择管理权限") { return Promise.resolve() } else { return Promise.reject("需要进行选择") } } }]
}

// 导航数据
export const arr = [
  {
    name: "首页", title: "首页", iocn: "", key: "/home/child",
    children: [{ title: 'leaf', key: '0-0-0-0', }, { title: 'leaf', key: '0-0-0-1', },]
  },
  { name: "后台管理员", title: "后台管理员", iocn: "", key: "/home/root", },
  { name: "会员", title: "会员", iocn: "", key: "/home/member", },
  { name: "资金", title: "资金", iocn: "", key: "0-4", },
  { name: "统计", title: "统计", iocn: "", key: "0-5", },
  { name: "用户代理", title: "用户代理", iocn: "", key: "0-6", },
]
// 导航数据
export const useNavData = () => {
  return arr.map((key) => ({ key: key.key, label: key.name, }));
}

// 侧边数据
export const useSideData = () => {
  return [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });
}

