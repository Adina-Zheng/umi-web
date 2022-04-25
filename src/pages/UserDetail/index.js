import React from 'react'
import { Card } from 'antd';
import { useSelector } from 'umi';

const UserDetail = () => {

    const selectedUserObj = useSelector(state => state.users.selectedUserObj)
    const { id, name, age, address } = selectedUserObj
    return (
        <div>
            <Card title="User Info">
                <p><span style={{ fontWeight: 'bold' }}>ID: </span>{id}</p>
                <p><span style={{ fontWeight: 'bold' }}>Name：</span>{name}</p>
                <p><span style={{ fontWeight: 'bold' }}>Age：</span>{age}</p>
                <p><span style={{ fontWeight: 'bold' }}>Addr：</span>{address}</p>
            </Card>
        </div>
    )
}

export default UserDetail