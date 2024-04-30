import { msQuestionApi } from "../AxiosService";

export const getQuestionByPool = async(id) => await msQuestionApi.get(`/pool/${id}`);

export const deleteQuestionById = async(id) => await msQuestionApi.delete(`/${id}`);

export const createQuestion = async(text, questionTypeId, defaultScore, questionPoolId, notes) => {
    console.log(text, questionTypeId, defaultScore, questionPoolId, notes);
    const jsonData = {
        questionRequest: [
          {
            text: text,
            notes: notes,
            defaultScore: defaultScore, 
            questionTypeId: questionTypeId,
            questionPoolId: questionPoolId
          }
        ]
      }
      console.log(jsonData);
      const response = await msQuestionApi.post('', jsonData);
      console.log(response);
                          return response      ;
}

