import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { editUser } from "../api/user";

export const editUserInfo = createAsyncThunk(
    "user/editUserInfo",
    async (payload,actions) => {
        await editUser(payload.userId, payload.newUserInfo);
        actions.dispatch(editStoreUserInfo(payload.newUserInfo))
    }
);
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
        },
        editStoreUserInfo: (state, { payload }) => {
            for (let key in payload) {
                state.userInfo[key] = payload[key]
            }
        }
    }
})
export const { initUserInfo, loginStateChange ,editStoreUserInfo} = userSlice.actions
export default userSlice.reducer