import React, { useRef } from "react";
import { useEffect, useState } from "react";
import WorksCard from "../../components/WorksCard/WorksCard";
import style from "./MyWork.module.scss";
import "../../media/icon/iconfont.css";
import { Link } from "react-router-dom";
import axios from "axios";

function MyWork() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchDatasSource() {
      const res = await axios({
        method: "get",
        url: "http://lowcode.wyy.ink/api/document/getList",
        headers: {
          token: JSON.parse(localStorage.getItem("token")).value,
        },
      });
      console.log(res.data, "work");
      setData(res.data);
    }
    fetchDatasSource();
  }, []);
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
      {data?.documents?.map((item, index) => (
        <div key={index}>
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
