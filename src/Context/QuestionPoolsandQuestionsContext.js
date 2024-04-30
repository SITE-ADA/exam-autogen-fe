import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { getQuestionPoolsandQuestionByUserId } from '../Services/ms_question/QuestionPoolService';

const QuestionPoolsandQuestionsContext = createContext();

export const useQuestionPoolsandQuestionsContext = () => useContext(QuestionPoolsandQuestionsContext);


export const QuestionPoolsandQuestionsProvider = ({ children }) => {
  const [qpoolsquestions, setQpoolsquestions] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"))?.user.id;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['qpoolsquestions'],
    queryFn: async() =>
    {
        const response = await getQuestionPoolsandQuestionByUserId(userId);
        return response.data;
    }
  })

  const refetchQpoolsQuestions = () => refetch();

  useEffect(() => {

    if (data) {
        setQpoolsquestions(data);
    }
  }, [data]);

  return (
    < QuestionPoolsandQuestionsContext.Provider value={{ qpoolsquestions, isLoading, error, refetchQpoolsQuestions }}>
      {children}
    </ QuestionPoolsandQuestionsContext.Provider>
  );
};
