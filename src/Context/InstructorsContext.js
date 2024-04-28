import { createContext, useEffect, useState, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { getUsersByInstitution } from "../Services/ms_auth/UserService";
import { useUserContext } from "./UsersContext";
import { errorT } from "../Toasts/toasters";

const InstructorsContext = createContext();

export const useInstructorsContext = () => useContext(InstructorsContext);

export const InstructorsProvider = ({children}) => {
    const [institutionId, setInstitutionId] = useState(0);
    const [instructors, setInstructors] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['instructors'],
        queryFn: async() =>
        {
            try {
                setInstitutionId(JSON.parse(localStorage.getItem("user"))?.user.institution.id);
                const response = await getUsersByInstitution(institutionId, 5);
                console.log(response)
                return response.data;
            }catch(e)
            {
                errorT("Error retrieving instructors")
            }
        },
        enabled: shouldRefetch

    });

    const refetchInstructors = () => refetch();

    useEffect(() => {
        setInstitutionId(JSON.parse(localStorage.getItem("user"))?.user?.institution?.id);
        if(data)
        {
            setInstructors(data);
        }
    }, [data]);

    return (
        <InstructorsContext.Provider value={{instructors, setInstructors, refetchInstructors, shouldRefetch, setShouldRefetch}} >
            {children}
        </InstructorsContext.Provider>
    );
}