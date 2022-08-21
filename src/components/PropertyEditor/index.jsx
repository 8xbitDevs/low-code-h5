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

const PropertyEditor = () => {
  const bgColorRef = useRef();
  const borderColorRef = useRef();
  const textColorRef = useRef();
  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  const [nowmbp, setnowmbp] = useState(0); // 当前选中的是margin,border,padding中的哪一个
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
  // 覆盖antd默认的上传行为，可以自定义自己的上传实现
  const onImgFilesChange = async (data) => {
    const file = data.file;
    const isJPG = file.type === "image/jpeg";
    const isJPEG = file.type === "image/jpeg";
    const isGIF = file.type === "image/gif";
    const isPNG = file.type === "image/png";
    const is128M = file.size / 1024 / 1024 < 128;

    if (!(isJPG || isJPEG || isGIF || isPNG)) {
      message.error("只能上传JPG 、JPEG 、GIF、 PNG格式的图片");
      return false;
    } else if (!is128M) {
      message.error("文件大小不得超过128M");
      return false;
    }
    uploadfile(file, "img");
  };
  const onVideoFilesChange = async (data) => {
    const file = data.file;
    const isAVI = file.type === "video/avi";
    const isMP4 = file.type === "video/mp4";
    const isWMA = file.type === "video/wma";
    const isWMV = file.type === "video/x-ms-wmv";
    const is128M = file.size / 1024 / 1024 < 128;

    if (!(isAVI || isMP4 || isWMA || isWMV)) {
      message.error("只能上传AVI、MP4、WMA、WMV格式的图片");
      return false;
    } else if (!is128M) {
      message.error("文件大小不得超过128M");
      return false;
    }
    uploadfile(file, "video");
  };

  const uploadfile = async (file, type) => {
    //转化为formData格式
    let formData = new FormData();
    formData.append("file", file);
    const res = await http.post("/api/upload", formData); //发请求
    if (type === "video") {
      dispatch(
        updateCurrentComponentAttributes({
          attributes: {
            ...page.currentComponent.attributes,
            video: {
              src: "https://lowcode.wyy.ink" + res.uri,
            },
          },
          change: Date.now(),
        })
      );
    }
    if (type === "img") {
      dispatch(
        updateCurrentComponentAttributes({
          attributes: {
            ...page.currentComponent.attributes,
            img: {
              src: "https://lowcode.wyy.ink" + res.uri,
            },
          },
          change: Date.now(),
        })
      );
    }
  };

  // antd image上传
  const imageProps = {
    action: "https://lowcode.wyy.ink/api/upload",
    Headers: {
      token: getToken(),
    },
    maxCount: 1,
    customRequest: onImgFilesChange,
  };
  // antd video上传
  const videoProps = {
    action: "https://lowcode.wyy.ink/api/upload",
    Headers: {
      token: getToken(),
       'X-Requested-With':null
      
    },
  // 跨域请求changeOrigin: true,
    maxCount: 1,
    customRequest: onVideoFilesChange,
  };

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
            <ColorPicker
              text="背景色："
              ref={bgColorRef}
              getColor={page.currentComponent.attributes.bgColor}
            />
            <div className={style.form1}>
              <p className={style.p}>字号(px)：</p>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.fontSize}
                onChange={(e) => {
                  dispatch(
                    updateCurrentComponentAttributes({
                      attributes: {
                        ...page.currentComponent.attributes,
                        fontSize: e.target.value,
                      },
                      change: Date.now(),
                    })
                  );
                }}
              />
            </div>
            <ColorPicker
              text="文字颜色："
              ref={textColorRef}
              getColor={page.currentComponent.attributes.textColor}
            />
            <div className={style.form1}>
              <p className={style.p}>圆角(px)：</p>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.borderRadius}
                onChange={(e) => {
                  dispatch(
                    updateCurrentComponentAttributes({
                      attributes: {
                        ...page.currentComponent.attributes,
                        borderRadius: e.target.value,
                      },
                      change: Date.now(),
                    })
                  );
                }}
              />
            </div>
            <ColorPicker
              text="边框颜色："
              ref={borderColorRef}
              getColor={page.currentComponent.attributes.borderColor}
            />
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
                value={page.currentComponent.attributes.button.innerHTML}
                onChange={(e) => {
                  dispatch(
                    updateCurrentComponentAttributes({
                      attributes: {
                        ...page.currentComponent.attributes,
                        button: {
                          ...page.currentComponent.attributes.button,
                          innerHTML: e.target.value,
                        },
                      },
                      change: Date.now(),
                    })
                  );
                }}
              />
            </div>
            <ColorPicker
              text="背景色："
              ref={bgColorRef}
              getColor={page.currentComponent.attributes.bgColor}
            />
            <ColorPicker
              text="文字颜色："
              ref={textColorRef}
              getColor={page.currentComponent.attributes.textColor}
            />
            <div className={style.form1}>
              <p className={style.p}>字号(px)：</p>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.fontSize}
                onChange={(e) => {
                  dispatch(
                    updateCurrentComponentAttributes({
                      attributes: {
                        ...page.currentComponent.attributes,
                        fontSize: e.target.value,
                      },
                      change: Date.now(),
                    })
                  );
                }}
              />
            </div>
            <div className={style.form1}>
              <p className={style.p}>圆角(px)：</p>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.borderRadius}
                onChange={(e) => {
                  dispatch(
                    updateCurrentComponentAttributes({
                      attributes: {
                        ...page.currentComponent.attributes,
                        borderRadius: e.target.value,
                      },
                      change: Date.now(),
                    })
                  );
                }}
              />
            </div>
            <ColorPicker
              text="边框颜色："
              ref={borderColorRef}
              getColor={page.currentComponent.attributes.borderColor}
            />
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
                className={style.textinput}
                value={page.currentComponent.attributes.a.href}
                onChange={(e) => {
                  dispatch(
                    updateCurrentComponentAttributes({
                      attributes: {
                        ...page.currentComponent.attributes,
                        a: {
                          ...page.currentComponent.attributes.button,
                          href: e.target.value,
                        },
                      },
                      change: Date.now(),
                    })
                  );
                }}
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
              <Upload {...imageProps}>
                <Button icon={<UploadOutlined />}>PNG/JPG/JPEG?GIF</Button>
              </Upload>
              {/* <input
                className={style.fileinput}
                type="file"
                accept="image/*"
                onChange={(e) => setImg(e.target.value)}
              /> */}
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
              <Upload {...videoProps}>
                <Button icon={<UploadOutlined />}>AVI/MP4/WMA/WMV</Button>
              </Upload>
            </div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    PubSub.subscribe("bgColor", (msg, data) => {
      dispatch(
        updateCurrentComponentAttributes({
          attributes: {
            ...page.currentComponent.attributes,
            bgColor: `${data}`,
          },
          change: Date.now(),
        })
      );
    });
    PubSub.subscribe("borderColor", (msg, data) => {
      dispatch(
        updateCurrentComponentAttributes({
          attributes: {
            ...page.currentComponent.attributes,
            borderColor: `${data}`,
          },
          change: Date.now(),
        })
      );
    });
    PubSub.subscribe("textColor", (msg, data) => {
      dispatch(
        updateCurrentComponentAttributes({
          attributes: {
            ...page.currentComponent.attributes,
            textColor: `${data}`,
          },
          change: Date.now(),
        })
      );
    });
  }, [[page.currentComponent.change]]);

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
              px
              {/* <select
                ref={unitRight}
                onChange={() => getSelectOption(unitRight)}
              >
                <option value="px">px</option>
                <option value="rem">rem</option>
              </select> */}
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
              px
              {/* <select
                ref={unitRight}
                onChange={() => getSelectOption(unitRight)}
              >
                <option value="px">px</option>
                <option value="rem">rem</option>
              </select> */}
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
            <label htmlFor="right" className={style.label}>
              右
            </label>
            <input id="right" type="checkbox" onChange={(e) => showboxset(2)} />
            <div style={{ display: `${boxset[2]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.mbp[nowmbp][1]}
                onChange={(e) => setMBP(nowmbp, 1, e.target.value)}
              />
              px
              {/* <select
                ref={unitRight}
                onChange={() => getSelectOption(unitRight)}
              >
                <option value="px">px</option>
                <option value="rem">rem</option>
              </select> */}
            </div>
          </div>
          <div className={style.down} style={{ display: `${check}` }}>
            <label htmlFor="down" className={style.label}>
              下
            </label>
            <input id="down" type="checkbox" onChange={(e) => showboxset(3)} />
            <div style={{ display: `${boxset[3]}` }}>
              <input
                type="number"
                className={style.numberinput}
                value={page.currentComponent.attributes.mbp[nowmbp][2]}
                onChange={(e) => setMBP(nowmbp, 2, e.target.value)}
              />
              px
              {/* <select
                ref={unitBottom}
                onChange={() => getSelectOption(unitBottom)}
              >
                <option value="px">px</option>
                <option value="rem">rem</option>
              </select> */}
            </div>
          </div>
        </div>
      </div>
      {propertyset(`${page.currentComponent.type}`)}
    </div>
  );
};

export default PropertyEditor;
