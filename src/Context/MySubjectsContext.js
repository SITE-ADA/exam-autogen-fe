import {useState, useEffect, useContext, createContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllInstitutions } from '../Services/ms_auth/InstitutionService';
import { getSubjectsByUserId } from '../Services/ms_auth/SubjectService';

const MySubjectsContext = createContext();

export const useMySubjectsContext = () => useContext(MySubjectsContext);

const userId = JSON.parse(localStorage.getItem("user"))?.user.id;

export const MySubjectsProvider = ({children}) => {
    const [mySubjects, setMySubjects] = useState([]);

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['my_subjects'],
        queryFn: async() => {
            const response = await getSubjectsByUserId(userId);
            return response.data;
        }
    });

    const refetchMySubjects = () => refetch();

    useEffect(() => {
        if(data) {
            setMySubjects(data);
        }
    }, [data]);

    return (
        <MySubjectsContext.Provider value={{mySubjects, setMySubjects, error, isLoading, refetchMySubjects}} >
            {children}
        </MySubjectsContext.Provider>
    )
}