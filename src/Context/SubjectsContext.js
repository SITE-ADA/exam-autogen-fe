import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { getAllSubjects } from '../Services/ms_question/SubjectService';

const SubjectContext = createContext();

export const useSubjectContext = () => useContext(SubjectContext);

export const SubjectProvider = ({children}) => {
    const [subjects, setSubjects] = useState([]);

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['subjects'],
        queryFn: async() =>
        {
            const response = await getAllSubjects();
            return response.data;
        }
      })

    const refetchSubjects = () => refetch();

    useEffect(() => {
        if (data) {
          setSubjects(data);
        }
      }, [data]);

    return (
        <SubjectContext.Provider value={{ subjects, setSubjects, isLoading, error, refetchSubjects }}>
          {children}
        </SubjectContext.Provider>
    );
}
