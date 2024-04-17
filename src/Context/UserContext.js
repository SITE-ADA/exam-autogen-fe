import { createContext, useEffect, useContext, useState } from "react";
import { useQuery } from '@tanstack/react-query';
const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user"))?.user);
    }, [])

    
    return (
        <UserContext.Provider value={{user, setUser}} >
            {children}
        </UserContext.Provider>
    );
}