import { useState } from 'react';
import { Avatar } from 'antd';
import styles from "../css/ScoreItem.module.css"
import classname from 'classnames'

function ScoreItem(props) {
    // const [classCollection] = useState({
    //     'iconfont': true,
    //     'icon-jiangbei': true,
    // })
    const iconMap = {
        1: '#ffda23',
        2: '#c5c5c5',
        3: '#cd9a62',
    }

    // let rankNum = null;
    // switch (props.rank) {
    //     case 1: {
    //         rankNum = (
    //             <div style={{
    //                 color: '#ffda23',
    //                 fontSize: '22px'
    //             }} className={classname(classCollection)}></div>
    //         )
    //         break;
    //     }
    //     case 2: {
    //         rankNum = (
    //             <div style={{
    //                 color: '#c5c5c5',
    //                 fontSize: '22px'
    //             }} className={classname(classCollection)}></div>
    //         )
    //         break;
    //     }
    //     case 3: {
    //         rankNum = (
    //             <div style={{
    //                 color: '#cd9a62',
    //                 fontSize: '22px'
    //             }} className={classname(classCollection)}></div>
    //         )
    //         break;
    //     }
    //     default: {
    //         rankNum = (
    //             <div className={styles.rank}>{props.rank}</div>
    //         )
    //     }
    // }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                {[1, 2, 3].includes(+props.rank) ? <div style={{
                    color: iconMap[props.rank],
                    fontSize: '22px'
                }} className='iconfont icon-jiangbei'></div> : <div className={styles.rank}>{props.rank}</div>}
                <div className={styles.avatar}>
                    <Avatar size="small" src={props.rankInfo.avatar} />
                </div>
                <div className={styles.nickname}>{props.rankInfo.nickname}</div>
            </div>
            <div className={styles.right}>{props.rankInfo.points}</div>
        </div>
    );
}

export default ScoreItem;
