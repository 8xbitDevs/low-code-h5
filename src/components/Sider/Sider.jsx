import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './Sider.module.scss'
import '../../media/icon/iconfont.css'

function SideBar() {
  const [secdis, setsecdis] = useState([
    {
      oc: false,
    },
    {
      oc: false,
    },
  ])

  // 列表展开函数，参数：目标二级菜单在左右二级菜单中的顺序，从0开始
  const OpenSec = (secindex) => {
    const newsecdis = secdis.map((item, index) => {
      if (secindex === index) {
        return {
          oc: !secdis[index].oc,
        }
      } else {
        return {
          ...item,
        }
      }
    })
    setsecdis(newsecdis)
  }

  return (
    <div className={style.container}>
      <Link to={'/'} className={style.text}>
        <span className="iconfont icon-wode"></span>
        我的作品
        <div
          className={
            !secdis[0].oc
              ? style.handler
              : `${style.handler} ${style.handler_open}`
          }
          style={{ visibility: 'hidden' }}></div>
      </Link>
      <div className={style.text} onClick={() => OpenSec(0)}>
        <span className="iconfont icon-shujukanban"></span>
        数据中心
        <div
          className={
            !secdis[0].oc
              ? style.handler
              : `${style.handler} ${style.handler_open}`
          }></div>
      </div>
      <div
        className={
          !secdis[0].oc ? style.sec : `${style.sec} ${style.sec_open}`
        }>
        <Link to={'/essentialdata1'} className={style.text}>
          基础数据
        </Link>
      </div>
      <div className={style.text} onClick={() => OpenSec(1)}>
        <span className="iconfont icon-mobankuangjia-xianxing"></span>
        模板中心
        <div
          className={
            !secdis[1].oc
              ? style.handler
              : `${style.handler} ${style.handler_open}`
          }></div>
      </div>
      <div
        className={
          !secdis[1].oc ? style.sec : `${style.sec} ${style.sec_open}`
        }>
        <Link to={'/template'} className={style.text}>
          模板列表
        </Link>
      </div>
    </div>
  )
}

export default SideBar
