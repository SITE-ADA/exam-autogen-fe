import {msAssessmentApi, msTestApi} from '../AxiosService';

export const getStudentReport = async(file) => await msAssessmentApi.post('/upload', file);

export const createBookletDownloadLink = async(arr) => await msTestApi.post('/question-booklets/create-docs', arr);