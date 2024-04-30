import { msTestApi } from "../AxiosService";

export const getAllQBooklets = async() => await msTestApi('/question-booklets');

export const getAllBookletsByTestId = async(id) => 
{
 const response = await msTestApi.get(`/question-booklets/getByGeneratedTestId/${id}`);
 return response;
}