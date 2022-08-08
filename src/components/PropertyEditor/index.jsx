import React, { useRef, useState, useEffect } from "react";
import style from "./index.module.scss";
import ColorPicker from "../ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPage,
  updateCurrentComponentAttributes,
} from "../../store/page/pageSlice";

const PropertyEditor = () => {
  const bgcolor = useRef();
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  // 通用
  const [nowmbp, setnowmbp] = useState(0); // 当前选中的是margin,border,padding中的哪一个
  const [borderRadius, setborderRadius] = useState(0); // 圆角
  const [bgColor, setbgColor] = useState("rgba(0, 0, 0, 1)"); // 背景颜色
  const [borderColor, setBorderColor] = useState("rgba(0, 0, 0, 1)"); // 边框颜色
  const [textColor, setTextColor] = useState("rgba(0, 0, 0, 1)"); // 文字颜色
  // button
  const [buttonText, setButtonText] = useState("按钮"); // 按钮文字
  const [fontsize, setFontsize] = useState(0); // 字号
  const [lineheight, setLineheight] = useState(0); // 行高
  const [align, setAlign] = useState("center"); // 设置对齐方式
  // a
  const [src, setSrc] = useState(""); // 链接地址
  // img
  const [imgsrc, setImg] = useState("");
  // video
  const [video, setVideo] = useState("");
  // 其他
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
    const temp = JSON.parse(
      JSON.stringify(page.currentComponent.attributes.mbp)
    );
    const newset = temp.map((item, index) => {
      if (nowmbp === index) {
        item[tarindex] = value;
        return item;
      } else {
        return item;
      }
    });
    dispatch(
      updateCurrentComponentAttributes({
        attributes: {
          ...page.currentComponent.attributes,
          mbp: newset,
        },
        change: Date.now(),
      })
    );
    // setmbp(newset);
  };

  // 返回属性设置模块,type为组件种类，根据组件种类返回不同属性设置模块，目前只有文本
  const propertyset = (type) => {
    if (type === "span") {
      return (
        <div className={style.container2}>
          <div className={style.title}>属性设置</div>
          <div className={style.form2}>
            <ColorPicker text="背景色：" ref={bgcolor} />

            <div className={style.form1}>
              <p className={style.p}>圆角(px)：</p>
              <input
                type="number"
                className={style.numberinput}
                value={borderRadius}
                onChange={(e) => setborderRadius(e.target.value)}
              />
            </div>
            <ColorPicker text="边框颜色：" ref={bgcolor} />
          </div>
        </div>
      );
    }
    if (type === "button") {
      return (
        <div className={style.container2}>
          <div className={style.title}>属性设置</div>
          <div className={style.form2}>
            <div className={style.form1}>
              <p className={style.p}>按钮文字：</p>
              <input
                type="text"
                className={style.textinput}
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            <ColorPicker text="背景色：" ref={bgcolor} />
            <ColorPicker text="文字颜色：" ref={bgcolor} />
            <div className={style.form1}>
              <p className={style.p}>字号(px)：</p>
              <input
                type="number"
                className={style.numberinput}
                value={fontsize}
                onChange={(e) => setFontsize(e.target.value)}
              />
            </div>
            <div className={style.form1}>
              <p className={style.p}>行高：</p>
              <input
                type="number"
                className={style.numberinput}
                value={lineheight}
                onChange={(e) => setLineheight(e.target.value)}
              />
            </div>
            <div className={style.form1}>
              <p className={style.p}>圆角(px)：</p>
              <input
                type="number"
                className={style.numberinput}
                value={borderRadius}
                onChange={(e) => setborderRadius(e.target.value)}
              />
            </div>
            <ColorPicker text="边框颜色：" ref={bgcolor} />
            <div style={{ height: "56px" }}>
              <p className={style.p}>文字对齐：</p>
              <div>
                <input
                  type="radio"
                  name="align"
                  value="left"
                  id="leftAlign"
                  className={style.radioinput}
                  onClick={(e) => setAlign(e.target.value)}
                />
                <label htmlFor="leftAlign" className={style.label}>
                  左对齐
                </label>
                <input
                  type="radio"
                  name="align"
                  value="center"
                  id="centerAlign"
                  defaultChecked
                  className={style.radioinput}
                  onClick={(e) => setAlign(e.target.value)}
                />
                <label htmlFor="centerAlign" className={style.label}>
                  居中对齐
                </label>
                <input
                  type="radio"
                  name="align"
                  value="right"
                  id="rightAlign"
                  className={style.radioinput}
                  onClick={(e) => setAlign(e.target.value)}
                />
                <label htmlFor="rightAlign" className={style.label}>
                  右对齐
                </label>
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (type === "a") {
      return (
        <div className={style.container2}>
          <div className={style.title}>属性设置</div>
          <div className={style.form2}>
            <div className={style.form1}>
              <p className={style.p}>地址：</p>
              <input
                type="text"
                className={style.numberinput}
                value={src}
                onChange={(e) => setSrc(e.target.value)}
              />
            </div>
          </div>
        </div>
      );
    }
    if (type === "img") {
      return (
        <div className={style.container2}>
          <div className={style.title}>属性设置</div>
          <div className={style.form2}>
            <div className={style.form1}>
              <p className={style.p}>上传图片：</p>
              <input
                className={style.fileinput}
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.value)}
              />
            </div>
          </div>
        </div>
      );
    }
    if (type === "video") {
      return (
        <div className={style.container2}>
          <div className={style.title}>属性设置</div>
          <div className={style.form2}>
            <div className={style.form1}>
              <p className={style.p}>上传视频：</p>
              <input
                className={style.fileinput}
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>
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
          <p className={style.p}>上</p>
          <input
            type="number"
            className={style.numberinput}
            value={page.currentComponent.attributes.top}
            onChange={(e) => {
              dispatch(
                updateCurrentComponentAttributes({
                  attributes: {
                    ...page.currentComponent.attributes,
                    top: e.target.value,
                  },
                  change: Date.now(),
                })
              );
            }}
          />
          <p className={style.p}>左</p>
          <input
            type="number"
            className={style.numberinput}
            value={page.currentComponent.attributes.left}
            onChange={(e) => {
              dispatch(
                updateCurrentComponentAttributes({
                  attributes: {
                    ...page.currentComponent.attributes,
                    left: e.target.value,
                  },
                  change: Date.now(),
                })
              );
            }}
          />
        </div>
        <div className={style.form1}>
          <p className={style.p}>宽</p>
          <input
            type="number"
            className={style.numberinput}
            value={page.currentComponent.attributes.width}
            onChange={(e) => {
              dispatch(
                updateCurrentComponentAttributes({
                  attributes: {
                    ...page.currentComponent.attributes,
                    width: e.target.value,
                  },
                  change: Date.now(),
                })
              );
            }}
          />
          <p className={style.p}>高</p>
          <input
            type="number"
            className={style.numberinput}
            value={page.currentComponent.attributes.height}
            onChange={(e) => {
              dispatch(
                updateCurrentComponentAttributes({
                  attributes: {
                    ...page.currentComponent.attributes,
                    height: e.target.value,
                  },
                  change: Date.now(),
                })
              );
            }}
          />
        </div>
        <div className={style.form1}>
          <p className={style.p}>选择 margin/border/padding进行设置</p>
        </div>
        <div className={style.boxcontainer}>
          <div className={style.up} style={{ display: `${check}` }}>
            <label htmlFor="up" className={style.label}>
              上
            </label>
            <input id="up" type="checkbox" onChange={(e) => showboxset(0)} />
            <div style={{ display: `${boxset[0]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.mbp[nowmbp][0]}
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
            <label htmlFor="left" className={style.label}>
              左
            </label>
            <input id="left" type="checkbox" onChange={(e) => showboxset(1)} />
            <div style={{ display: `${boxset[1]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.mbp[nowmbp][3]}
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
                  {page.currentComponent.attributes.width}x
                  {page.currentComponent.attributes.height}
                </div>
              </div>
            </div>
          </div>
          <div className={style.right} style={{ display: `${check}` }}>
            <label htmlFor="right"  className={style.label}>右</label>
            <input id="right" type="checkbox" onChange={(e) => showboxset(2)} />
            <div style={{ display: `${boxset[2]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.mbp[nowmbp][1]}
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
            <label htmlFor="down" className={style.label}>下</label>
            <input id="down" type="checkbox" onChange={(e) => showboxset(3)} />
            <div style={{ display: `${boxset[3]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.mbp[nowmbp][2]}
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
      {propertyset(`${page.currentComponent.type}`)}
    </div>
  );
};

export default PropertyEditor;
