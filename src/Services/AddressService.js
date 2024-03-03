import { authApi } from "./AxiosService";

export const createAddress = async (country, city, street, zip) => 
                    await authApi.post("/address", {country, city, street, zip})

export const getAddressById = async (id) => await authApi.get(`/address/${id}`);

export const getAllAddresses = async () => await authApi.get("/address");

export const updateAddressPut = async (id, country, city, street, zip) => 
                                                    await authApi.put(`/address/${id}`, country, city, street, zip);

export const deleteAddress = async (id) => await authApi.delete(id);