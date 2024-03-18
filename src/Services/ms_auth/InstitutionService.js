import { msAuthApi } from "../AxiosService";

export const addInstitution = async (institutionName, addressId, contactId, instStatus) =>
                                    await msAuthApi.post("/institution", institutionName, addressId, contactId, instStatus)

export const getAllInstitutions = async () => await msAuthApi.get('/institution');

export const deleteInstitution = async (id) => await msAuthApi.delete(`/institution/${id}`);

