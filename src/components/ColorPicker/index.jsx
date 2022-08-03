import React, { useState, useEffect, useRef, forwardRef } from "react";
// import { Popover } from 'antd';
import { SketchPicker, ChromePicker } from "react-color";
import PubSub from "pubsub-js";
import style from "./index.module.scss";

const ColorPicker = forwardRef((props, ref) => {
  const { text } = props;
  const [bgoc, setbgoc] = useState(false)
  const [color, setColor] = useState({
    r: "255",
    g: "255",
    b: "255",
    a: "1",
  });

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
  };

  return (
    <div ref={ref}>
      <div className={style.title}>
        <p>{text}</p>
        <div
          style={{ backgroundColor: `${color}` }}
          className={style.showcolor}
          onClick={()=>setbgoc(!bgoc)}
        ></div>
      </div>
      <div style={{display:`${bgoc ? 'block' : 'none'}`}} className={style.colorpicker} >
        {/* <SketchPicker
          color={color}
          onChange={(getcolor) => {
            handleChange(getcolor);
          }}
        /> */}
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
