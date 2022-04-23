import React from 'react'
import { Card } from 'antd';
import { connect } from 'umi';

const UserDetail = (props) => {
    const { id, name, age, address } = props.selectedUserObj
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

const mapStateToProps = (state) => {
    return {
        selectedUserObj: state.users.selectedUserObj
    }
}

export default connect(mapStateToProps)(UserDetail)