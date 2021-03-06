
import { Layout, Menu } from 'antd';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { history } from 'umi'

const { Header, Content } = Layout;

export default (props) => {
  const handleClick = (e) => {
    history.push("/" + e.key);
  }
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal" onClick={handleClick}>
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            Users
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        {props.children}
      </Content>
    </Layout>
  );
}
