import React, { useRef, useState } from 'react'
import styles from './Designer.module.css'
import { createElement } from './DesignerHelper';
import './TemplateStyle.css'

const Designer = () => {
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

  return (
    <div ref={container} className={styles.Container}
      onDragOver={dragOver}
      onDrop={drop}
    >
    </div>
  )
}

export default Designer