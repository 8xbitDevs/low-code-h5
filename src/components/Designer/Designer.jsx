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
    if (focusComponent.current && page.currentComponent.attributes) {
      console.log(page.currentComponent.attributes)
      focusComponent.current.style.top = page.currentComponent.attributes.top + 'px';
      focusComponent.current.style.left = page.currentComponent.attributes.left + 'px';
      focusComponent.current.style.height = page.currentComponent.attributes.height + 'px';
      focusComponent.current.style.width = page.currentComponent.attributes.width + 'px';
    }
  }, [page.currentComponent.change])

  // 组件焦点处理
  useEffect(() => {
    function activeComponent(event) {
      if (focusComponent.current) {
        focusComponent.current.style.border = '';
      }
      focusComponent.current = event.target;
      focusComponent.current.style.border = '2px #1890ff solid';

      dispatch(updateCurrentComponentIdType({ id: focusComponent.current.id, type: focusComponent.current.dataset.type }));
      dispatch(updateCurrentComponentAttributes({
        attributes: {
          top: focusComponent.current.style.top.slice(0, -2),
          left: focusComponent.current.style.left.slice(0, -2),
          width: focusComponent.current.style.width.slice(0, -2),
          height: focusComponent.current.style.height.slice(0, -2)
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