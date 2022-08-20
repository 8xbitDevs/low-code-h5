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
        url: "https://lowcode.wyy.ink/api/document/getList",
        headers: {
          'token':
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzA2YTkwMGFlZWQ0OTVlYTExZDc3NGE5OGM4MmU5OSIsImV4cCI6MTY5MjI0MDkxNn0.xlV9Zhm5SuylfeUtWwO8IPneV6XQTWjW3yw1YtmnucM",
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
            workId={data.id}
            cardname={data.title}
            pic={data.pic}
            description={data.describe}
            date={data.createTime}
          ></TemplateCard>
        </div>
      ))}
    </div>
  );
}

export default TemplateCentre;
