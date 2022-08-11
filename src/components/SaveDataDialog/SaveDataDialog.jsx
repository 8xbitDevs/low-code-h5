import { Modal, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import style from "./SaveDataDialog.module.scss";
import "antd/dist/antd.css";
import { http } from "../../utils/http";

export default function SaveDataDialog() {
  const { TextArea } = Input;
  const [saveData, setSaveData] = useState("");
  const [title, setTitle] = useState();
  const [describe, setDescribe] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    save();
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    handleSubmit();
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const saveTitle = (e) => {
    setTitle(e.target.value);
  };
  const saveDescribe = (e) => {
    setDescribe(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleOk();
    }
  };
  const handleSubmit = () => {
    const form = {
      title: title,
      describe: describe,
      pic: "https://s1.ax1x.com/2022/08/11/v87sFs.jpg",
      html: saveData,
    };
    //获取表单数据
    console.log(form);
    http.post("/api/document/add", form);
  };

  const save = () => {
    PubSub.publish("save", 1);
  };

  useEffect(() => {
    PubSub.subscribe("innerHTML", (msg, data) => {
      console.log(data);
      setSaveData(data);
    });
    return () => {
      PubSub.unsubscribe("innerHTML");
    };
  }, []);

  return (
    <>
      <button className={style.button} onClick={showModal}>
        保存
      </button>
      <Modal
        title="保存作品"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
  );
}
