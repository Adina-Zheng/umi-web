import React from 'react'
import { Card } from 'antd';
import { Helmet } from 'umi'

const UserDetail = (props) => {

    const { id, name, age, address } = props.location.state

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>User detail</title>
            </Helmet>
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