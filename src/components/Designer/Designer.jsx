import React, { useEffect, useRef } from 'react';
import { createElement } from './DesignerHelper';
import { useDispatch, useSelector } from 'react-redux';
import { selectPage, updateCurrentComponentAttributes, updateCurrentComponentIdType } from '../../store/page/pageSlice';
import styles from './Designer.module.css';
import './TemplateStyle.css';

const Designer = () => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const focusComponent = useRef(null);
  const container = useRef(null);

  // 放置组件
  const drop = (e) => {
    const type = e.dataTransfer.getData('type');
    container.current.appendChild(createElement(type, {
      top: e.clientY - container.current.offsetTop,
      left: e.clientX - container.current.offsetLeft
    }));
  }

  const dragOver = (e) => {
    e.preventDefault();
  }

  // 同步更新编辑区
  useEffect(() => {
    if (focusComponent.current) {
      console.log(page.currentComponent.attributes)
      focusComponent.current.style.top = page.currentComponent.attributes.top + 'px';
      focusComponent.current.style.left = page.currentComponent.attributes.left + 'px';
      focusComponent.current.style.height = page.currentComponent.attributes.height + 'px';
      focusComponent.current.style.width = page.currentComponent.attributes.width + 'px';
      focusComponent.current.style.margin = page.currentComponent.attributes.mbp[0].join('px ') + 'px';
      focusComponent.current.style.borderWidth = page.currentComponent.attributes.mbp[1].join('px ') + 'px';
      focusComponent.current.style.padding = page.currentComponent.attributes.mbp[2].join('px ') + 'px';
      focusComponent.current.style.borderColor = page.currentComponent.attributes.borderColor;
    }
  }, [page.currentComponent.change])

  // 组件焦点处理
  useEffect(() => {
    function activeComponent(event) {
      // 上个获得焦点的组件
      if (focusComponent.current) {
        focusComponent.current.style.boxShadow = '';
      }
      // 设为当前点击的组件
      focusComponent.current = event.target;
      focusComponent.current.style.boxShadow = '0px 0px 0px 1px #1890ff';

      dispatch(updateCurrentComponentIdType({ id: focusComponent.current.id, type: focusComponent.current.dataset.type }));

      let margin = [
        focusComponent.current.style.marginTop.slice(0, -2),
        focusComponent.current.style.marginRight.slice(0, -2),
        focusComponent.current.style.marginBottom.slice(0, -2),
        focusComponent.current.style.marginLeft.slice(0, -2)
      ];

      let borderWidth = [
        focusComponent.current.style.borderTopWidth.slice(0, -2),
        focusComponent.current.style.borderRightWidth.slice(0, -2),
        focusComponent.current.style.borderBottomWidth.slice(0, -2),
        focusComponent.current.style.borderLeftWidth.slice(0, -2)
      ];

      let padding = [
        focusComponent.current.style.paddingTop.slice(0, -2),
        focusComponent.current.style.paddingRight.slice(0, -2),
        focusComponent.current.style.paddingBottom.slice(0, -2),
        focusComponent.current.style.paddingLeft.slice(0, -2)
      ];

      dispatch(updateCurrentComponentAttributes({
        attributes: {
          ...page.currentComponent.attributes,
          top: focusComponent.current.style.top.slice(0, -2),
          left: focusComponent.current.style.left.slice(0, -2),
          width: focusComponent.current.style.width.slice(0, -2),
          height: focusComponent.current.style.height.slice(0, -2),
          mbp: [
            [margin[0], margin[1]?.trimStart(), margin[2]?.trimStart(), margin[3]?.trimStart()],
            [borderWidth[0], borderWidth[1]?.trimStart(), borderWidth[2]?.trimStart(), borderWidth[3]?.trimStart()],
            [padding[0], padding[1]?.trimStart(), padding[2]?.trimStart(), padding[3]?.trimStart()]
          ]
        },
        change: page.currentComponent.change
      }));
    }

    container.current.addEventListener('click', activeComponent);

    return () => {
      container.current.removeEventListener('click', activeComponent);
    }
  }, [])

  return (
    <div id='designer' ref={container} className={styles.Container}
      onDragOver={dragOver}
      onDrop={drop}
      data-type="div"
    >
    </div>
  )
}

export default Designer