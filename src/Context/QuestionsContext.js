import { useContext, useState, useEffect, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const QuestionContext = createContext();

export const useQuestionContext = () => useContext(QuestionContext);

export const QuestionProvider = ({children}) => {
    const [questions, setQuestions] =useState([]);

    const {data, refetch, isLoading, error} = useQuery({
       queryKey: ['questions'],
       queryFn: async() => {
                
       } 
    });

    const refetchQuestions = () => refetch();

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