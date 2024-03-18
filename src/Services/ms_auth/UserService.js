import { msAuthApi } from "../AxiosService";

export const login = async (username, password) => 
                    await msAuthApi.post("/login", {username, password});

export const createUser = async (username, email, phone, password, userTypeId) =>
                    await msAuthApi.post('/register', {username, email, phone, password, userTypeId});

export const getAllUsers = async() => 
                    await msAuthApi.get('/user');

export const deleteUser = async(id) =>
                    await msAuthApi.delete(`/user/${id}`);

        
