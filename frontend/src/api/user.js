import api from "./api";

export const getUsers = () => api.get("/user/userdata");
export const createUser = (data) => api.post("/user/register", data);
export const loginUser = (data) => api.post('/user/login', data);