import { createContext, useEffect, useState, useContext } from "react";

const AssessmentContext = createContext();

export const useAssessmentContext = () => useContext(AssessmentContext);

export const AssessmentProvider = ({children}) => {
    
    const [omrResponse, setOmrResponse] = useState({});

    return (
        <AssessmentContext.Provider value={{omrResponse, setOmrResponse}} >
            {children}
        </AssessmentContext.Provider>
    );
}