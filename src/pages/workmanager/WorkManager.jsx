import React from "react";
import { Outlet } from "react-router-dom";
import MyWork from "../MyWork/MyWork";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Sider from "../../components/Sider/Sider";
import style from "./WorkManager.module.scss";

const WorkManager = () => {
  return (
    <div className={style.container}>
      <NavigationBar></NavigationBar>
      <div className={style.down}>
        <Sider></Sider>
        <div className={style.wpcontainer}>
          {/* <MyWork></MyWork> */}
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default WorkManager;
