import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
    name: "user",
    initialState: {
        isLogin: false,
        userInfo: {}
    },
    reducers: {
        initUserInfo: (state, { payload }) => {
            state.userInfo = payload
        },
        loginStateChange: (state, { payload }) => {
            state.isLogin = payload
        }
    }
})
export const { initUserInfo, loginStateChange } = userSlice.actions
export default userSlice.reducer