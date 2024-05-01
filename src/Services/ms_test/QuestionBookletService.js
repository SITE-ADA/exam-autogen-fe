import { msTestApi } from "../AxiosService";

export const getAllQBooklets = async() => await msTestApi.get('/question-booklets');

export const getAllBookletsByTestId = async(id) => 
{
 const response = await msTestApi.get(`/question-booklets/getByGeneratedTestId/${id}`);
 return response;
}