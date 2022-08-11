import React, { useRef } from "react";
import { useEffect, useState } from "react";
import WorksCard from "../../components/WorksCard/WorksCard";
import style from "./MyWork.module.scss";
import "../../media/icon/iconfont.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { http } from "../../utils/http";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updatesaveData,
  updateMyWork,
} from "../../store/page/pageSlice";
import { initializeConnect } from "react-redux/es/components/connect";

function MyWork() {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  const init = () => {
    dispatch(updatesaveData({id:'',html:''}));
    console.log(page.saveData,123)

}

  useEffect(() => {
    async function fetchDatasSource() {
      const res = await http.get("/api/document/getList");
      console.log(res.documents)
      dispatch(updateMyWork(res.documents));
    }
    fetchDatasSource();
  }, []);
  return (
    <div className={style.container}>
      <Link to={"/editor"}>
        <div className={style.cardcontainer} onClick={()=>init()}>
          <img src="src\media\icon\tianjia.svg" />
          <div className={style.option}>
            <p>创建新作品</p>
          </div>
        </div>
      </Link>
      {page.myWork?.map((item, index) => (
        <div className={style.card} key={index}>
          <WorksCard
            workId={item.id}
            cardname={item.title}
            description={item.describe}
            date={item.createTime}
          ></WorksCard>
        </div>
      ))}
    </div>
  );
}
export default MyWork;
