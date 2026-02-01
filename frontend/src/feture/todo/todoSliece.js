import { createSlice } from "@reduxjs/toolkit"

const intialState = {
    todos: [{
        id: 1,
        title: "moring execise",
        discription: "10 pushup",
        status: false,
    }],
    collection: [{
        id: 1,
        title: "clean house",

    }],
    refresh: false,

}

const todoSliece = createSlice({
    name: "Todos",
    initialState: intialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        addCollection: (state, action) => {
            state.collection.push(action.payload)
        },
        refreshpage: (state, action) => {
            state.refresh = action.payload
        }
    }
})
export const { addTodo, addCollection, refreshpage } = todoSliece.actions
export default todoSliece.reducer