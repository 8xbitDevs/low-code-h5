import React, { useRef, useState } from 'react'
import styles from './AttributesPanel.module.css'
import PropertyEditor from '../PropertyEditor/index';

const AttributesPanel = () => {
  const [width, setWidth] = useState(345);

  const handleResize = (mouseDownEvent) => {
    const initialWidth = width;
    const mouseDownX = mouseDownEvent.pageX;

    function onMouseMove(mouseMoveEvent) {
      setWidth(prev => (initialWidth + mouseDownX - mouseMoveEvent.pageX));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };

  return (
    <div style={{ width: width }} className={styles.Container}>
      <div className={styles.OverflowHidden}>
        <PropertyEditor />
      </div>
      <button className={styles.ColResize} onMouseDown={handleResize}>|</button>
    </div>
  )
}

export default AttributesPanel