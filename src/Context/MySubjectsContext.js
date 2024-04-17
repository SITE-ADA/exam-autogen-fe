import {useState, useEffect, useContext, createContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllInstitutions } from '../Services/ms_auth/InstitutionService';
import { getInstructorSubjects, getSubjectsByUserId, getUserSubjects } from '../Services/ms_auth/SubjectService';

const MySubjectsContext = createContext();

export const useMySubjectsContext = () => useContext(MySubjectsContext);


export const MySubjectsProvider = ({children}) => {
    const [mySubjects, setMySubjects] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['my_subjects'],
        queryFn: async() => {
            const response = await getUserSubjects();
            console.log(response);
            return response.data;
        },
    });

    const refetchMySubjects = () => refetch();

    useEffect(() => {
        if(data) {
            setMySubjects(data);
        }
    }, [data]);

    return (
        <MySubjectsContext.Provider value={{mySubjects, setMySubjects, error, isLoading, refetchMySubjects, shouldRefetch, setShouldRefetch}} >
            {children}
        </MySubjectsContext.Provider>
    )
}