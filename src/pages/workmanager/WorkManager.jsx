import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import Sider from "../../components/Sider/Sider";
import WmPannel from "../../components/WmPannel/WmPannel";
import style from "./WorkManager.module.scss";

const index = () => {
  return (
    <div className={style.container}>
      <NavigationBar></NavigationBar>
      <div className={style.down}>
        <Sider></Sider>
        <WmPannel></WmPannel>
      </div>
    </div>
  );
};

export default index;
