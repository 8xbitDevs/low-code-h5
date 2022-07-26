import React, { useCallback, useRef } from 'react'
import ComponentItem from '../../components/ComponentItem/ComponentItem';
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
  const handleCollapse = useCallback(() => {
    let opened = true;
    return function () {
      if (opened) {
        componentSide.current.style.width = '0';
        componentSide.current.style.padding = '0';
        opened = false;
      } else {
        componentSide.current.style.width = '245px';
        componentSide.current.style.padding = '1rem';
        opened = true;
      }
    }
  }, [componentSide]);

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
        <button className={styles.Collapse} onClick={handleCollapse()}></button>
      </div>
      <aside>

      </aside>
    </div>
  );
};

export default Editor