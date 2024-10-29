import { useState, useEffect } from 'react'
import PageHeader from "../components/PageHeader"
import styles from "../css/Issue.module.css"
import { getIssueByPage } from "../api/issue"
import IssueItem from '../components/IssueItem'
import AddIssue from '../components/AddIssueBtn'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'
import { Pagination } from 'antd'
import TypeSelect from '../components/TypeSelect'
import { useSelector } from 'react-redux'
export default function Issues() {
  const [issueList, setIssueList] = useState([])
  const { issueTypeId } = useSelector(state => state.type)
  // 分页信息
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 15,
    total: 0
  })
  let fetchIssueList = async () => {
    let searchParams = {
      current: pageInfo.current,
      pageSize: pageInfo.pageSize,
      issueStatus: true
    };
    if (issueTypeId !== "all") {
      searchParams.typeId = issueTypeId;
      // 如果按照分类进行查找，需要将当前页重新设置为第一页
      searchParams.current = 1;
    }
    let { data } = await getIssueByPage(searchParams)
    setIssueList(data.data)
    setPageInfo({
      current: data.currentPage,
      pageSize: data.eachPage,
      total: data.count
    })
  }
  let pageChange = (page, pageSize) => {
    setPageInfo({
      current: page,
      pageSize: pageSize
    })
  }
  useEffect(() => {
    fetchIssueList()
  }, [pageInfo.current, pageInfo.pageSize, issueTypeId])
  return (
    <div className="container">
      <PageHeader title="最新问答"><TypeSelect /></PageHeader>
      <div className={styles.issueContainer}>
        <div className={styles.leftSide}>
          {issueList.map((issue) => { return <IssueItem issueInfo={issue} key={issue._id} /> })}
          {issueList.length ? <div className='paginationContainer'>
            <Pagination showQuickJumper defaultCurrent={1} {...pageInfo} onChange={pageChange} />
          </div> : (<div className={styles.noIssue}>有问题，就来 coder station！</div>)}
        </div>
        <div className={styles.rightSide}>
          {/* 添加问答按钮 */}
          <AddIssue />
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
