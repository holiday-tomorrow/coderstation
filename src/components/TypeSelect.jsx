import { useEffect } from 'react'
import { getTypeList, issueTypeChange, bookTypeChange } from '../redux/typeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Tag } from 'antd'
export default function TypeSelect() {
    const { typeList } = useSelector((state) => state.type)
    const dispatch = useDispatch()
    const location = useLocation();
    const colorArr = ["#108ee9", "#2db7f5", "#f50", "green", "#87d068", "blue", "red", "purple"];
    const changeType = (item) => {
        if (location.pathname === "/Issues") {
            dispatch(issueTypeChange(item))
        } else if (location.pathname === "/books") {
            dispatch(bookTypeChange(item))
        }
    }
    useEffect(() => {
        if (!typeList.length) { dispatch(getTypeList()) }
    }, [typeList.length])
    return (
        <div>
            <Tag
                color="magenta"
                value="all"
                key="all"
                style={{ cursor: "pointer" }}
                onClick={() => changeType("all")}
            >全部</Tag>
            {
                typeList.map((item, i) => (
                    <Tag
                        color={colorArr[i % colorArr.length]}
                        value={item._id}
                        key={item._id}
                        style={{ cursor: "pointer" }}
                        onClick={() => changeType(item._id)}
                    >{item.typeName}</Tag>
                ))
            }
        </div>
    )
}
