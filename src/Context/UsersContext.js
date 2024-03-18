import { useContext, useState, useEffect, createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../Services/ms_auth/UserService";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    
    const {data, refetch, isLoading, error} = useQuery({
        queryKey: ['users'],
        queryFn: async() => {
            const response = await getAllUsers();
            return response.data;
        }
    });

    const refetchUsers = () => refetch();

    useEffect(() => {
        if(data)
        {
            setUsers(data);
        }
    }, [data])

    return (
        <UserContext.Provider value={{users, setUsers, isLoading, error, refetchUsers}}>
            {children}
        </UserContext.Provider>
    )
}