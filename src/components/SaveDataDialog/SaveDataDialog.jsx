import { Modal, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import style from "./SaveDataDialog.module.scss";
import "antd/dist/antd.css";
import { http } from "../../utils/http";
import PubSub from "pubsub-js";
import { useDispatch, useSelector } from "react-redux";
import { selectPage } from "../../store/page/pageSlice";

export default function SaveDataDialog() {
  const { TextArea } = Input;
  const [saveData, setSaveData] = useState("");
  const [title, setTitle] = useState(sessionStorage.getItem("title"));
  const [describe, setDescribe] = useState(sessionStorage.getItem("describe"));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const page = useSelector(selectPage);
  // 截图函数
  const [url, setUrl] = useState("");

  const showModal = () => {
    save();
    setIsModalVisible(true);
  };
  const success = () => {
    message.success("保存成功");
  };
  const warning = () => {
    message.warning("输入不能为空");
  };
  const handleOk = () => {
    if (title.trim() == "" || describe.trim() == "") {
      warning();
    } else {
      success();
      setIsModalVisible(false);
      //  console.log(page.saveData.id);
      if (page.saveData.id === "") {
        // 若savadata存在数据则为修改文档，否则为初次保存
        handleSubmit();
      } else {
        handleUpdate();
      }
    }
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

  const handleUpdate = () => {
    const form = {
      id: page.saveData.id,
      title: title,
      describe: describe,
      pic: url,
      html: saveData,
    };

    http.post("/api/document/update", form);
  };

  const handleSubmit = () => {
    const form = {
      title: title,
      describe: describe,
      pic: url,
      html: saveData,
    };

    //获取表单数据
    // console.log(form);
    http.post("/api/document/add", form);
  };

  const save = () => {
    PubSub.publish("save", 1);
  };

  useEffect(() => {
    PubSub.subscribe("shotPic", (msg, data) => {
      data
        .then((sPic) => {
          setUrl(sPic.uri);
        })
        .catch((err) => {
          console.log("截图错误");
        });
    });
    PubSub.subscribe("innerHTML", (msg, data) => {
      setSaveData(data);
    });
    return () => {
      PubSub.unsubscribe("shotPic");
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
            defaultValue={title}
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
            defaultValue={describe}
            onChange={saveDescribe}
            onKeyDown={handleKeyDown}
            name="describe"
          />
        </>
      </Modal>
    </>
  );
}
