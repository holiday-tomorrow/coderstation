import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import typeSlice from "./typeSlice"
export default configureStore({
    reducer: {
        user: userSlice,
        type: typeSlice
    }
})