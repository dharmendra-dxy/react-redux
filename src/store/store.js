// global store:
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../store/slice/todoSlice";

const store = configureStore({
    reducer: {
        todo: todoReducer,
    },

});

export default store;
