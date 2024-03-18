import { msQuestionApi } from "../AxiosService";

export const createQuestionPool = async(description, name, subjectId, userId) =>
            await msQuestionApi.post('/question-pool', description, name, subjectId, userId);

export const editQuestionPool = async(poolId, name, description, subjectId) =>
            await msQuestionApi.patch(`/question-pool/${poolId}`, {name,  description, subjectId});

export const getAllQuestionPools = async() => 
            await msQuestionApi.get('/question-pool');        
            
export const getQuestionPool = async(id) =>
            await msQuestionApi.get(`/question-pool/${id}`);