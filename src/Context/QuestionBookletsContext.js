import {useState, useEffect, useContext, createContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllBookletsByTestId, getAllQBooklets } from '../Services/ms_test/QuestionBookletService';

const QuestionBookletsContext = createContext();

export const useQuestionBookletsContext  = () => useContext(QuestionBookletsContext);

export const QuestionBookletsProvider = ({children}) => {
    const [booklets, setBooklets] = useState([]);

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['question_booklets'],
        queryFn: async() => {
            const response = await getAllQBooklets();
            return response.data;
        }
    });

    const refetchBooklets = () => refetch();

    useEffect(() => {
        if(data) {
            setBooklets(data);
        }
    }, [data]);

    return (
        <QuestionBookletsContext.Provider value={{booklets, setBooklets, error, isLoading, refetchBooklets}} >
            {children}
        </QuestionBookletsContext.Provider>
    )
}