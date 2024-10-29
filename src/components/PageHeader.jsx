import React from 'react'
import styles from "../css/PageHeader.module.css"
export default function PageHeader(props) {
    return (
        <div className={styles.row}>
            <div className={styles.pageHeader}>
                {props.title}
            </div>
            {props.children}
        </div>
    )
}
