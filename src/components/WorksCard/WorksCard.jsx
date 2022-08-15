import React, { useEffect, useState } from "react";
import style from "./WorksCard.module.scss";
import "../../media/icon/iconfont.css";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { http } from "../../utils/http";
import PubSub, { publish } from "pubsub-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updateSaveData,
  updateMyWork,
} from "../../store/page/pageSlice";

// 参数：img cardname description  date data （暂定）
const WorksCard = (props) => {
  const {
    cardname = "",
    description = "",
    date = "",
    workId = "",
    pic = "",
  } = props || {};
  const [picUrl, setUrl] = useState("");
  const navigate = useNavigate();
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  const getPicUrl = "http://lowcode.wyy.ink/" + pic;

  // 获取文档
  async function update() {
    const res = await http.get("/api/document/get", { params: { id: workId } });
    sessionStorage.setItem('id', workId)
    sessionStorage.setItem("title", res.doc.title);
    sessionStorage.setItem("describe", res.doc.describe);
    sessionStorage.setItem("designerHtml", res.doc.html)
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
    // console.log(res, "getWork");
  }

  // 预览文档
  async function preview() {
    const res = await http.get("/api/document/get", { params: { id: workId } });
    sessionStorage.setItem('html', res.doc.html)
    // console.log(data);
    dispatch(
      updateSaveData({
        id: res.doc.id,
      })
    );
    window.open('/preview')
    // console.log(res, "getWork");
  }

  // 删除文档
  async function del() {
    const res = await http.post("/api/document/delete", { id: workId });
    const newList = page.myWork.filter((item) => item.id != workId);
    dispatch(updateMyWork(newList));
  }

  // // 得到对应id的url
  // async function getUrl(workId) {
  //   const res = await http.get("/api/document/getList");
  //   // 找到更新项目的id
  //   // console.log(workId)
  //   const List = res.documents;

  //   // 根据更新项目的id找到对应的位置
  //   for (var i = 0; i < List.length; i++) {
  //     if (List[i].id === workId) {
  //       setUrl(List[i].pic);
  //       break;
  //     }
  //   }
  // }

  // getUrl(workId);
  // // console.log(picUrl)
  // // 处理图片地址
  // console.log(picUrl);

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
          className="iconfont icon-bianjishuru-xianxing"
          onClick={() => update()}
        ></span>
        <span
          title="预览"
          className="iconfont icon-preview"
          onClick={() => preview()}
        ></span>
        <span
          title="删除"
          className="iconfont icon-shanchu"
          onClick={() => del()}
        ></span>
      </div>
    </div>
  );
};

export default WorksCard;
