import { Button, Popover, List, Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux"
import styles from "../css/LoginAvatar.module.css"
export default function LoginAvatar(props) {
  const { isLogin, userInfo } = useSelector(state => state.user)
  const content = <List
    dataSource={["个人中心", "退出登录"]}
    size="large"
    renderItem={item => <List.Item style={{ cursor: "pointer" }}>{item}</List.Item>}
  >
  </List>
  return (
    <>
      {
        isLogin ?
          <Popover content={content}>
            <div className={styles.avatarContainer}>
              <Avatar
                src={userInfo.avatar}
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
