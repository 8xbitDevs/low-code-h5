import React, { useRef } from "react";
import { useEffect, useState } from "react";
import style from "./Bar.module.scss";

function Bar(props) {
  const { click, content, active } = props;

  return (
    <div
      className={!active ? style.bar : `${style.bar} ${style.bar_active}`}
      onClick={() => click()}
    >
      {content}
    </div>
  );
}

export default Bar;
