import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Button, Input, Spin, message } from 'antd';
import 'antd/dist/antd.css';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import '../css/Login.css';
import axios from 'axios';
import servicePath from '../config/apiUrl';

const Login = (props) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setInLoading] = useState(false);
  //使用useHistory
  const history = useHistory();

  const checkLogin = (props) => {
    //设置动画加载
    setInLoading(true);
    if (!userName) {
      message.error('用户名不能为空');
      setInLoading(false);
      return false;
    }
    if (!password) {
      message.error('密码不能为空');
      setInLoading(false);
      return false;
    }
    let dataProps = {
      userName,
      password
    };

    //不用设置CORS响应头，自带？
    //axios发送跨域请求会预检？
    axios({
      method: 'post',
      url: servicePath.checkLogin,
      data: dataProps,
      //允许前后端共享session（也即后端设置自己的cookie）
      withCredentials: true
    }).then((res) => {
      setTimeout(() => {
        setInLoading(false);
      }, 500);
      if (res.data.data === '登录成功') {
        localStorage.setItem('openId', res.data.openId);
        message.success('登录成功');
        //使用history跳转到首页
        setTimeout(() => {
          history.push('/index');
        }, 1000);
      } else {
        message.error('用户名密码错误');
      }
    });
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="PureWind Blog System"
          bordered={true}
          className="login-card"
        >
          <Input
            id="username"
            size="large"
            placeholder="Enter your username"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <br />
          <br />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <br />
          <Button type="primary" size="large" block onClick={checkLogin}>
            OK
          </Button>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;
