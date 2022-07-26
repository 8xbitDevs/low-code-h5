import { current } from "@reduxjs/toolkit";

// 创建模板元素
export const createElement = (type, { top, left }) => {
  const element = document.createElement(type);
  element.id = Date.now();
  element.style.boxSizing = 'content-box';
  element.style.top = top;
  element.style.left = left;
  element.style.borderStyle = 'solid';
  element.style.display = 'block';
  element.style.margin = '0';
  element.style.borderWidth = '0';
  element.style.padding = '0';
  // 设置各模板元素特有属性
  switch (type) {
    case 'button': createButtonAttributes(element, top, left); break;
    case 'span': createSpanAttributes(element, top, left); break;
    case 'a': createAAttributes(element, top, left); break;
    case 'img': createImgAttributes(element, top, left); break;
    case 'video': createVideoAttributes(element, top, left);
  }
  dragElemnt(element)
  return element;
}

// 拖拽还是缩放
export const dragElemnt = (element) => {
  // 初始化鼠标参数
  let mouseStuate = -1
  // 鼠标移动时坐标变换
  element.onmousemove = (mouseMove) => {
    const mouseMoveX = mouseMove.pageX;
    const mouseMoveY = mouseMove.pageY;

    const currentTarget = mouseMove.target;
    const currentLeft = Number(currentTarget.style.left.slice(0, -2));
    const currentTop = Number(currentTarget.style.top.slice(0, -2));

    // 获取鼠标相对于盒子的坐标
    const x = mouseMoveX - (currentLeft + currentTarget.parentNode.offsetLeft)
    const y = mouseMoveY - (currentTop + currentTarget.parentNode.offsetTop)

    // 获取盒子大小
    const currentTargetHeight = parseInt(currentTarget.style.height)
    const currentTargetWidth = parseInt(currentTarget.style.width)

    const range = 3
    if ((-range <= x && x <= range) && (-range <= y && y <= range)) {
      mouseStuate = 0
      element.style.cursor = 'nwse-resize'
    }
    else if ((range < x && x < currentTargetWidth - range) && (-range <= y && y <= range)) {
      mouseStuate = 1
      element.style.cursor = 'ns-resize'
    }
    else if ((currentTargetWidth - range <= x && x <= currentTargetWidth + range) && (-range <= y && y <= range)) {
      mouseStuate = 2
      element.style.cursor = 'nesw-resize'
    }
    else if ((currentTargetWidth - range <= x && x <= currentTargetWidth + range) && (range < y && y < currentTargetHeight - range)) {
      mouseStuate = 3
      element.style.cursor = 'ew-resize'
    }
    else if ((currentTargetWidth - range <= x && x <= currentTargetWidth + range) && (currentTargetHeight - range <= y && y <= currentTargetHeight + range)) {
      mouseStuate = 4
      element.style.cursor = 'nwse-resize'
    }
    else if ((range < x && x < currentTargetWidth - range) && (currentTargetHeight - range <= y && y <= currentTargetHeight + range)) {
      mouseStuate = 5
      element.style.cursor = 'ns-resize'
    }
    else if ((-range <= x && x <= range) && (currentTargetHeight - range <= y && y <= currentTargetHeight + range)) {
      mouseStuate = 6
      element.style.cursor = 'nesw-resize'
    }
    else if ((-range <= x && x <= range) && (range < y && y < currentTargetHeight - range)) {
      mouseStuate = 7
      element.style.cursor = 'ew-resize'
    }
    else {
      mouseStuate = -1
      element.style.cursor = ''
    }
  }


  // 判断为拖拽还是缩放
  element.onmousedown = (mouseDown) => {
    const mouseDownX = mouseDown.pageX;
    const mouseDownY = mouseDown.pageY;

    const currentTarget = mouseDown.target;

    const currentLeft = Number(currentTarget.style.left.slice(0, -2));
    const currentTop = Number(currentTarget.style.top.slice(0, -2));

    // 获取盒子大小
    const currentTargetHeight = parseInt(currentTarget.style.height)
    const currentTargetWidth = parseInt(currentTarget.style.width)

    //存放按下鼠标的一瞬间的状态
    let mouseDownStuate = mouseStuate
    // console.log(mouseDownStuate)
    // 按下超过100ms判定要拖动
    let cursorTask = setTimeout(() => {
      // 判断是否需要进行缩放
      if (mouseStuate == -1) {
        element.style.cursor = 'move';
      }
    }, 100);

    function onMouseMove(mouseMove) {
      const mouseMoveX = mouseMove.pageX;
      const mouseMoveY = mouseMove.pageY;

      // 当物体处于一定小的状态，图片大小和位置无法更改
      const w = parseInt(currentTarget.style.width)
      const h = parseInt(currentTarget.style.height)

      // 获取鼠标相对于盒子的坐标
      const x = mouseMoveX - (currentLeft + currentTarget.parentNode.offsetLeft)
      const y = mouseMoveY - (currentTop + currentTarget.parentNode.offsetTop)

      // 若为拖拽
      if (mouseDownStuate === -1) {
        currentTarget.style.left = currentLeft - mouseDownX + mouseMoveX + 'px';
        currentTarget.style.top = currentTop - mouseDownY + mouseMoveY + 'px';
      }

      // 若为缩放,实现图像缩放功能
      else if ((-1 < mouseDownStuate) && (w >= 5 && h >= 5)) {
        // 左上一角改动，需要更改top和left
        if (mouseDownStuate === 0) {
          // 顶点移动的位置 
          // 正常大小时,既能收缩也能放大
          currentTarget.style.left = currentLeft - mouseDownX + mouseMoveX + 'px';
          currentTarget.style.top = currentTop - mouseDownY + mouseMoveY + 'px';

          // 改变图片大小
          currentTarget.style.width = -x + currentTargetWidth + 'px'
          currentTarget.style.height = -y + currentTargetHeight + 'px'
        }
        // 右上一角改动，只需要改变top
        else if (mouseDownStuate === 2) {
          // 改变
          currentTarget.style.top = currentTop - mouseDownY + mouseMoveY + 'px';
          // 改变图片大小
          currentTarget.style.width = x + 'px'
          currentTarget.style.height = -y + currentTargetHeight + 'px'
        }
        // 右下，仅需要改变图片大小即可
        else if (mouseDownStuate === 4) {
          // 改变图片大小
          currentTarget.style.width = x + 'px'
          currentTarget.style.height = y + 'px'
        }
        // 左下一角改动，只需要改变left
        else if (mouseDownStuate === 6) {
          // 改变
          currentTarget.style.left = currentLeft - mouseDownX + mouseMoveX + 'px';
          // 改变图片大小
          currentTarget.style.width = -x + currentTargetWidth + 'px'
          currentTarget.style.height = y + 'px'
        }
        // 上方中间，改变top，只改变图片的高度
        else if (mouseDownStuate === 1) {
          currentTarget.style.top = currentTop - mouseDownY + mouseMoveY + 'px';
          currentTarget.style.height = -y + currentTargetHeight + 'px'
        }

        // 右方中间，只改变图像的宽度
        else if (mouseDownStuate === 3) {
          currentTarget.style.width = x + 'px'
        }

        // 下方中间，只改变图像的高度
        else if (mouseDownStuate === 5) {
          currentTarget.style.height = y + 'px'
        }

        // 左方中间，改变图像的left和宽度
        else if (mouseDownStuate === 7) {
          // 改变
          currentTarget.style.left = currentLeft - mouseDownX + mouseMoveX + 'px';
          currentTarget.style.width = -x + currentTargetWidth + 'px'
        }
      }
      // 否则图像只能进行放大,需要重新按下鼠标
      else {
        mouseDownStuate = -999
        if (w < 5) {
          currentTarget.style.width = '5px'
        }
        if (h < 5) {
          currentTarget.style.height = '5px'
        }
      }
    }

    function onMouseUp() {
      element.style.cursor = '';
      clearTimeout(cursorTask);
      document.body.removeEventListener("mousemove", onMouseMove)
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });

  };
}

const createButtonAttributes = (el, top, left) => {
  el.className = 'template_button';
  el.innerHTML = '按钮';
  el.dataset.type = 'button';
  el.style.width = '72px';
  el.style.height = '48px';
  el.style.left = left - 36 + 'px';
  el.style.top = top - 24 + 'px';
  el.style.borderRadius = '0px';
  el.style.fontSize = '12px';
  el.dataset.switch = "false"
  el.dataset.cli = "single"
  el.dataset.act = "jump"
  el.dataset.jumpTo = ""
}
const createSpanAttributes = (el, top, left) => {
  el.style.borderRadius = '0px',
    el.className = 'template_text';
  el.dataset.type = 'span';
  el.innerHTML = '文本';
  el.style.fontSize = '12px';
  el.contentEditable = true;
  el.style.display = 'inline-block';
  el.style.width = '72px';
  el.style.height = '48px';
  el.style.left = left - 36 + 'px';
  el.style.top = top - 48 + 'px';
}
const createAAttributes = (el, top, left) => {
  el.className = 'template_link';
  el.dataset.type = 'a';
  el.innerHTML = '链接';
  el.contentEditable = true;
  el.style.width = '48px';
  el.style.height = '24px';
  el.style.left = left - 24 + 'px';
  el.style.top = top - 12 + 'px';
  el.href = ''
}
const createImgAttributes = (el, top, left) => {
  el.className = 'template_image';
  el.dataset.type = 'img';
  el.draggable = false;
  el.src = "https://lowcode.wyy.ink/api/files/20220819/f306a900aeed495ea11d774a98c82e9926071c3abd784af8b8e28e7441e87bb8.png";
  el.style.width = '128px';
  el.style.height = '128px';
  el.style.left = left - 64 + 'px';
  el.style.top = top - 64 + 'px';
}
const createVideoAttributes = (el, top, left) => {
  el.className = 'template_video';
  el.dataset.type = 'video';
  // 跨域
  el.crossOrigin = 'Anonymous'
  el.src = "https://lowcode.wyy.ink/api/files/20220816/b1a9a3273903415bbe4405df5324e530f5bb50207745470a807d058a0923601a.mp4";
  el.loop = true;
  el.controls = true;
  el.style.width = '320px';
  el.style.height = '240px';
  el.style.left = left - 160 + 'px';
  el.style.top = top - 120 + 'px';
}


