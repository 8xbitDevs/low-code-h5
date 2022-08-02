import React, { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Bar.module.scss";

function Bar(props) {
  const { click, content, active, src } = props;

  return (
    <div
      className={!active ? style.bar : `${style.bar} ${style.bar_active}`}
      onClick={() => click()}
    >
      <a href={src} target='_blank'>{content}</a>
      
    </div>
  );
}

export default Bar;
