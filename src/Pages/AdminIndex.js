import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';

import { Breadcrumb, Layout, Menu } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/LoginIndex.css';
import AddArticle from './AddArticle';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  };
}

const items = [
  getItem('工作台 ', '1', <PieChartOutlined />),
  getItem('添加文章', '2', <DesktopOutlined />),
  getItem('文章管理', 'sub1', <UserOutlined />, [
    getItem('添加文章', '3'),
    getItem('文章列表', '4')
  ]),
  getItem('留言管理', 'sub2', <TeamOutlined />)
];

const AdminIndex = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: '100vh'
      }}
    >
      <Sider
        breakpoint="xl"
        collapsedWidth={0}
        collapsible
        trigger={null}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0
          }}
        />
        <Content
          style={{
            margin: '0 16px'
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0'
            }}
          >
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360
            }}
          >
            <div>
              <Router>
                <Route path="/index" exact component={AddArticle}></Route>
              </Router>
            </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center'
          }}
        >
          PureWind.com
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AdminIndex;
