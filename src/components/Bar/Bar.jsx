import React, { useRef } from "react";
import { useEffect, useState } from "react";
import style from "./Bar.module.scss";

function Bar(props) {
  const { click, content, HREF, active } = props;

  return (
    <a
      className={!active ? style.bar : `${style.bar} ${style.bar_active}`}
      onClick={() => click()}
      href={HREF}
      target="_blank"
    >
      {content}
    </a>
  );
}

export default Bar;
