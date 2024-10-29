import { useState, useEffect } from 'react';
import { Card } from 'antd';

import ScoreItem from "./ScoreItem"
import { getUserByPointsRank } from "../api/user"
export default function ScoreRank() {
    let [rankList, setRankList] = useState([])
    let fetchRankList = async () => {
        let { data } = await getUserByPointsRank()
        setRankList(data)
    }
    useEffect(() => {
        fetchRankList()
    }, [])
    return (
        <Card title="积分榜">
            {
                rankList.map((rank, i) => {
                    return <ScoreItem rankInfo={rank} rank={i + 1} key={rank._id} />
                })
            }
        </Card>
    )
}
