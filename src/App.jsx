
import { Layout } from 'antd';
import { useState } from 'react';
import NavHeader from './components/NavHeader';
import PageFooter from './components/PageFooter';
import LoginForm from './components/LoginForm';
import Router from './router';
import "./css/App.css"
const { Header, Footer, Content } = Layout;
export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Header>
        <NavHeader loginHandle={()=>{setIsModalOpen(true)}} />
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
