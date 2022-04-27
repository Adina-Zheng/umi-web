import React, { useState, useEffect, Fragment } from 'react';
import { Layout, Menu, Table, Space, Button, Input, Popconfirm, message } from 'antd';
import { useDispatch, useSelector, history, Helmet } from 'umi';
import { HomeOutlined, TeamOutlined } from '@ant-design/icons';
import UserForm from '../../components/UserForm/index'

const { Header, Content } = Layout;
const { Search } = Input;

const Users = () => {

    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [visible, setVisible] = useState(false);
    const [showUserForm, setshowUserForm] = useState(false);
    const [record, setRecord] = useState(undefined);

    const dispatch = useDispatch();
    const users = useSelector(state => state.users.userList);

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
                    <a onClick={() => handleView(record)}>View</a>
                    <a onClick={() => handleEdit(record)}>Edit</a>
                    <Popconfirm
                        title="确认要删除吗?"
                        onConfirm={(e) => handleDelete(record.id, "delete")}
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
    const handleAdd = () => {
        setshowUserForm(true);
        setRecord(undefined);
    }
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowKeys) => {
            setselectedRowKeys(selectedRowKeys);
        },
    };
    const onSearch = (value) => {
        dispatch({
            type: 'users/searchUser',
            payload: value
        })
    }
    const handleDelete = (key, type) => {
        setVisible(false);
        dispatch({
            type: 'users/deleteUser',
            payload: { key, type }
        })
    }
    const handleEdit = (record) => {
        setshowUserForm(true);
        setRecord(record);
    }
    const handleView = (record) => {
        console.log("history,", history)
        history.push({
            pathname: '/users/detail',
            state: record
        });
    }

    useEffect(() => {
        dispatch({
            type: 'users/getUserList'
        })
    }, [])

    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Users</title>
            </Helmet>
            <Layout className="layout">
                <Header>
                    <Menu theme="dark" mode="horizontal" onClick={e => { history.push(e.key) }}>
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
                                onCancel={() => { setVisible(false) }}
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
                            rowKey="id"
                            pagination={{
                                pageSize: 5
                            }}
                        />
                    </div>
                    <UserForm visible={showUserForm} record={record} closeForm={() => { setshowUserForm(false) }} />
                </Content>
            </Layout>
        </Fragment>


    );
}

export default Users;