import { msAuthApi } from "../AxiosService";

export const addInstitution = async (institutionName, addressId, contactId, instStatus) =>
                                    await msAuthApi.post("/institution", {institutionName, addressId, contactId, instStatus})

export const getAllInstitutions = async () => await msAuthApi.get('/institution');

export const deleteInstitution = async (id) => await msAuthApi.delete(`/institution/${id}`);

export const getInstitution = async(id) => await msAuthApi.get(`/institution/${id}`);

export const updateInstitution = async(id, institutionName, addressId, contactId, status) => 
                        await msAuthApi.put(`/institution/${id}`, {institutionName, addressId, contactId, status})
