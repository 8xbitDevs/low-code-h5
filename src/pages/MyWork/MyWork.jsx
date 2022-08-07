import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import WorksCard from '../../components/WorksCard/WorksCard'
import style from './MyWork.module.scss'
import '../../media/icon/iconfont.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function MyWork() {
  const [data, setData] = useState({
    doc: [{ createTime: '', describe: '', id: '', title: '' }],
  })
  useEffect(() => {
    async function fetchDatasSource() {
      const res = await axios({
        method: 'get',
        url: 'http://lowcode.wyy.ink/api/document/getList',
        headers: {
          'token': JSON.parse(localStorage.getItem("token")).value,
        }
      })
      //console.log(res.data.doc)
      setData(res.data.doc)
    }
    fetchDatasSource()
  }, [])
  return (
    <div className={style.container}>
      <Link to={'/editor'}>
        <div className={style.cardcontainer}>
          <img src="src\media\icon\tianjia.svg" />
          <div className={style.option}>
            <p>创建新作品</p>
          </div>
        </div>
      </Link>

      <WorksCard
        key={data.id}
        cardname={data.title}
        description={data.describe}
        date={data.createTime}></WorksCard>
    </div>
  )
}
export default MyWork
