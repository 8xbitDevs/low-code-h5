import React from "react";
import style from "./TemplateCard.module.scss";
import "../../media/icon/iconfont.css";
import { http } from "../../utils/http";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updateSaveData,
  updateMyWork,
} from "../../store/page/pageSlice";

// 参数：img cardname description  date data(暂定)
const TemplateCard = (props) => {
  const {
    cardname = "",
    description = "",
    date = "",
    workId = "",
    pic = "",
  } = props || {};
  const getPicUrl = "http://lowcode.wyy.ink/" + pic;
  const navigate = useNavigate();
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  // 获取文档
  async function update() {
    let res = await axios({
      method: "get",
      url: "http://lowcode.wyy.ink/api/document/get",
      headers: {
        'token':
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzA2YTkwMGFlZWQ0OTVlYTExZDc3NGE5OGM4MmU5OSIsImV4cCI6MTY5MjI0MDkxNn0.xlV9Zhm5SuylfeUtWwO8IPneV6XQTWjW3yw1YtmnucM",
      },
      params: { id: workId },
    });
    res = res.data
    sessionStorage.setItem("id", workId);
    sessionStorage.setItem("title", res.doc.title);
    sessionStorage.setItem("describe", res.doc.describe);
    sessionStorage.setItem("designerHtml", res.doc.html);
    console.log(
      sessionStorage.getItem("title"),
      sessionStorage.getItem("describe")
    );
    dispatch(
      updateSaveData({
        id: res.doc.id,
      })
    );
    navigate("/editor");
  }

  // 预览文档
  async function preview() {
    let res = await axios({
      method: "get",
      url: "http://lowcode.wyy.ink/api/document/get",
      headers: {
        'token':
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzA2YTkwMGFlZWQ0OTVlYTExZDc3NGE5OGM4MmU5OSIsImV4cCI6MTY5MjI0MDkxNn0.xlV9Zhm5SuylfeUtWwO8IPneV6XQTWjW3yw1YtmnucM",
      },
      params: { id: workId },
    });
    res = res.data
    sessionStorage.setItem("html", res.doc.html);
    // console.log(data);
    dispatch(
      updateSaveData({
        id: res.doc.id,
      })
    );
    window.open("/preview");
  }

  return (
    <div className={style.container}>
      <div className={style.imgwrapper}>
        <img className={style.img} src={`${getPicUrl}`} alt="" />
      </div>
      <div id={workId} className={style.inf}>
        <p className={style.p}>名称：{cardname}</p>
        <p className={style.p}>描述：{description}</p>
        <p className={style.p}>时间：{date}</p>
      </div>
      <div className={style.option}>
        <span
          title="编辑"
          className="iconfont icon-tianjia"
          onClick={() => update()}
        ></span>
        <span
          title="预览"
          className="iconfont icon-preview"
          onClick={() => preview()}
        ></span>
      </div>
    </div>
  );
};

export default TemplateCard;
