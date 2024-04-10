import { msAuthApi } from "../AxiosService";

export const addContact = async(primaryEmail, primaryPhone, secondaryEmail, secondaryPhone) => await msAuthApi.post('/contact', {primaryEmail, primaryPhone, secondaryEmail, secondaryPhone});

export const getContact = async (id) => await msAuthApi.get(`/contact/${id}`);

export const getContacts = async () => await msAuthApi.get("/contact");

export const updateContactPut = async (id, primaryPhone, primaryEmail, secondaryPhone, secondaryEmail) =>
                await msAuthApi.put(`/contact/${id}`, {primaryPhone, primaryEmail, secondaryPhone, secondaryEmail});
// eslinde size her shey qurbandi cunki i feel lucky that I interacted with diligent and humoristic personalities like you guys within my academic study. Lucky to have you
export const deleteContact = async (id) => await msAuthApi.delete(id);

export const updateContactPatch = async(id, primaryEmail, primaryPhone, secondaryEmail, secondaryPhone) => 
                await msAuthApi.patch(`/contact/${id}`, {primaryEmail, primaryPhone, secondaryEmail, secondaryPhone});

