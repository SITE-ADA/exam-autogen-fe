import { createContext, useEffect, useState, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { getAllTests } from "../Services/ms_test/TestService";
import { errorT } from "../Toasts/toasters";

const TestsContext = createContext();

export const useTestsContext = () => useContext(TestsContext);

export const TestsProvider = ({children}) => {
    
    const [tests, setTests] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['tests'],
        queryFn: async() =>
        {
            try {

                const response = await getAllTests();
                console.log("New Response");
                console.log(response)
                return response.data;
            }catch(e)
            {
                errorT("Error retrieving tests")
            }
        },
        enabled: true

    });

    const refetchTests = () => refetch();

    useEffect(() => {
        
        if(data)
        {
            setTests(data);
        }
    }, [data]);

    return (
        <TestsContext.Provider value={{tests, setTests, refetchTests, shouldRefetch, setShouldRefetch}} >
            {children}
        </TestsContext.Provider>
    );
}