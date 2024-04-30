import { msQuestionApi } from "../AxiosService";

export const createAnswers = async(qId, answer1, answer2, answer3, answer4) => {
   const response = await msQuestionApi.post('/answers', {answerRequests: [{question: qId, text: [answer1, answer2, answer3, answer4], answerOptions: ["A", "B", "C", "D"]}]});
   console.log(response);
   return response;
}

export const createCorrectAnswers = async(qId, answerId) => {
    console.log(qId + " " + answerId);
    const response = await msQuestionApi.post('/correct-answers', {correctAnswerList: [{question: qId, answer: answerId}]});
    console.log(response);
    return response;
}