import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'antd/dist/antd.min.css';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from "react-redux"
import store from './redux/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>

); 