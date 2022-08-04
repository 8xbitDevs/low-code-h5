export const createElement = (type, { top, left }) => {
  const element = document.createElement(type);
  element.id = Date.now();
  element.style.top = top;
  element.style.left = left;
  switch (type) {
    case 'button': createButtonAttributes(element, top, left); break;
    case 'span': createSpanAttributes(element, top, left); break;
    case 'a': createAAttributes(element, top, left); break;
    case 'img': createImgAttributes(element, top, left); break;
    case 'video': createVideoAttributes(element, top, left);
  }

  element.onmousedown = (mouseDown) => {
    const mouseDownX = mouseDown.pageX;
    const mouseDownY = mouseDown.pageY;
    const currentTarget = mouseDown.target;
    const currentLeft = Number(currentTarget.style.left.slice(0, -2));
    const currentTop = Number(currentTarget.style.top.slice(0, -2));

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
  el.style.left = left - 24 + 'px';
  el.style.top = top - 12 + 'px';
}
const createSpanAttributes = (el, top, left) => {
  el.className = 'template_text';
  el.innerHTML = '文本';
  el.contentEditable = true;
  el.style.left = left - 24 + 'px';
  el.style.top = top - 12 + 'px';
}
const createAAttributes = (el, top, left) => {
  el.className = 'template_link';
  el.innerHTML = '链接';
  el.style.left = left - 24 + 'px';
  el.style.top = top - 12 + 'px';
}
const createImgAttributes = (el, top, left) => {
  el.className = 'template_image';
  el.draggable = false;
  el.src = "https://cn.vitejs.dev/logo-with-shadow.png";
  el.style.left = left - 64 + 'px';
  el.style.top = top - 64 + 'px';
}
const createVideoAttributes = (el, top, left) => {
  el.className = 'template_video';
  el.src = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm";
  el.loop = true;
  el.controls = true;
  el.style.left = left - 160 + 'px';
  el.style.top = top - 120 + 'px';
}
