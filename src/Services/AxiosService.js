import axios from "axios";

export const msAuthApi = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth"
});

export const msQuestionApi = axios.create({
    baseURL: "http://localhost:9897/api/v1/questions"
});
