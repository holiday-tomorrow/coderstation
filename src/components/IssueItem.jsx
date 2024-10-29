import { useState, useEffect } from 'react'
import { formatDate } from "../utils/tool"
import styles from "../css/IssueItem.module.css"
import { Tag } from 'antd'
import { getTypeList } from '../redux/typeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from "../api/user"
import { useNavigate } from 'react-router-dom'
export default function IssueItem(props) {
    const navigate = useNavigate()
    const { typeList } = useSelector(state => state.type);
    const [userInfo, setUserInfo] = useState({});
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
    const dispatch = useDispatch()
    useEffect(() => {
        if (!typeList.length) {
            dispatch(getTypeList())
        }
        async function getUser() {
            let { data } = await getUserById(props.issueInfo.userId)
            setUserInfo(data)
        }
        getUser()
    }, [])
    const type = typeList.find(item => item._id === props.issueInfo.typeId);
    return (
        <div className={styles.container} onClick={() => navigate(`/issues/${props.issueInfo._id}`)}>
            {/* 回答数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.commentNumber}</div>
                <div>回答</div>
            </div>
            {/* 浏览数 */}
            <div className={styles.issueNum}>
                <div>{props.issueInfo.scanNumber}</div>
                <div>浏览</div>
            </div>
            {/* 问题内容 */}
            <div className={styles.issueContainer}>
                <div className={styles.top}>{props.issueInfo.issueTitle}</div>
                <div className={styles.bottom}>
                    <div className={styles.left}>
                        <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>{type?.typeName}</Tag>
                    </div>
                    <div className={styles.right}>
                        <Tag color="volcano">{userInfo?.nickname}</Tag>
                        <span>{formatDate(props.issueInfo.issueDate, "year")}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
