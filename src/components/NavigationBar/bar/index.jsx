import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import styles from './index.module.scss'
function Bar(props) {
    const bar = useRef()
    useEffect(() => {
        console.log(props.name)
        console.log(bar.current.innerHTML)
        bar.current.innerHTML = props.name
    },[])

    return (
        <div ref={bar} className={styles.bar}>
        
        </div>
    )
}

export default Bar