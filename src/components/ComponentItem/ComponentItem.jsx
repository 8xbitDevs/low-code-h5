import React from 'react'
import styles from './ComponentItem.module.css'

const ComponentItem = ({ name, type, icon }) => {
  const drag = (e) => {
    e.dataTransfer.setData('type', type)
  }
  return (
    <div className={styles.Container} onDragStart={drag} draggable>
      <img src={`/assets/${icon}`} />
      <span className={styles.Name}>{name}</span>
    </div>
  )
}

export default ComponentItem