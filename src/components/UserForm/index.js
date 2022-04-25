import React, { useEffect } from 'react'
import { Drawer, Form, Button, Input, InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'umi';
const { TextArea } = Input;


const UserForm = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const showDrawer = useSelector(state => state.users.showUserForm);
    const users = useSelector(state => state.users.userList);
    const showType = useSelector(state => state.users.showUserType);
    const selectedUserObj = useSelector(state => state.users.selectedUserObj);

    const onClose = () => {
        dispatch({
            type: 'users/closeUserForm',
        });
        // 取消需要清除元素值
        form.setFieldsValue({
            addr: "",
            age: "",
            password: "",
            username: ""
        })
    };

    const onFinish = (values) => {
        const userObj = {
            key: showType === "add" ? String(Math.random()) : selectedUserObj.key,
            id: showType === "add" ? String(users.length + 1) : selectedUserObj.id,
            name: values.username,
            password: values.password,
            age: values.age,
            address: values.addr,
        }
        if (showType === "add") {
            dispatch({
                type: 'users/addUser',
                payload: { userObj }
            })
            message.success("添加成功！")
        } else {
            dispatch({
                type: 'users/editUser',
                payload: { userObj }
            })
            message.success("修改成功！")
        }
        // 添加完需要清除元素值
        form.setFieldsValue({
            addr: "",
            age: "",
            password: "",
            username: ""
        })
    }

    useEffect(() => {
        if (showType === "edit") {
            form.setFieldsValue({
                addr: selectedUserObj.address,
                age: selectedUserObj.age,
                password: selectedUserObj.password,
                username: selectedUserObj.name
            })
        }
    })

    return (
        <div>
            <Drawer
                title={showType === "add" ? 'Add User' : 'Edit User'}
                width={720}
                onClose={onClose}
                visible={showDrawer}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
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

                    <Form.Item
                        label="Age"
                        name="age"
                        rules={[{ required: true, message: 'Please input your age!' }]}
                    >
                        <InputNumber placeholder="input age" />
                    </Form.Item>

                    <Form.Item
                        label="Addr"
                        name="addr"
                        rules={[{ required: false, message: 'Please input your address!' }]}
                    >
                        <TextArea placeholder="input address" allowClear />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button onClick={onClose} style={{ marginRight: '20px' }}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            OK
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </div>
    )
};

export default UserForm;
