import axios from "axios";
import { message } from "antd";

// 配置请求拦截
axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    token && (config.headers.Authorization = token);
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

async function createAxios(TYPE, URL, DATA) {
  let type = TYPE.toUpperCase()
  return await new Promise((res, rej) => {
    handlerAxios(type, URL, DATA, res, rej);
  });
}

function handlerAxios(type, URL, DATA, res, rej) {
  axios({
    method: type,
    url: URL,
    data: type === "POST" ? DATA : {},
    params: type === "GET" ? DATA : {},
  }).then(({ data }) => {
    // eslint-disable-next-line 
    switch (data.code) {
      case 0:
        message.error({
          content: data.value + '',
          duration: 1
        })
        break;
      case 1:
        message.info({
          content: data.value + '',
          duration: 1
        })
        break;
    }
    res(data)
  }).catch((err) => {
    rej(err)
  })
}

export default createAxios;
