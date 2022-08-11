import React from "react";
import style from "./WorksCard.module.scss";
import "../../media/icon/iconfont.css";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { http } from "../../utils/http";
import PubSub from "pubsub-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updateCurrentComponentAttributes,
  updateCurrentComponentIdType,
} from "../../store/page/pageSlice";

// 参数：img cardname description  date data （暂定）
const WorksCard = (props) => {
  const {
    cardname = "",
    description = "",
    date = "",
    workId = "",
  } = props || {};

  const navigate = useNavigate();
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  // 获取文档
  async function update() {
    const res = await http.get("/api/document/get", { params: { id: workId } });
    const data = { html: res.doc.html, id: res.doc.id };
    // console.log(data);
    PubSub.publish("update", data);
    navigate("/editor");
    // console.log(res, "getWork");
  }

  return (
    <div className={style.container}>
      <div className={style.img}></div>
      <div id={workId} className={style.inf}>
        <p>名称：{cardname}</p>
        <p>描述：{description}</p>
        <p>时间：{date}</p>
      </div>
      <div className={style.option}>
        <span
          title="编辑"
          className="iconfont icon-bianjishuru-xianxing"
          onClick={() => update()}
        ></span>
        <span title="预览" className="iconfont icon-preview"></span>
        <span title="删除" className="iconfont icon-shanchu"></span>
      </div>
    </div>
  );
};

export default WorksCard;
