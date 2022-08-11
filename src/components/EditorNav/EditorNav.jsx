import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./EditorNav.module.scss";
import Bar from "../Bar/Bar";
import PubSub from "pubsub-js";
import { useNavigate } from "react-router-dom";
import PubSub from "pubsub-js";
import SaveDataDialog from '../SaveDataDialog/SaveDataDialog'


const EditorNav = () => {
  const navigate = useNavigate()

  const [barlist, setBarList] = useState([
    {
      HREF:'https://github.com/8xbitDevs/low-code-h5',
      content: "Github",
      active: false,
    },
  ])

  // bar点击状态改变（单选）
  const changeStateBar = (clickIndex) => {
    const newBarlist = barlist.map((item, index) => {
      if (clickIndex === index) {
        return {
          ...item,
          active: !item.active,
        }
      } else {
        return {
          ...item,
          active: false,
        }
      }
    })
    setBarList(newBarlist)
  }

  function logout() {
    const localStorage = window.localStorage;
    const token = JSON.parse(localStorage.getItem("token"));
    localStorage.removeItem("token");
    navigate("/login");
  }

  const save =() => {
    PubSub.publish('save', 1)
  }

  return (
    <header className={style.container}>
      <Link to="/">
        <h3 className={style.logo}>8xbitsDevs</h3>
      </Link>
      <div className={style.barLayout}>
        {barlist.map((item, index) => {
          return (
            <Bar
              key={index}
              content={item.content}
              HREF={item.HREF}
              active={item.active}
              click={() => changeStateBar(index)}></Bar>
          )
        })}
        <button className={style.button} onClick={logout}>
          退出登录
        </button>
        <button className={style.button}>预览</button>
        <SaveDataDialog />
        <button className={style.button}>发布</button>
      </div>
    </header>
  )
}

export default EditorNav
