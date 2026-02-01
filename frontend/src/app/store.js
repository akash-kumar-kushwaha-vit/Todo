import { configureStore } from "@reduxjs/toolkit";
import todoreducer from '../feture/todo/todoSliece'
export const store = configureStore(
    {
        reducer: todoreducer
    }
)