import { msAuthApi, msmsAuthApi } from "../AxiosService";

export const createAddress = async (country, city, street, zip) => 
                    await msAuthApi.post("/address", {country, city, street, zip})

export const getAddressById = async (id) => await msAuthApi.get(`/address/${id}`);

export const getAllAddresses = async () => await msAuthApi.get("/address");

export const updateAddressPut = async (id, country, city, street, zip) => 
                                                    await msAuthApi.put(`/address/${id}`, country, city, street, zip);

export const deleteAddress = async (id) => await msAuthApi.delete(id);