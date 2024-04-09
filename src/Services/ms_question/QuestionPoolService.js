import { msQuestionApi } from "../AxiosService";

export const deleteQuestionPool = (id) => msQuestionApi.delete(`/question-pool/${id}`);

export const createQuestionPool = (name, description, subjectId, userId) => 
                    msQuestionApi.post('/question-pool', {name, description, subjectId, userId});

export const getAllPools = () => msQuestionApi.get('/question-pool');

export const editQuestionPool = async(poolId, name, description, subjectId) =>
            await msQuestionApi.patch(`/question-pool/${poolId}`, {name,  description, subjectId});

export const getPoolById = (id) => msQuestionApi.get(`/question-pool/${id}`);

export const getQuestionCountByPool = async() => await msQuestionApi.get('/count-by-pool');