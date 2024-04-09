import { msQuestionApi } from "../AxiosService";

export const getQuestionByPool = async(id) => await msQuestionApi.get(`/pool/${id}`);

export const deleteQuestionById = async(id) => await msQuestionApi.delete(`/${id}`);