import React, { useRef, useState, useEffect } from "react";
import style from "./index.module.scss";
import { Switch } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import {
  selectPage,
  updateCurrentComponentScript,
} from "../../store/page/pageSlice";

const ActionEditor = (props) => {
  const itemid = props || {};

  const cliEve = useRef();
  const actEve = useRef();

  const [disabled, setDisabled] = useState(true);

  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  // 获取select标签value
  const getSelectOption = (tar) => {
    const index = tar.current.selectedIndex;
    const value = tar.current.options[index].value;
    if (tar === cliEve) {
      dispatch(
        updateCurrentComponentScript({
          script: {
            ...page.currentComponent.script,
            cli: value,
          },
          change: Date.now(),
        })
      );
    }
    if (tar === actEve) {
      dispatch(
        updateCurrentComponentScript({
          script: {
            ...page.currentComponent.script,
            act: value,
          },
          change: Date.now(),
        })
      );
    }
  };

  // action开关
  const onChange = (checked) => {
    if (checked) {
      dispatch(
        updateCurrentComponentScript({
          script: {
            ...page.currentComponent.script,
            switch: true,
          },
          change: Date.now(),
        })
      );
    } else {
      dispatch(
        updateCurrentComponentScript({
          script: {
            ...page.currentComponent.script,
            switch: false,
          },
          change: Date.now(),
        })
      );
    }
  };
  const msg = () => {
    if (page.currentComponent.type != "button") {
      message.error("仅按钮可设置动作属性");
    }
  };

  useEffect(() => {
    if (page.currentComponent.type === "button") {
      setDisabled(false);
    }
    if (page.currentComponent.type != "button") {
      setDisabled(true);
    }
    return () => {
    };
  });

  return (
    <div className={style.container}>
      <div onClick={msg}>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          onChange={onChange}
          disabled={disabled}
          checked={JSON.parse(page.currentComponent.script.switch)}
        />
      </div>

      <p className={style.p}>
        举例：当单击按钮时, 跳转至百度(http://baidu.com)
      </p>
      <div>
        当
        <select
          className={style.select}
          name="click"
          ref={cliEve}
          value={page.currentComponent.script.cli}
          onChange={() => getSelectOption(cliEve)}
        >
          <option value="single">单击</option>
          <option value="double">双击</option>
        </select>
        执行
        <select
          className={style.select}
          name="action"
          ref={actEve}
          value={page.currentComponent.script.act}
          onChange={() => getSelectOption(actEve)}
        >
          <option value="jump">跳转</option>
          <option value="mail">发邮件</option>
          <option value="share">分享</option>
        </select>
      </div>
      <div>
        跳转地址：
        <input type="text" className={style.textinput} value={page.currentComponent.script.jumpTo} onChange={(e) => {
                  dispatch(
                    updateCurrentComponentScript({
                      script: {
                        ...page.currentComponent.script,
                        jumpTo: e.target.value,
                      },
                      change: Date.now(),
                    })
                  );
                }} />
      </div>
    </div>
  );
};

export default ActionEditor;
