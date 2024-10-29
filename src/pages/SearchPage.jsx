import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import AddIssueBtn from '../components/AddIssueBtn'
import PageHeader from '../components/PageHeader'
import Recommend from '../components/Recommend'
import ScoreRank from '../components/ScoreRank'
import { getIssueByPage } from "../api/issue"
import { getBookByPage } from "../api/book"
import { Pagination } from "antd"
import SearchResultItem from "../components/SearchResultItem"
import styles from "../css/SearchPage.module.css"
export default function SearchPage() {
    const location = useLocation()
    const [searchResult, setSearchResult] = useState([])
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total: 0
    })
    const fetchData = async (state) => {
        const { value, searchValue } = state;
        let searchParams = {
            current: pageInfo.current,
            pageSize: pageInfo.pageSize,
            issueStatus: true,
        };
        if (searchValue === "issue") {
            searchParams.issueTitle = value
        } else if (searchValue === "book") {
            searchParams.bookTitle = value
        }
        const {data} = searchValue === "issue" ? await getIssueByPage(searchParams) : await getBookByPage(searchParams)
        setSearchResult(data.data)
        setPageInfo({
            ...pageInfo,
            total: data.total
        })
    }
    const handlePageChange = (page, pageSize) => {
        setPageInfo({
            ...pageInfo,
            current: page,
            pageSize
        })
    }
    useEffect(() => {
        if (location.state) {
            fetchData(location.state)
        }
    }, [location.state, pageInfo.current, pageInfo.pageSize])
    return (
        <div className="container">
            <PageHeader title="搜索结果" />
            <div className={styles.searchPageContainer}>
                {/* 左边部分 */}
                <div className={styles.leftSide}>
                    {
                        searchResult.map(item => {
                            return <SearchResultItem info={item} key={item._id} />
                        })
                    }
                    {
                        searchResult.length > 0 ? (
                            <div className="paginationContainer">
                                <Pagination showQuickJumper defaultCurrent={1} {...pageInfo} onChange={handlePageChange} />
                            </div>
                        ) : (<div className={styles.noResult}>未搜索到符合条件的条目</div>)
                    }
                </div>
                {/* 右边部分 */}
                <div className={styles.rightSide}>
                    <AddIssueBtn />
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
