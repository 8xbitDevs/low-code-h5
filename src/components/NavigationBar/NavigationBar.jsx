import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavigationBar.module.css'

const NavigationBar = () => {
  return (
    <header className={styles.container}>
      <Link to='/'>
        <h3 className={styles.logo}>LowCode</h3>
      </Link >
    </header>
  )
}

export default NavigationBar