import { authApi } from "./AxiosService";

export const addInstitution = async (institutionName, addressId, contactId, instStatus) =>
                                    await authApi.post("/institution", institutionName, addressId, contactId, instStatus)

export const getAllInstitutions = async () => await authApi.get('/institution');

export const deleteInstitution = async (id) => await authApi.delete(`/institution/${id}`);

