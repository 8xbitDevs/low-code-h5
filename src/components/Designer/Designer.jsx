import React, { useEffect, useRef, useState } from "react";
import { createElement } from "./DesignerHelper";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPage,
  updateCurrentComponentAttributes,
  updateCurrentComponentIdType,
} from "../../store/page/pageSlice";
import styles from "./Designer.module.css";
import "./TemplateStyle.css";

// 引入
import html2canvas from "html2canvas";
import Canvas2Image from "./canvas2image.js";

const Designer = () => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const focusComponent = useRef(null);
  const container = useRef(null);
  const [id, setId] = useState("");
  const [html, setHtml] = useState("");

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

  // 截图函数
  function generateImage(designer) {
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
      ); //将绘制好的画布转换为img标签,默认图片格式为PNG.

      // 此处代码是为了下载到本地
      //  document.body.appendChild(img); //在body元素后追加的图片元素至页面，也可以不追加，直接做处理

      // 生成一个a超链接元素
      // var a = document.createElement('a');
      // 创建一个单击事件
      // var event = new MouseEvent('click');

      // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
      // a.download = name || '下载图片名称';
      // a.href = img.src;//将img的src值设置为a.href属性，img.src为base64编码值

      // 触发a的单击事件
      // a.dispatchEvent(event);

      // 将图片的url传递出去
      return img.src;
    });
    return imgSrc;
  }

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
    function activeComponent(event) {
      // 上个获得焦点的组件
      if (focusComponent.current) {
        focusComponent.current.style.boxShadow = "";
      }
      // 设为当前点击的组件
      focusComponent.current = event.target;
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
              src:focusComponent.current.src,
            },
            video: {
                src:focusComponent.current.src,
            }
          },
          change: page.currentComponent.change,
        })
      );
    }

    container.current.addEventListener("click", activeComponent);
    return () => {
      element.removeEventListener("click", activeComponent);
    };
  }, []);

  useEffect(() => {
    const designer = document.getElementById("designer");
    designer.innerHTML = page.saveData.html
    PubSub.subscribe("save", (msg, data) => {
      PubSub.publish('innerHTML', designer.innerHTML)
      // console.log(designer.innerHTML);
      // 调用截图函数,传入结点，并保存图片的url
      // let faceImg = generateImage(designer);
      // console.log(faceImg);
    });
    return () => {
      PubSub.unsubscribe('save')
    }
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
