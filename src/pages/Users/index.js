import React, { useState, useEffect } from 'react';
import { Layout, Menu, Table, Space, Button, Input, Popconfirm, message } from 'antd';
import { connect } from 'umi';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import UserForm from '../../components/UserForm/index'

const { Header, Content } = Layout;
const { Search } = Input;

const Users = (props) => {
    // console.log("User组件的props", props);
    const { history, dispatch, users } = props;
    let [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [visible, setVisible] = React.useState(false);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => handleView(record.key)}>View</a>
                    <a onClick={() => handleEdit(record.key)}>Edit</a>
                    <Popconfirm
                        title="确认要删除吗?"
                        onConfirm={(e) => handleDelete(record.key, "delete")}
                        okText="确认"
                        cancelText="取消"
                    >
                        <a>Delete</a>
                    </Popconfirm>

                </Space>
            ),
        },
    ];
    const showPopconfirm = (key) => {
        if (key == "") {
            message.warn("请选择要删除的数据！")
            return;
        }
        setVisible(true);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const handleClick = (e) => {
        history.push(e.key);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setselectedRowKeys(selectedRowKeys);
        },
    };
    const onSearch = (value) => {
        console.log("onSearch", value);
        dispatch({
            type: 'users/searchUser',
            payload: value
        })
    }
    const handleAdd = () => {
        dispatch({
            type: 'users/showUserForm',
            payload: { showUserType: 'add' }
        })
    }
    const handleDelete = (key, type) => {
        setVisible(false);
        dispatch({
            type: 'users/deleteUser',
            payload: { key, type }
        })
    }
    const handleEdit = (key) => {
        const editUser = users.filter(item => item.key === key);
        dispatch({
            type: 'users/showUserForm',
            payload: { showUserType: 'edit', editUser }
        })
    }
    const handleView = (key) => {
        const showUser = users.filter(item => item.key === key);
        dispatch({
            type: 'users/showDetail',
            payload: showUser
        })
        history.push("/users/detail");
    }

    useEffect(() => {
        dispatch({
            type: 'users/getUserList'
        })
    }, [])

    return (
        <Layout>
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
                <div className="list-table">
                    <div style={{ marginBottom: '10px' }}>
                        <Button type="primary" onClick={handleAdd} className="header-button">
                            Add
                        </Button>
                        <Popconfirm
                            title="确认删除所选项吗？"
                            visible={visible}
                            onConfirm={() => { handleDelete(selectedRowKeys, "batchDelete") }}
                            onCancel={handleCancel}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button type="primary" className="header-button" onClick={() => showPopconfirm(selectedRowKeys)}>
                                BatchDelete
                            </Button>
                        </Popconfirm>
                        <Search placeholder="input search text" onSearch={onSearch} enterButton className="header-button" style={{ width: '50%' }} />
                    </div>
                    <Table
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={users}
                        pagination={{
                            pageSize: 5,

                        }}
                    />
                </div>
                <UserForm />
            </Content>
        </Layout>

    );
}

const mapStateToProps = (state) => {
    // 每次状态改变时，都会调用
    return {
        users: state.users.userList
    }
}

export default connect(mapStateToProps)(Users);