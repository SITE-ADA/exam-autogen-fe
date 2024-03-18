import {useState, useEffect, useContext, createContext} from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllInstitutions } from '../Services/ms_auth/InstitutionService';

const InstitutionContext = createContext();

export const useInstitutionContext = () => useContext(InstitutionContext);

export const InstitutionProvider = ({children}) => {
    const [institutions, setInstitutions] = useState([]);

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['institutions'],
        queryFn: async() => {
            const response = await getAllInstitutions();
            return response.data;
        }
    });

    const refetchInstitutions = () => refetch();

    useEffect(() => {
        if(data) {
            setInstitutions(data);
        }
    }, [data]);

    return (
        <InstitutionContext.Provider value={{institutions, setInstitutions, error, isLoading, refetchInstitutions}} >
            {children}
        </InstitutionContext.Provider>
    )
}