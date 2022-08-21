import React, { useRef, useState } from "react";
import styles from "./AttributesPanel.module.scss";
import PropertyEditor from "../PropertyEditor/index";
import ActionEditor from "../ActionEditor";

const AttributesPanel = () => {
  const [width, setWidth] = useState(345);
  const [navsel, setnavsel] = useState(0);

  const sel = (pos) => {
    if (pos === "left") {
      setnavsel(0)
    }
    if (pos === "right") {
      setnavsel(1)
    }
  }

  const handleResize = (mouseDownEvent) => {
    const initialWidth = width;
    const mouseDownX = mouseDownEvent.pageX;

    function onMouseMove(mouseMoveEvent) {
      setWidth((prev) => initialWidth + mouseDownX - mouseMoveEvent.pageX);
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
        <div className={styles.nav}>
          <div className={navsel ? styles.barLeft : `${styles.barLeft} ${styles.barLeft_act}`} onClick={()=>sel("left")}>样式</div>
          <div className={!navsel ? styles.barRight : `${styles.barRight} ${styles.barRight_act}`} onClick={()=>sel("right")}>动作</div>
        </div>
        <div style={{ display: navsel ? "none" : "block" }}>
          <PropertyEditor type="span" />
        </div>
        <div style={{ display: !navsel ? "none" : "block" }}>
          <ActionEditor />
        </div>
      </div>
      <button className={styles.ColResize} onMouseDown={handleResize}>
        |
      </button>
    </div>
  );
};

export default AttributesPanel;
