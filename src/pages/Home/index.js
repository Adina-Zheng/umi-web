import React from 'react'
import { Layout, Menu, Card, Form, Input, Button, message } from 'antd';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import { useSelector, history } from 'umi'

const { Header, Content } = Layout;
const HomePage = () => {

    const loginUser = useSelector(state => state.home.loginUser);
    const { name, password } = loginUser;

    const onFinish = (values) => {
        if (values.username === name && values.password === password) {
            history.push("/users");
            message.success("登录成功！");
        } else if (values.username !== name) {
            message.warn("此用户未注册！");
        } else if (values.username === name && values.password !== password) {
            message.warn("密码错误，请重新输入！");
        }
    };

    return (
        <Layout className="layout">
            <Header>
                <Menu theme="dark" mode="horizontal" onClick={e => { history.push(e.key); }}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        Home
                    </Menu.Item>
                    <Menu.Item key="users" icon={<TeamOutlined />}>
                        Users
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Card title="Login" style={{ width: '50%', margin: '0 auto', marginTop: '5%' }}>
                    <Form
                        name="login-form"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={() => { message.warn("登录失败!") }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input placeholder="input username" />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password placeholder="input password" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Content>
        </Layout>
    )
}

export default HomePage;