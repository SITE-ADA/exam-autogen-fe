import { msTestApi } from "../AxiosService";

export const patchQuestionBucket = async(id, nbSelectedQuestions) => {
    const response = await msTestApi.patch(`/question-buckets/${id}`, {nbSelectedQuestions});
    console.log(response);
    return response;
}