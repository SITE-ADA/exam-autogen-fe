import { msQuestionApi } from "../AxiosService";

// TO DO...
export const getSubjectsByUserId = async(id) => 1;

export const createSubject = async(courseObjectives, crn, term, status, name, userId) => 
                    await msQuestionApi.post('/subject', {courseObjectives, crn, term, status, name, userId});