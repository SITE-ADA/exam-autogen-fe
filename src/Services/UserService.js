import { authApi } from "./AxiosService";

export const login = async (username, password) => 
                    await authApi.post("/login", {username, password});


