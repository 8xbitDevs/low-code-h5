import React, { useEffect,useState} from "react";
import style from "./WorksCard.module.scss";
import "../../media/icon/iconfont.css";
import { getKeyThenIncreaseKey } from "antd/lib/message";
import { http } from "../../utils/http";
import PubSub, { publish } from "pubsub-js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updatesaveData,
  updateMyWork,
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
     console.log(res);
    dispatch(
      updatesaveData({
        id: res.doc.id,
        html:res.doc.html
      })
    );  
    
    navigate("/editor");
    // console.log(res, "getWork");
  }

   
   // 预览文档
   async function preview() {
    const res = await http.get("/api/document/get", { params: { id: workId } });
    // console.log(data);
    dispatch(
      updatesaveData({
        id: res.doc.id,
        html:res.doc.html
      })
    );
    navigate("/preview");
    // console.log(res, "getWork");
  }
  

  // 删除文档
  async function del() {
    const res = await http.post("/api/document/delete", { id: workId });
    const newList = page.myWork.filter((item) => item.id != workId)
    dispatch(
      updateMyWork(newList)
    );
  }


  let [picUrl,setUrl] = useState("");
    // 得到对应id的url
    async function getUrl(workId){
      const res = await http.get("/api/document/getList");
      // 找到更新项目的id
      // console.log(workId)
      const List = res.documents
    
      // 根据更新项目的id找到对应的位置
      for(var i=0;i<List.length;i++){
        if(List[i].id===workId){
            setUrl(List[i].pic)
            break
        }
      }
      
    }
    getUrl(workId)
    // console.log(picUrl)
    // 处理图片地址
    picUrl='http://lowcode.wyy.ink//'+picUrl
    console.log(picUrl)


  return (
    <div className={style.container}>
      <div  className={style.img} style={{background: `url(${picUrl}) no-repeat`}}></div>
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
        <span title="预览" className="iconfont icon-preview" onClick={() => preview()}></span>
        <span title="删除" className="iconfont icon-shanchu" onClick={()=>del()}></span>
      </div>
    </div>
  );
};

export default WorksCard;
