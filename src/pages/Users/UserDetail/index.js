import React from 'react'
import { Card } from 'antd';

const UserDetail = (props) => {

    const { id, name, age, address } = props.location.state

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