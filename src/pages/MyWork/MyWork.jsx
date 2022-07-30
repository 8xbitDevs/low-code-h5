import React, { useRef } from "react";
import { useEffect, useState } from "react";
import WorksCard from "../../components/WorksCard/WorksCard";
import style from "./MyWork.module.scss";
import "../../media/icon/iconfont.css";
import { Link } from "react-router-dom";

function MyWork() {
  return (
    <div className={style.container}>
      <Link to={"/editor"}>
        <div className={style.cardcontainer}>
          <img src="src\media\icon\tianjia.svg" />
          <div className={style.option}>
            <p>创建新作品</p>
          </div>
        </div>
      </Link>

      <WorksCard
        cardname="示例"
        description="这是一个示例"
        date="2022/07/30"
      ></WorksCard>
    </div>
  );
}

export default MyWork;
