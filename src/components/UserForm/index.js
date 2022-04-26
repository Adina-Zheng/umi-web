import React, { useEffect } from 'react'
import { Drawer, Form, Button, Input, InputNumber, message } from 'antd';
import { useDispatch, useSelector } from 'umi';
const { TextArea } = Input;


const UserForm = (props) => {
    const { visible, closeForm, record } = props
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const showType = useSelector(state => state.users.showUserType);

    const onFinish = (values) => {
        const userObj = {
            id: record === undefined ? String(Math.random()) : record.id,
            name: values.name,
            password: values.password,
            age: values.age,
            address: values.address,
        }
        if (record === undefined) {
            dispatch({
                type: 'users/addUser',
                payload: userObj
            })
            message.success("添加成功！")
        } else {
            dispatch({
                type: 'users/editUser',
                payload: userObj
            })
            message.success("修改成功！")
        }
        // 添加完需要清除元素值
        form.setFieldsValue({})
        closeForm();
    }

    useEffect(() => {
        if (record === undefined) {
            form.resetFields();
        } else {
            form.setFieldsValue(record);
        }
    }, [visible])

    return (
        <div>
            <Drawer
                title='User Info'
                width={720}
                onClose={closeForm}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                forceRender
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
                        name="name"
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
                        name="address"
                        rules={[{ required: false, message: 'Please input your address!' }]}
                    >
                        <TextArea placeholder="input address" allowClear />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                        <Button onClick={closeForm} style={{ marginRight: '20px' }}>
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
