import { getUserList } from '../services/userService'

const UserModel = {
    namespace: "users",
    state: {
        userList: [],
        showDetail: false
    },

    reducers: {
        getUsers(state, { payload }) {
            console.log("获取数据返回，", { ...state, ...{ userList: [...payload] } })
            return {
                ...state,
                ...{ userList: [...payload] }
            };
        },
        addUser(state, { payload }) {
            return { ...state, ...{ userList: [...state.userList, payload] } }
        }
    },

    effects: {
        * getUserList({ call, put }) {
            const data = yield call(getUserList);
            yield put({
                type: 'getUsers',
                payload: data
            })
        },
        * editUser({ payload }, { call, put }) {
            const data = yield call(getUserList);
            const { id, name, password, age, address } = payload
            const userList = data.map(item => {
                if (item.id === id) {
                    item.name = name;
                    item.password = password;
                    item.age = age;
                    item.address = address;
                }
                return item;
            })
            yield put({
                type: 'getUsers',
                payload: userList
            })
        },
        // * addUser({ payload }, { call, put }) {
        //     const data = yield call(getUserList);

        // },
        * deleteUser({ payload: { key, type } }, { call, put }) {
            const data = yield call(getUserList);
            const userList = data.filter((item) => {
                if (type === "delete") {
                    if (item.id !== key) return item;
                } else {
                    if (key.indexOf(item.id) === -1) return item;
                }
            })
            yield put({
                type: 'getUsers',
                payload: userList
            })
        },
        *searchUser({ payload }, { call, put }) {
            const data = yield call(getUserList);
            const userList = data.filter((item) => {
                if (item.id.indexOf(payload) !== -1 || item.name.indexOf(payload) !== -1 || String(item.age).indexOf(payload) !== -1 || item.address.indexOf(payload) !== -1) return item;
            });
            yield put({
                type: 'getUsers',
                payload: userList
            })
        }
    },

    subscriptions: {
        // setup({ dispatch, history }, done) {
        //     return history.listen(({ pathname }) => {
        //         if (pathname === "/users") {
        //             console.log("获取列表数据2")
        //             dispatch({
        //                 type: 'getUserList',
        //             })
        //         }
        //     })
        // }
    }
};

export default UserModel;