import React, { useRef, useState, forwardRef, useEffect } from "react";
import style from "./index.module.scss";
import ColorPicker from "../ColorPicker";

const PropertyEditor = (props) => {
  const {type} = props;

  const bgcolor = useRef();

  const [totop, settotop] = useState(0); // 上边距
  const [toleft, settoleft] = useState(0); // 左边距
  const [width, setwidth] = useState(40); // 宽
  const [height, setheight] = useState(100); // 高
  const [nowmbp, setnowmbp] = useState(0); // 当前选中的是margin,border,padding中的哪一个
  const [mbp, setmbp] = useState([
    // margin、border、padding
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [borderRadius, setborderRadius] = useState(100); // 圆角
  const [bgColor, setbgColor] = useState("rgba(0, 0, 0, 1)");
  const [check, setcheck] = useState("none"); // 盒子checkbox显示状态
  const [boxset, setboxset] = useState(["none", "none", "none", "none"]); // 盒子设置框显示状态
  const [boxstyle, setboxstyle] = useState([
    // 盒子模型样式
    {
      bg: "#52527E",
      color: "white",
      state: "false",
    },
    {
      bg: "#52527E",
      color: "white",
      state: "false",
    },
    {
      bg: "#52527E",
      color: "white",
      state: "false",
    },
  ]);

  // 改变盒子样式
  const changeboxstyle = (e, tarindex) => {
    setnowmbp(tarindex);
    setcheck("block");
    const newstyles = boxstyle.map((item, index) => {
      if (tarindex == index) {
        return {
          bg: "#FEDD9B",
          color: "black",
          state: true,
        };
      } else {
        return {
          bg: "#52527E",
          color: "white",
          state: "false",
        };
      }
    });
    setboxstyle(newstyles);
    e.stopPropagation();
  };

  // 显示盒子设置选项
  const showboxset = (tarindex) => {
    const newset = boxset.map((item, index) => {
      if (tarindex == index && boxset[index] == "none") {
        return "block";
      } else if (tarindex == index && boxset[index] == "block") {
        return "none";
      } else {
        return item;
      }
    });
    setboxset(newset);
  };

  // 设置mbp
  const setMBP = (nowmbp, tarindex, value) => {
    const newset = mbp.map((item, index) => {
      if (nowmbp === index) {
        item[tarindex] = value;
        return item;
      } else {
        return item;
      }
    });
    setmbp(newset);
  };

  // 返回属性设置模块,type为组件种类，根据组件种类返回不同属性设置模块，目前只有文本
  const propertyset = (type) => {
    if (type === "文本") {
      return (
        <div className={style.container2}>
          <div className={style.title}>属性设置</div>
          <div className={style.form2}>
            <ColorPicker text="背景色：" ref={bgcolor}></ColorPicker>
            <div className={style.form1}>
              <p>圆角(px):</p>
              <input
                type="number"
                className={style.numberinput}
                value={borderRadius}
                onChange={(e) => setborderRadius(e.target.value)}
              />
            </div>
            <ColorPicker text="边框颜色：" ref={bgcolor}></ColorPicker>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    PubSub.subscribe("bgColor", (msg, data) => {
      setbgColor(data);
    });
  }, [bgColor]);

  return (
    <div>
      <div className={style.container}>
        <div className={style.title}>通用样式</div>
        <div className={style.form1}>
          <p>上</p>
          <input
            type="number"
            className={style.numberinput}
            value={totop}
            onChange={(e) => settotop(e.target.value)}
          />
          <p>左</p>
          <input
            type="number"
            className={style.numberinput}
            value={toleft}
            onChange={(e) => settoleft(e.target.value)}
          />
        </div>
        <div className={style.form1}>
          <p>宽</p>
          <input
            type="number"
            className={style.numberinput}
            value={width}
            onChange={(e) => setwidth(e.target.value)}
          />
          <p>高</p>
          <input
            type="number"
            className={style.numberinput}
            value={height}
            onChange={(e) => setheight(e.target.value)}
          />
        </div>
        <div className={style.form1}>
          <p>选择 margin/border/padding进行设置</p>
        </div>
        <div className={style.boxcontainer}>
          <div className={style.up} style={{ display: `${check}` }}>
            <label htmlFor="up">上</label>
            <input id="up" type="checkbox" onChange={(e) => showboxset(0)} />
            <div style={{ display: `${boxset[0]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={mbp[nowmbp][0]}
                onChange={(e) => setMBP(nowmbp, 0, e.target.value)}
              />
              <select>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </select>
            </div>
          </div>
          <div className={style.left} style={{ display: `${check}` }}>
            <label htmlFor="left">左</label>
            <input id="left" type="checkbox" onChange={(e) => showboxset(1)} />
            <div style={{ display: `${boxset[1]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={mbp[nowmbp][3]}
                onChange={(e) => setMBP(nowmbp, 3, e.target.value)}
              />
              <select>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </select>
            </div>
          </div>
          <div
            className={style.box}
            style={{
              width: "9rem",
              height: "8rem",
              fontSize: "14px",
              margin: "0.5rem",
              backgroundColor: `${boxstyle[0].bg}`,
              color: `${boxstyle[0].color}`,
            }}
            onClick={(e) => changeboxstyle(e, 0)}
          >
            margin
            <div
              className={style.box}
              style={{
                backgroundColor: `${boxstyle[1].bg}`,
                color: `${boxstyle[1].color}`,
              }}
              onClick={(e) => changeboxstyle(e, 1)}
            >
              border
              <div
                className={style.box}
                style={{
                  backgroundColor: `${boxstyle[2].bg}`,
                  color: `${boxstyle[2].color}`,
                }}
                onClick={(e) => changeboxstyle(e, 2)}
              >
                padding
                <div className={style.box}>
                  {width} x {height}
                </div>
              </div>
            </div>
          </div>
          <div className={style.right} style={{ display: `${check}` }}>
            <label htmlFor="right">右</label>
            <input id="right" type="checkbox" onChange={(e) => showboxset(2)} />
            <div style={{ display: `${boxset[2]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={mbp[nowmbp][1]}
                onChange={(e) => setMBP(nowmbp, 1, e.target.value)}
              />
              <select>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </select>
            </div>
          </div>
          <div className={style.down} style={{ display: `${check}` }}>
            <label htmlFor="down">下</label>
            <input id="down" type="checkbox" onChange={(e) => showboxset(3)} />
            <div style={{ display: `${boxset[3]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={mbp[nowmbp][2]}
                onChange={(e) => setMBP(nowmbp, 2, e.target.value)}
              />
              <select>
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="rem">rem</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {propertyset(`${type}`)}
    </div>
  );
};

export default PropertyEditor;
