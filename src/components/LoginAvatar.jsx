import { Button, Popover, List, Avatar, Image } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { initUserInfo, loginStateChange } from "../redux/userSlice"
import styles from "../css/LoginAvatar.module.css"
export default function LoginAvatar(props) {
  const { isLogin, userInfo } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const content = <List
    dataSource={["个人中心", "退出登录"]}
    size="large"
    renderItem={item => <List.Item style={{ cursor: "pointer" }} onClick={() => { itemChange(item) }}>{item}</List.Item>}
  >
  </List>
  // 点击个人中心或退出登录
  let itemChange = (item) => {
    if (item === "退出登录") {
      localStorage.removeItem("userToken")
      dispatch(initUserInfo({}))
      dispatch(loginStateChange(false))
    } else if (item === "个人中心") {
      navigate("/personal")
    }
  }
  return (
    <>
      {
        isLogin ?
          <Popover content={content}>
            <div className={styles.avatarContainer}>
              <Avatar
                src={<Image src={userInfo.avatar} preview={false} />}
                size="large"
                icon={<UserOutlined />} />
            </div>
          </Popover> :
          <Button
            type="primary"
            size="large"
            onClick={props.loginHandle}
          >
            注册/登录
          </Button>
      }
    </>
  )
}
