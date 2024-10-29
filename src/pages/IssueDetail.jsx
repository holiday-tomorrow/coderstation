import { useState, useEffect } from 'react'
import PageHeader from '../components/PageHeader'
import styles from '../css/IssueDetail.module.css'
import { useParams } from 'react-router-dom'
import Discuss from '../components/Discuss'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'
import { getIssueById } from '../api/issue'
import { getUserById } from '../api/user'
import { formatDate } from '../utils/tool'
import { Avatar } from 'antd'
export default function IssueDetail() {
    const { id } = useParams()
    const [issueInfo, setIssueInfo] = useState({})
    const [issueUser, setIssueUser] = useState({})

    useEffect(() => {
        getIssueById(id).then((res) => {
            setIssueInfo(res.data)
            console.log(res.data);
            getUserById(res.data.userId).then((res) => {
                setIssueUser(res.data)
            })
        })
    },[id])
    return (
        <div className={styles.container}>
            <PageHeader title="最新问答" />
            <div className={styles.detailContainer}>
                <div className={styles.leftSide}>
                    <div className={styles.question}>
                        <h1>{issueInfo?.issueTitle}</h1>
                        <div className={styles.questioner}>
                            <Avatar size="small" src={issueUser?.avatar} />
                            <span className={styles.user}>{issueUser?.nickname}</span>
                            <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
                        </div>
                        <div className={styles.content}>
                            <div dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}></div>
                        </div>
                    </div>
                    {/* 下方评论模块 */}
                    <Discuss
                        issueInfo={issueInfo}
                        commentType={1}
                        targetId={issueInfo?._id}
                    />
                </div>
                {/* 右侧 */}
                <div className={styles.rightSide}>
                    <div style={{ marginBottom: 20 }}>
                        <Recommend />
                    </div>
                    <div style={{ marginBottom: 20 }}>
                        <ScoreRank />
                    </div>
                </div>
            </div>
        </div>
    )
}
