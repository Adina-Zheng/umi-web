export const getUserList = async params => {
    const data = [
        {
            id: "1",
            name: 'John Brown',
            password: '01Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            id: "2",
            name: 'Jim Green',
            password: '02Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            id: "3",
            name: 'Joe Black',
            password: '03Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
        {
            id: "4",
            name: 'John Blue',
            password: '04Blue',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            id: "5",
            name: 'Jim Red',
            password: '05Red',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            id: "6",
            name: 'Joe Yellow',
            password: '06Yellow',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ]
    return data
}