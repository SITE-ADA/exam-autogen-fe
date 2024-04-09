import { useContext, useState, useEffect, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getQuestionByPool } from "../Services/ms_question/QuestionService";

const QuestionContext = createContext();

export const useQuestionContext = () => useContext(QuestionContext);

export const QuestionProvider = ({children}) => {
    const [questions, setQuestions] =useState([]);

    const {data, refetch, isLoading, error} = useQuery({
       queryKey: ['questions'],
       queryFn: async(poolId) => {
        const response = await getQuestionByPool(poolId);
        return response.data;
       } 
    });

    const refetchQuestions = (id) => refetch(id);

    useEffect(() =>
    {
        if(data)
        {
            setQuestions(data);
        }
    }, [data])

    return (
        <QuestionContext.Provider value={{questions, setQuestions, isLoading, error, refetchQuestions}}>
            {children}
        </QuestionContext.Provider>
    )
}