import axios from "axios";

export const msAuthApi = axios.create({
    baseURL: "http://localhost:8083/api/v1/auth"
});

export const msQuestionApi = axios.create({
    baseURL: "http://localhost:9897/api/v1/questions"
});

export const msAssessmentApi = axios.create({
    baseURL: "http://localhost:8089/api/v1/assessment"
});

export const msTestApi = axios.create({baseURL: "http://localhost:8087/api/v1/tests"});
