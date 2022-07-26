import React, { useState, useEffect, useRef, forwardRef } from "react";
// import { Popover } from 'antd';
import { SketchPicker, ChromePicker } from "react-color";
import PubSub from "pubsub-js";
import style from "./index.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updateCurrentComponentAttributes,
  updateCurrentComponentIdType,
} from "../../store/page/pageSlice";

const ColorPicker = forwardRef((props, ref) => {
  const { text, getColor } = props;
  const page = useSelector(selectPage);
  const [bgoc, setbgoc] = useState(false)
  const [color, setColor] = useState({
    r: "255",
    g: "255",
    b: "255",
    a: "1",
  });

  useEffect(() => {
    setColor(getColor)
  },[page.currentComponent.id])

  const handleChange = (getcolor) => {
    setColor(
      `rgba(${getcolor.rgb.r},${getcolor.rgb.g},${getcolor.rgb.b},${getcolor.rgb.a})`
    );
    if (text === "背景色：") {
      PubSub.publish("bgColor", color);
    }
    if (text === "边框颜色：") {
      PubSub.publish("borderColor", color);
    }
    if (text === "文字颜色：") {
      PubSub.publish("textColor", color);
    }
  };

  return (
    <div ref={ref} className={style.container}>
      <div className={style.title}>
        <p className={style.p}>{text}</p>
        <div
          style={{ backgroundColor: `${color}` }}
          className={style.showcolor}
          onClick={()=>setbgoc(!bgoc)}
        ></div>
      </div>
      <div style={{display:`${bgoc ? 'block' : 'none'}`}} className={style.colorpicker} >
         <ChromePicker
          color={color}
          onChange={(getcolor) => {
            handleChange(getcolor);
          }}
        />
      </div>
    </div>
  );
});

export default ColorPicker;
