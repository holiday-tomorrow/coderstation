import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getType } from "../api/type";

export const getTypeList = createAsyncThunk('type/getTypeList', async () => {
    const res = await getType();
    console.log(res.data);
    return res.data;
});
const typeSlice = createSlice({
    name: 'type',
    initialState: {
        typeList: [],
        issueTypeId: "all",
        bookTypeId: "all"
    },
    reducers: {
        issueTypeChange(state, { payload }) {
            state.issueTypeId = payload
        },
        bookTypeChange(state, { payload }) {
            state.bookTypeId = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTypeList.fulfilled, (state, action) => {
            state.typeList = action.payload;
        })
    }
});
export const { issueTypeChange, bookTypeChange } = typeSlice.actions;
export default typeSlice.reducer;