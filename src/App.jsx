import { Layout, message } from 'antd';
import { useState, useLayoutEffect } from 'react';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import LoginForm from './components/LoginForm';
import Router from './router';
import "./css/App.css"
import { getInfo, getUserById } from './api/user'
import { initUserInfo, loginStateChange } from './redux/userSlice';
import { getTypeList } from "./redux/typeSlice";
import { useDispatch } from 'react-redux';
const { Header, Footer, Content } = Layout;
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    let whoami = async () => {
      let result = await getInfo()
      if (result.data) {
        let { data } = await getUserById(result.data._id)
        if (data) {
          dispatch(initUserInfo(data))
          dispatch(loginStateChange(true))
        }
      } else {
        message.error(result.msg)
        localStorage.removeItem('userToken')
      }
    }
    if (localStorage.getItem('userToken')) {
      whoami()
    }
    // 填充仓库的类型列表
    dispatch(getTypeList());
  }, [])
  return (
    <div>
      <Header>
        <NavHeader loginHandle={() => { setIsModalOpen(true) }} />
      </Header>
      <Content className='content'>
        <Router />
      </Content>
      <Footer className='footer'>
        <PageFooter />
      </Footer>
      <LoginForm isShow={isModalOpen} handleCancel={() => { setIsModalOpen(false) }}></LoginForm>
    </div>
  )
}
