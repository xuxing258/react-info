import { noLogin } from "@src/required/index.js"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import HomeChild from "@src/components/home/HomeChild.jsx"
import { useNavigate } from "react-router-dom"
import "@src/assets/css/home.sass"


export default function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // 设置免登录
  useEffect(() => {
    noLogin().then((data) => {
      if (data.code === 3) return dispatch({ "type": "useUserInfo/changeInfo", val: data.data });
      if (data.code === 0) return navigate("/");
    })
    // eslint-disable-next-line
  }, []);

  return (
    <div className='home'>
      <HomeChild />
    </div>
  )
}


