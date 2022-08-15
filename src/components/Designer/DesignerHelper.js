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

  // 拖动处理
  element.onmousedown = (mouseDown) => {
    const mouseDownX = mouseDown.pageX;
    const mouseDownY = mouseDown.pageY;
    const currentTarget = mouseDown.target;
    const currentLeft = Number(currentTarget.style.left.slice(0, -2));
    const currentTop = Number(currentTarget.style.top.slice(0, -2));

    // 按下超过100ms判定要拖动
    let cursorTask = setTimeout(() => {
      element.style.cursor = 'move';
    }, 100);

    function onMouseMove(mouseMove) {
      currentTarget.style.left = currentLeft - mouseDownX + mouseMove.pageX + 'px';
      currentTarget.style.top = currentTop - mouseDownY + mouseMove.pageY + 'px';
    }
    function onMouseUp() {
      element.style.cursor = '';
      clearTimeout(cursorTask);
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return element;
}

const createButtonAttributes = (el, top, left) => {
  el.className = 'template_button';
  el.innerHTML = '按钮';
  el.dataset.type = 'button';
  el.style.width = '48px';
  el.style.height = '24px';
  el.style.left = left - 24 + 'px';
  el.style.top = top - 12 + 'px';
  el.style.borderRadius = '0px',
  el.style.fontSize = '12px'
}
const createSpanAttributes = (el, top, left) => {
  el.style.borderRadius = '0px',
  el.className = 'template_text';
  el.dataset.type = 'span';
  el.innerHTML = '文本';
  el.contentEditable = true;
  el.style.display = 'inline-block';
  el.style.width = '48px';
  el.style.height = '24px';
  el.style.left = left - 24 + 'px';
  el.style.top = top - 12 + 'px';
}
const createAAttributes = (el, top, left) => {
  el.className = 'template_link';
  el.dataset.type = 'a';
  el.innerHTML = '链接';
  // el.onClick = 'return false'
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
  el.src = "http://lowcode.wyy.ink/api/files/20220815/171f7028c6efcc4d73925829418854bd91.png";
  el.style.width = '128px';
  el.style.height = '128px';
  el.style.left = left - 64 + 'px';
  el.style.top = top - 64 + 'px';
}
const createVideoAttributes = (el, top, left) => {
  el.className = 'template_video';
  el.dataset.type = 'video';
  el.src = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";
  el.loop = true;
  el.controls = true;
  el.style.width = '320px';
  el.style.height = '240px';
  el.style.left = left - 160 + 'px';
  el.style.top = top - 120 + 'px';
}
