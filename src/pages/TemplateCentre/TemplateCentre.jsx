import React, { useRef } from "react";
import { useEffect, useState } from "react";
import TemplateCard from "../../components/TemplateCard/TemplateCard";
import style from "./TemplateCentre.module.scss";

function TemplateCentre() {
  return (
    <div className={style.container}>
      <TemplateCard
        cardname="模板示例"
        description="这是一个模板示例"
        date="2022/07/30"
      ></TemplateCard>
    </div>
  );
}

export default TemplateCentre;
