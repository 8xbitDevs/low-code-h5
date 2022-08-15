import React, { useRef } from "react";
import { useEffect, useState } from "react";
import TemplateCard from "../../components/TemplateCard/TemplateCard";
import style from "./TemplateCentre.module.scss";
import axios from "axios";
import { http } from "../../utils/http";


function TemplateCentre() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchDatasSource() {
      const res = await http.get('/api/document/getList')
      console.log(res, "tem");
      setData(res);
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
            pic = {data.pic}
            description={data.describe}
            date={data.createTime}
          ></TemplateCard>
        </div>
      ))}
    </div>
  );
}

export default TemplateCentre;
