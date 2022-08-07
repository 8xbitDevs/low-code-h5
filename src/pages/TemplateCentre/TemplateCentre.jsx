import React, { useRef } from "react";
import { useEffect, useState } from "react";
import TemplateCard from "../../components/TemplateCard/TemplateCard";
import style from "./TemplateCentre.module.scss";
import axios from "axios";
function TemplateCentre() {
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
      console.log(res.data, "tem");
      setData(res.data);
    }
    fetchDatasSource();
  }, []);
  return (
    <div className={style.container}>
      {data?.documents?.map((data, index) => (
        <div className={style.card} key={index}>
          <TemplateCard
            key={data.id}
            cardname={data.title}
            description={data.describe}
            date={data.createTime}
          ></TemplateCard>
        </div>
      ))}
    </div>
  );
}

export default TemplateCentre;
