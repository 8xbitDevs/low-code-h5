import React from 'react'
import style from './WorksCard.module.scss'
import '../../media/icon/iconfont.css'
import { getKeyThenIncreaseKey } from 'antd/lib/message'

// 参数：img cardname description  date data （暂定）
const WorksCard = (props) => {
  const { cardname, description, date, key } = props
  return (
    <div className={style.container}>
      <div className={style.img}></div>
      <div id={key} className={style.inf}>
        <p>名称：{cardname}</p>
        <p>描述：{description}</p>
        <p>时间：{date}</p>
      </div>
      <div className={style.option}>
        <span
          title="编辑"
          className="iconfont icon-bianjishuru-xianxing"></span>
        <span title="预览" className="iconfont icon-preview"></span>
        <span title="删除" className="iconfont icon-shanchu"></span>
      </div>
    </div>
  )
}

export default WorksCard
