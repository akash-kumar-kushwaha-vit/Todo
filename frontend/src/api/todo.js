import api from "./api";

export const createcollection = (data) => {
    api.post('/collection', data);
}
export const addtast = (data) => {
    api.post("/task", data);
}
export const changeStatus = (data) => {
    api.post("/status", data);
}

export const deletetodo = (data) => {
    api.post("/deletetodo", data);
}
export const deletecollection = (data) => {
    api.post("/deletecollection", data);
}
export const updateTask = (data) => {
    api.post("/updatetask", data);
}