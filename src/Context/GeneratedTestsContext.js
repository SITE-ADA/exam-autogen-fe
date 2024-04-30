import { createContext, useEffect, useState, useContext } from "react";
import { useQuery } from '@tanstack/react-query';
import { getAllGeneratedTests } from "../Services/ms_test/TestService";
import { errorT } from "../Toasts/toasters";

const GeneratedTestsContext = createContext();

export const useGeneratedTestsContext = () => useContext(GeneratedTestsContext);

export const GeneratedTestsProvider = ({children}) => {
    
    const [gtests, setGTests] = useState([]);
    const [shouldRefetch, setShouldRefetch] = useState(false);

    const {data, error, isLoading, refetch} = useQuery({
        queryKey: ['generated_tests'],
        queryFn: async() =>
        {
            try {

                const response = await getAllGeneratedTests();
                console.log(response)
                return response.data;
            }catch(e)
            {
                errorT("Error retrieving generated tests")
            }
        },
        enabled: true

    });

    const refetchGTests = () => refetch();

    useEffect(() => {
        
        if(data)
        {
            setGTests(data);
        }
    }, [data]);

    return (
        <GeneratedTestsContext.Provider value={{gtests, setGTests, refetchGTests, shouldRefetch, setShouldRefetch}} >
            {children}
        </GeneratedTestsContext.Provider>
    );
}