import { msTestApi } from "../AxiosService";

export const getAllTests = async() => await msTestApi.get('');

export const deleteTest = async(id) => await msTestApi.delete(`/${id}`);

export const createTest = async(name, notes, instructions, maximumPoints, subjectId) => await msTestApi.post('', {name, notes, instructions, maximumPoints, subjectId});

export const getAllGeneratedTests = async() => await msTestApi.get('/generated-tests');

export const createGeneratedTest = async(name, nbExaminees, nbVariants, testId, date) => await msTestApi.post('/generated-tests', {name, nbExaminees, nbVariants, testId, date});

export const deleteGeneratedTest = async(id) => await msTestApi.delete(`/generated-tests/${id}`);

export const getGTestById = async(id) => await msTestApi.get(`/generated-tests/${id}`);