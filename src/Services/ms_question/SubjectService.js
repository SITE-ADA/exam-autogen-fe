import { msQuestionApi } from "../AxiosService";

export const getAllSubjects = async() => await msQuestionApi.get('/subject');

export const getSubjectById = async(id) => await msQuestionApi.get(`/subject/${id}`);