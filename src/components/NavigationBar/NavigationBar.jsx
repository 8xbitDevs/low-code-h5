import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavigationBar.module.scss'
import Bar from './bar'

const NavigationBar = () => {
  return (
    <header className={styles.container}>
      <Link to='/'>
        <h3 className={styles.logo}>8xbitsDevs</h3>
      </Link >
      <div className={styles.barLayout}>
        <Bar name='Gitee'></Bar>
        <Bar name='Github'></Bar>
      </div>
    </header>
  )
}

export default NavigationBar