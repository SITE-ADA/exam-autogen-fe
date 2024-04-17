import { msAuthApi } from "../AxiosService";

export const login = async (username, password) => 
                    await msAuthApi.post("/login", {username, password});

export const createUser = async (username, email, phone, password, userTypeId, institutionId) =>
                    await msAuthApi.post('/register', {username, email, phone, password, userTypeId, institutionId});

export const getAllUsers = async() => 
                    await msAuthApi.get('/user');

export const deleteUser = async(id) =>
                    await msAuthApi.delete(`/user/${id}`);

export const getUser = async(id) =>
                    await msAuthApi.get(`/user/${id}`);

export const getUsersByInstitution = async(id, userTypeId) =>
                    await msAuthApi.get(`/user/instructors?institutionId=${id}&userTypeId=${userTypeId}`);

export const patchUser = async(id, username, institution_id) => 
                    await msAuthApi.patch(`/user/${id}`, {username, institution_id});

export const getUserDetails = async(id) => 
                    await msAuthApi.get(`/user-details/${id}`)
        
