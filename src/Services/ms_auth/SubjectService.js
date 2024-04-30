import axios from "axios";
import { msQuestionApi } from "../AxiosService";

// TO DO...
export const getUserSubjects = async() => {
    const userToken = JSON.parse(localStorage.getItem("user"))?.token;
    const response = await axios.get('http://localhost:8083/api/v1/user-subjects', {
    headers: {
      'Authorization': `Bearer ${userToken}`,
      'Content-Type': 'application/json'
    }}); 
    return response;
}

export const createSubject = async(courseObjectives, crn, term, subjectStatusId, description, name, userId) => 
                    await msQuestionApi.post('/subject', {courseObjectives, crn, term, subjectStatusId, description , name,userId});

export const deleteSubject = async(id) => await msQuestionApi.delete(`/subject/${id}`);

export const getSubject = async(id) => await msQuestionApi.get(`/subject/${id}`);

export const putSubject = async(id, courseObjectives, crn, term, subjectStatusId, description, name, userId) => await msQuestionApi.patch(`/subject/${id}`, {courseObjectives, crn, term, subjectStatusId, description , name, userId})