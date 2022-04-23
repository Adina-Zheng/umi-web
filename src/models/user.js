import { getUserList } from '../services/userService'

const UserModel = {
    namespace: "users",
    state: {
        userList: [],
        showUserForm: false,
        showUserType: "add",
        selectedUserObj: {},
        showDetail: false
    },

    reducers: {
        getUsers(state, { payload }) {
            localStorage.setItem("totalUsers", JSON.stringify(payload.data))
            state.userList = payload.data;
            return { ...state };
        },
        showUserForm(state, { payload }) {
            state.showUserForm = true;
            state.showUserType = payload.showUserType;
            if (payload.editUser && payload.editUser.length > 0) {
                state.selectedUserObj = payload.editUser[0];
            }
            return { ...state };
        },
        closeUserForm(state) {
            state.showUserForm = false;
            return { ...state };
        },
        addUser(state, { payload }) {
            state.showUserForm = false;
            state.userList.push(payload.userObj);//push会更改原数组，因此state更新
            localStorage.setItem("totalUsers", JSON.stringify(state.userList))
            // 这里需要是深拷贝页面才会刷新
            return JSON.parse(JSON.stringify(state));
        },
        deleteUser(state, { payload }) {
            const newUserList = JSON.parse(JSON.stringify(state.userList));
            const userList = newUserList.filter((item) => {
                if (payload.type === "delete") {
                    if (item.key !== payload.key) {
                        return item;
                    }
                } else if (payload.type === "batchDelete") {
                    if (payload.key.indexOf(item.key) === -1) {
                        return item;
                    }
                }
            })
            localStorage.setItem("totalUsers", JSON.stringify(userList))
            return { userList, showUserForm: false };
        },
        editUser(state, { payload }) {
            const newUserList = JSON.parse(JSON.stringify(state.userList));
            const userList = newUserList.map(item => {
                if (item.id === payload.userObj.id) {
                    item.name = payload.userObj.name;
                    item.password = payload.userObj.password;
                    item.age = payload.userObj.age;
                    item.address = payload.userObj.address;
                }
                return item;
            })
            localStorage.setItem("totalUsers", JSON.stringify(userList))
            return { userList }
        },
        searchUser(state, { payload }) {
            if (payload === "") {
                return { userList: JSON.parse(localStorage.getItem("totalUsers")) }
            } else {
                const newUserList = JSON.parse(JSON.stringify(state.userList));
                const userList = newUserList.filter((item) => {
                    if (item.id.indexOf(payload) !== -1 || item.name.indexOf(payload) !== -1 || String(item.age).indexOf(payload) !== -1 || item.address.indexOf(payload) !== -1) {
                        return item;
                    }
                })
                return { userList, };
            }


        },
        showDetail(state, { payload }) {
            state.showDetail = true;
            state.selectedUserObj = payload[0]
            return { ...state }
        }
    },

    effects: {
        * getUserList(action, { call, put }) {
            const data = yield call(getUserList);
            yield put({
                type: 'getUsers',
                payload: { data }
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