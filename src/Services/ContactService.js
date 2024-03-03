import { authApi } from "./AxiosService";

export const addContact = async(primaryEmail, primaryPhone, secondaryEmail, secondaryPhone) => await authApi.post('/contact', {primaryEmail, primaryPhone, secondaryEmail, secondaryPhone});

export const getContact = async (id) => await authApi.get(`/contact/${id}`);

export const getContacts = async () => await authApi.get("/contact");

export const updateContactPut = async (id, primaryPhone, primaryEmail, secondaryPhone, secondaryEmail) =>
                await authApi.put(`/contact/${id}`, primaryPhone, primaryEmail, secondaryPhone, secondaryEmail);

export const deleteContact = async (id) => await authApi.delete(id);

