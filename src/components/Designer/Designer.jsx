import React, { useEffect, useRef, useState } from "react";
import { createElement } from "./DesignerHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updateCurrentComponentAttributes,
  updateCurrentComponentIdType,
  updateCurrentComponentScript,
} from "../../store/page/pageSlice";
import styles from "./Designer.module.css";
import "./TemplateStyle.css";
import html2canvas from "html2canvas";
import Canvas2Image from "./canvas2image.js";
import { http } from "../../utils/http";

const Designer = () => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const focusComponent = useRef(null);
  const container = useRef(null);

  // 删除样式
  const deleteAttritube = () => {
    let designer = document.getElementById("designer");
    designer.setAttribute("style", "box-shadow: none");
    for (let i = 0; i < container.current.childNodes.length; i++) {
      let item = container.current.childNodes[i];
      item.style.boxShadow = "none";
      // item.setAttribute("style", "box-shadow: none");
    }
  };

  // 放置组件
  const drop = (e) => {
    const type = e.dataTransfer.getData("type");
    container.current.appendChild(
      createElement(type, {
        top: e.clientY - container.current.offsetTop,
        left: e.clientX - container.current.offsetLeft,
      })
    );
  };

  // 创建canves并绘制
  function creatCanvas(designer, temp) {
    // temp.src = redirectUrl('x.')
    temp.crossOrigin = "Anonymous";
    var canvas = document.createElement("canvas");
    canvas.className = "template_canvas";

    // 根据视频结点设置样式
    canvas.style.width = temp.style.width;
    canvas.style.height = temp.style.height;
    canvas.style.left = temp.style.left;
    canvas.style.top = temp.style.top;

    canvas.style.position = "absolute";
    // 将canvas结点放在视频结点下面
    canvas.style.zIndex = -888;
    canvas.style.backgroundColor = "white";

    //添加到幕布的孩子结点上
    designer.appendChild(canvas);

    // 绘制画布
    var ctx = canvas.getContext("2d");
    // 去掉单位
    var width = parseInt(parseInt(canvas.style.width));
    var height = parseInt(parseInt(canvas.style.height));

    // 提高分辨率
    const ratio = window.devicePixelRatio || 1;
    ctx.scale(ratio, ratio);

    // 由于存在进度条，可能会造成视频失真
    ctx.drawImage(temp, 0, 0, width, height * 0.7);
  }

  // 截图函数
  function generateImage(designer) {
    // 对于视频截图需要进一步优化
    //  获得视频截图的结点
    const videoNode = designer.getElementsByClassName("template_video");

    // 根据视频的多少生成多少个画布组件
    for (var i = 0; i < videoNode.length; i++) {
      // 创建
      creatCanvas(designer, videoNode[i]);
      //  并且隐藏视频标签
      videoNode[i].style.display = "none";
    }

    var width = designer.offsetWidth; //获取dom宽度（包括元素宽度、内边距和边框，不包括外边距）
    var height = designer.offsetHeight; // 获取dom高度（包括元素高度、内边距和边框，不包括外边距）
    var canvas = document.createElement("canvas"); //创建一个canvas标签元素
    var scale = 1; //定义放大倍数，可以支持小数
    var imgType = "image/jpg"; //设置默认下载的图片格式

    canvas.width = width * scale; //定义canvas宽度 * 倍数（图片的清晰度优化），默认宽度为300px
    canvas.height = height * scale; //定义canvas高度 * 倍数，默认高度为150px
    canvas.getContext("2d").scale(scale, scale); //创建canvas的context对象，设置scale，相当于画布的“画笔”拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法

    var opts = {
      //初始化对象
      scale: scale, //添加的scale参数
      canvas: canvas, //自定义canvas
      logging: true, //日志开关，便于查看html2canvas的内部执行流程
      width: width, //dom的原始宽度和高度
      height: height,
      useCORS: true, //开启html2canvas的useCORS配置，跨域配置，以解决图片跨域的问题
    };

    const imgSrc = html2canvas(designer, opts).then(function (canvas) {
      var context = canvas.getContext("2d");

      // 【重要】关闭抗锯齿，进一步优化清晰度
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      var img = Canvas2Image.convertToImage(
        canvas,
        canvas.width,
        canvas.height,
        imgType
      );
      // 将图片的64位编码传递出去
      return img.src;
    });

    // 视频结点进行添加
    for (var i = videoNode.length - 1; i >= 0; i--) {
      videoNode[i].style.display = "block";
      designer.appendChild(videoNode[i]);
    }

    //  对画布结点从后面往前删除
    const canvasNodes = designer.getElementsByClassName("template_canvas");
    console.log(canvasNodes.length);
    for (var i = canvasNodes.length - 1; i >= 0; i--) {
      designer.removeChild(canvasNodes[i]);
    }
    return imgSrc;
  }

  // 更改图片格式并向后端发送信息
  const uploadfile = async (file) => {
    //这里对base64串进行操作，去掉url头，并转换为byte
    var bytes = window.atob(file.split(",")[1]);

    //处理异常，将ASCII码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i); //这里有点疑惑，ia是怎么改变ab的
    }
    //先转化为Blob对象
    var blob = new Blob([ab], { type: "image" }); //type为图片的格式
    //FormData对象接受三个参数，第三个参数为文件名，通常只传前两个参数，第三个参数不传则使用默认文件名，这里使用的Blob对象，所以需要一个文件名，用时间戳代替。
    // 转化为formData格式
    let formData = new FormData();
    formData.append("file", blob, Date.now() + ".jpg");

    // 向服务器存储数据
    const res = await http.post("/api/upload", formData);
    return res;
  };

  const dragOver = (e) => {
    e.preventDefault();
  };

  // 同步更新编辑区
  useEffect(() => {
    if (focusComponent.current) {
      focusComponent.current.style.top =
        page.currentComponent.attributes.top + "px";
      focusComponent.current.style.left =
        page.currentComponent.attributes.left + "px";
      focusComponent.current.style.height =
        page.currentComponent.attributes.height + "px";
      focusComponent.current.style.width =
        page.currentComponent.attributes.width + "px";
      focusComponent.current.style.margin =
        page.currentComponent.attributes.mbp[0].join("px ") + "px";
      focusComponent.current.style.borderWidth =
        page.currentComponent.attributes.mbp[1].join("px ") + "px";
      focusComponent.current.style.padding =
        page.currentComponent.attributes.mbp[2].join("px ") + "px";
      focusComponent.current.style.backgroundColor =
        page.currentComponent.attributes.bgColor;
      focusComponent.current.style.borderColor =
        page.currentComponent.attributes.borderColor;
      focusComponent.current.style.color =
        page.currentComponent.attributes.textColor;
      if (focusComponent.current.dataset.type === "span") {
        focusComponent.current.style.borderRadius =
          page.currentComponent.attributes.borderRadius + "px";
      }
      if (focusComponent.current.dataset.type === "button") {
        focusComponent.current.innerHTML =
          page.currentComponent.attributes.button.innerHTML;
        focusComponent.current.style.borderRadius =
          page.currentComponent.attributes.borderRadius + "px";
        focusComponent.current.style.fontSize =
          page.currentComponent.attributes.fontSize + "px";
        focusComponent.current.dataset.switch =
          page.currentComponent.script.switch;
        focusComponent.current.dataset.cli = page.currentComponent.script.cli;
        focusComponent.current.dataset.act = page.currentComponent.script.act;
        focusComponent.current.dataset.jumpTo =
          page.currentComponent.script.jumpTo;
      }
      if (focusComponent.current.dataset.type === "a") {
        focusComponent.current.href = page.currentComponent.attributes.a.href;
      }
      if (focusComponent.current.dataset.type === "img") {
        focusComponent.current.src = page.currentComponent.attributes.img.src;
      }
      if (focusComponent.current.dataset.type === "video") {
        focusComponent.current.src = page.currentComponent.attributes.video.src;
      }
    }
  }, [page.currentComponent.change]);

  // 组件焦点处理
  useEffect(() => {
    const element = container.current;
    let elementId = "";
    function activeComponent(event) {
      // 上个获得焦点的组件
      if (focusComponent.current) {
        focusComponent.current.style.boxShadow = "";
      }
      // 设为当前点击的组件
      focusComponent.current = event.target;
      elementId = event.target.id;
      focusComponent.current.style.boxShadow = "0px 0px 0px 1px #1890ff";

      dispatch(
        updateCurrentComponentIdType({
          id: focusComponent.current.id,
          type: focusComponent.current.dataset.type,
        })
      );

      let margin = [
        focusComponent.current.style.marginTop.slice(0, -2),
        focusComponent.current.style.marginRight.slice(0, -2),
        focusComponent.current.style.marginBottom.slice(0, -2),
        focusComponent.current.style.marginLeft.slice(0, -2),
      ];

      let borderWidth = [
        focusComponent.current.style.borderTopWidth.slice(0, -2),
        focusComponent.current.style.borderRightWidth.slice(0, -2),
        focusComponent.current.style.borderBottomWidth.slice(0, -2),
        focusComponent.current.style.borderLeftWidth.slice(0, -2),
      ];

      let padding = [
        focusComponent.current.style.paddingTop.slice(0, -2),
        focusComponent.current.style.paddingRight.slice(0, -2),
        focusComponent.current.style.paddingBottom.slice(0, -2),
        focusComponent.current.style.paddingLeft.slice(0, -2),
      ];
      dispatch(
        updateCurrentComponentAttributes({
          attributes: {
            ...page.currentComponent.attributes,
            top: focusComponent.current.style.top.slice(0, -2),
            left: focusComponent.current.style.left.slice(0, -2),
            width: focusComponent.current.style.width.slice(0, -2),
            height: focusComponent.current.style.height.slice(0, -2),
            mbp: [margin, borderWidth, padding],
            borderRadius: focusComponent.current.style.borderRadius.slice(
              0,
              -2
            ),
            bgColor: focusComponent.current.style.backgroundColor,
            borderColor: focusComponent.current.style.borderColor,
            textColor: focusComponent.current.style.textColor,
            fontSize: focusComponent.current.style.fontSize.slice(0, -2),
            button: {
              innerHTML: focusComponent.current.innerHTML,
            },
            a: {
              href: focusComponent.current.href,
            },
            img: {
              src: focusComponent.current.src,
            },
            video: {
              src: focusComponent.current.src,
            },
          },
          ...page.currentComponent.script,
          change: page.currentComponent.change,
        })
      );
      if (focusComponent.current.dataset.type === "button") {
        if (focusComponent.current.dataset.switch === "false") {
          var tarCli = "single";
          var tarAct = "jump";
          var tarJumpTo = "";
        }
        if (focusComponent.current.dataset.switch === "true") {
          tarCli = focusComponent.current.dataset.cli;
          tarAct = focusComponent.current.dataset.act;
          console.log(focusComponent.current.dataset.cli)
          tarJumpTo = focusComponent.current.dataset.jumpTo;
        }
        dispatch(
          updateCurrentComponentScript({
            script: {
              switch: focusComponent.current.dataset.switch,
              cli: tarCli,
              act: tarAct,
              jumpTo: tarJumpTo,
            },
            change: page.currentComponent.change,
          })
        );
      }
    }
    // const dragComponent = () => {
    //   // 拖动处理
    //   if (elementId != "designer" && elementId != "") {
    //     const element = document.getElementById(elementId);
    //     element.onmousedown = (mouseDown) => {
    //       const mouseDownX = mouseDown.pageX;
    //       const mouseDownY = mouseDown.pageY;
    //       const currentTarget = mouseDown.target;
    //       const currentLeft = Number(currentTarget.style.left.slice(0, -2));
    //       const currentTop = Number(currentTarget.style.top.slice(0, -2));

    //       // 按下超过100ms判定要拖动
    //       let cursorTask = setTimeout(() => {
    //         element.style.cursor = "move";
    //       }, 100);

    //       function onMouseMove(mouseMove) {
    //         currentTarget.style.left =
    //           currentLeft - mouseDownX + mouseMove.pageX + "px";
    //         currentTarget.style.top =
    //           currentTop - mouseDownY + mouseMove.pageY + "px";
    //       }
    //       function onMouseUp() {
    //         element.style.cursor = "";
    //         clearTimeout(cursorTask);
    //         document.body.removeEventListener("mousemove", onMouseMove);
    //       }
    //       document.body.addEventListener("mousemove", onMouseMove);
    //       document.body.addEventListener("mouseup", onMouseUp, { once: true });
    //     };
    //   }
    // };

    // 组件删除功能
    const deleteComponent = (e) => {
      if (e.keyCode === 46 && elementId != "designer") {
        const target = document.getElementById(elementId);
        container.current.removeChild(target);
      }
    };
    setTimeout(() => {
      for (let i = 0; i < container.current.childNodes.length; i++) {
        const temp = document.getElementById(
          container.current.childNodes[i].id
        );
        temp.onmousedown = (mouseDown) => {
          const mouseDownX = mouseDown.pageX;
          const mouseDownY = mouseDown.pageY;
          const currentTarget = mouseDown.target;
          const currentLeft = Number(currentTarget.style.left.slice(0, -2));
          const currentTop = Number(currentTarget.style.top.slice(0, -2));

          // 按下超过100ms判定要拖动
          let cursorTask = setTimeout(() => {
            temp.style.cursor = "move";
          }, 100);

          function onMouseMove(mouseMove) {
            currentTarget.style.left =
              currentLeft - mouseDownX + mouseMove.pageX + "px";
            currentTarget.style.top =
              currentTop - mouseDownY + mouseMove.pageY + "px";
          }
          function onMouseUp() {
            temp.style.cursor = "";
            clearTimeout(cursorTask);
            document.body.removeEventListener("mousemove", onMouseMove);
          }
          document.body.addEventListener("mousemove", onMouseMove);
          document.body.addEventListener("mouseup", onMouseUp, { once: true });
        };
      }
    }, 400);

    document.addEventListener("keydown", deleteComponent);
    container.current.addEventListener("click", activeComponent);
    return () => {
      element.removeEventListener("click", activeComponent);
      document.removeEventListener("keydown", deleteComponent);
    };
  }, []);

  useEffect(() => {
    const designer = document.getElementById("designer");
    designer.innerHTML = sessionStorage.getItem("designerHtml");
    PubSub.subscribe("save", (msg, data) => {
      deleteAttritube();
      PubSub.publish("innerHTML", designer.innerHTML);
      // 调用截图函数,传入结点，并保存图片的url
      let faceImg = generateImage(designer);

      //获取promise对象成功调用后的
      faceImg
        .then((src) => {
          // 将图片编码格式进行更改并发给服务器得到url
          const res = uploadfile(src);
          //  console.log(res)
          //  将得到的url传出去
          PubSub.publish("shotPic", res);
        })
        .catch((err) => {
          console.log("截图错误" + err);
        });
    });
    PubSub.subscribe("preview", (msg, data) => {
      deleteAttritube();
      sessionStorage.setItem("html", designer.innerHTML);
      setTimeout(() => {
        window.open("/preview");
      }, 100);
    });
    return () => {
      PubSub.unsubscribe("save");
      PubSub.unsubscribe("preview");
    };
  }, []);

  return (
    <div
      id="designer"
      ref={container}
      className={styles.Container}
      onDragOver={dragOver}
      onDrop={drop}
      data-type="div"
    ></div>
  );
};

export default Designer;
