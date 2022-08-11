import { Modal, Input, Button } from 'antd'
import React, { useState } from 'react'
import style from './SaveDataDialog.module.scss'
import 'antd/dist/antd.css'

export default function SaveDataDialog() {
  const { TextArea } = Input
  const [title, setTitle] = useState()
  const [describe, setDescribe] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }
  const handleOk = () => {
    setIsModalVisible(false)
    handleSubmit()
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const saveTitle = (e) => {
    setTitle(e.target.value)
  }
  const saveDescribe = (e) => {
    setDescribe(e.target.value)
  }
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOk()
    }
  }
  const handleSubmit = () => {
    //获取表单数据
    console.log({ title }, { describe })
  }

  return (
    <>
      <button className={style.button} onClick={showModal}>
        保存
      </button>
      <Modal
        title="新建作品"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}>
        <>
          <label htmlFor="">标题：</label>
          <Input
            showCount
            maxLength={20}
            onChange={saveTitle}
            onKeyDown={handleKeyDown}
            name="title"
          />
          <br />
          <br />
          <label htmlFor="">描述：</label>
          <TextArea
            showCount
            maxLength={100}
            onChange={saveDescribe}
            onKeyDown={handleKeyDown}
            name="describe"
          />
        </>
      </Modal>
    </>
  )
}
