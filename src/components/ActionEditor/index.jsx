import React, { useRef, useState, useEffect } from "react";
import style from "./index.module.scss";
import ColorPicker from "../ColorPicker";
import { getToken, http } from "../../utils/http";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import {
  selectPage,
  updateCurrentComponentAttributes,
} from "../../store/page/pageSlice";

const ActionEditor = () => {
  useEffect(() => {}, []);

  return (
    <div className={style.container}>
      <p className={style.p}>
        举例：当单击按钮时, 跳转至百度(http://baidu.com)
      </p>
      <div>
        当
        <select className={style.select} name="" id="">
          <option value="">单击</option>
          <option value="">双击</option>
        </select>
        执行
        <select className={style.select} name="" id="">
          <option value="">跳转</option>
          <option value="">发邮件</option>
        </select>
      </div>
      <div>跳转地址：
        <input type="text" className={style.textinput} />
      </div>
    </div>
  );
};

export default ActionEditor;
