import React, { useEffect, useRef } from 'react';
import { createElement } from './DesignerHelper';
import { useDispatch, useSelector } from 'react-redux';
import { selectPage, updateCurrentComponentIdType } from '../../store/page/pageSlice';
import styles from './Designer.module.css';
import './TemplateStyle.css';

const Designer = () => {
  const page = useSelector(selectPage);
  const dispatch = useDispatch();
  const focusComponent = useRef(null);
  const container = useRef(null);

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

  useEffect(() => {
    if (focusComponent.current && page.currentComponent.attributes) {
      console.log(page.currentComponent.attributes)
      focusComponent.current.style.top = page.currentComponent.attributes.top + 'px';
    }
  }, [page.currentComponent.change])

  useEffect(() => {
    function activeComponent(event) {
      if (focusComponent.current) {
        focusComponent.current.style.border = '';
      }
      focusComponent.current = event.target;
      focusComponent.current.style.border = '2px #1890ff solid';

      dispatch(updateCurrentComponentIdType({ id: focusComponent.current.id, type: focusComponent.current.dataset.type }))
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
    >
    </div>
  )
}

export default Designer