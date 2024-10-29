import React from 'react'
import { Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function AddIssueBtn() {
    let navigate = useNavigate()
    let { isLogin } = useSelector(state => state.user)
    let clickHandle = () => {
        if (isLogin) {
            navigate("/addIssue")
        } else {
            message.warning("请先登录")
        }
    }
    return (
        <Button
            type="primary"
            size="large"
            style={{
                width: "100%",
                marginBottom: "30px"
            }}
            onClick={clickHandle}
        >我要发问</Button>
    )
}
