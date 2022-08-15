import React from "react";
import style from "./TemplateCard.module.scss";
import "../../media/icon/iconfont.css";

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

  return (
    <div className={style.container}>
      <div className={style.imgwrapper}>
        <img className={style.img} src={`${getPicUrl}`} alt="" />
      </div>
      <div id={workId} className={style.inf}>
        <p>名称：{cardname}</p>
        <p>描述：{description}</p>
        <p>时间：{date}</p>
      </div>
      <div className={style.option}>
        <span title="编辑" className="iconfont icon-tianjia"></span>
        <span title="预览" className="iconfont icon-preview"></span>
      </div>
    </div>
  );
};

export default TemplateCard;
