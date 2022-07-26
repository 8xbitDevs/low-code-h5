import React, { useRef, useState } from 'react'
import AttributesPanel from '../../components/AttributesPanel/AttributesPanel';
import ComponentItem from '../../components/ComponentItem/ComponentItem';
import Designer from '../../components/Designer/Designer';
import styles from './Editor.module.css'

const components = [
  { type: 'button', name: '按钮', icon: 'button-icon.svg' },
  { type: 'img', name: '图片', icon: 'picture-icon.svg' },
  { type: 'video', name: '视频', icon: 'video-icon.svg' },
  { type: 'span', name: '文本', icon: 'text-icon.svg' },
  { type: 'a', name: '链接', icon: 'link-icon.svg' },
]

const Editor = () => {
  const componentSide = useRef(null);
  const [opened, setOpened] = useState(true);

  const handleCollapse = () => {
    if (opened) {
      componentSide.current.style.width = '0';
      componentSide.current.style.padding = '0';
      setOpened(false);
    } else {
      componentSide.current.style.width = '245px';
      componentSide.current.style.padding = '1rem';
      setOpened(true);
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.CollapseWrapper}>
        <aside ref={componentSide} className={styles.AsideContainer}>
          {
            components.map((component, index) =>
              <ComponentItem key={index} {...component} />
            )
          }
        </aside>
        <button className={styles.Collapse} onClick={handleCollapse}></button>
      </div>
      <section className={styles.WorkArea}>
        <Designer />
      </section>
      <AttributesPanel />
    </div>
  );
};

export default Editor