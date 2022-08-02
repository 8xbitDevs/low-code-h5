import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./EditorNav.module.scss";
import Bar from "./Bar/Bar";

const EditorNav = () => {
  const [barlist, setBarList] = useState([
    {
      content: "Gitee",
      active: false,
    },
    {
      content: "Github",
      active: false,
    },
  ]);

  // bar点击状态改变（单选）
  const changeStateBar = (clickIndex) => {
    const newBarlist = barlist.map((item, index) => {
      if (clickIndex === index) {
        return {
          ...item,
          active: !item.active,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });
    setBarList(newBarlist);
  };

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
              active={item.active}
              click={() => changeStateBar(index)}
            ></Bar>
          );
        })}
        <button>预览</button>
        <button>保存</button>
        <button>发布</button>
      </div>
    </header>
  );
};

export default EditorNav;
