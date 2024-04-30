import {useState, useEffect, useContext, createContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllQuestionBuckets } from '../Services/ms_test/QuestionBucketService';

const QuestionBucketContext = createContext();

export const useQuestionBucketContext  = () => useContext(QuestionBucketContext);

export const QuestionBucketProvider = ({children}) => {
    const [qbuckets, setQbuckets] = useState([]);

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['question_buckets'],
        queryFn: async() => {
            const response = await getAllQuestionBuckets();
            return response.data;
        }
    });

    const refetchQBuckets = () => refetch();

    useEffect(() => {
        if(data) {
            setQbuckets(data);
        }
    }, [data]);

    return (
        <QuestionBucketContext.Provider value={{qbuckets, setQbuckets, error, isLoading, refetchQBuckets}} >
            {children}
        </QuestionBucketContext.Provider>
    )
}