import { msTestApi } from "../AxiosService";

export const getAllQuestionBuckets = async() => await msTestApi.get('/question-buckets');

export const getQBucketsByTest = async(id) => await msTestApi.get(`/question-buckets/test/${id}`);

export const createQuestionBucket = async(questionIds, nbSelectedQuestions, order, testId) => {
    console.log(questionIds + " " +  nbSelectedQuestions + " " + order + "testId" + testId);
    const response = await msTestApi.post('/question-buckets', {testId: testId, order: order, nbSelectedQuestions: nbSelectedQuestions, questionIds: questionIds});
    console.log(response);
    return response;
}