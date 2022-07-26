import React from 'react'
import styles from './ComponentItem.module.css'

const ComponentItem = ({ name, type, icon }) => {
  return (
    <div className={styles.Container} draggable>
      <img src={`/assets/${icon}`} />
      <span className={styles.Name}>{name}</span>
    </div>
  )
}

export default ComponentItem