import {msAssessmentApi, msTestApi} from '../AxiosService';

export const getStudentReport = async(file) => await msAssessmentApi.post('/upload', file, {
    headers: {
        'Content-Type': 'multipart/form-data' // axios will adjust the Content-Type correctly
      }
});
