import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllInstitutions } from '../Services/InstitutionService';

const InstitutionsContext = createContext();

export const useInstitutions = () => {
  return useContext(InstitutionsContext);
};

export const InstitutionsProvider = ({ children }) => {
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllInstitutions();
        setInstitutions(response.data);
      } catch (error) {
        console.error('Error fetching institutions:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <InstitutionsContext.Provider value={institutions}>
      {children}
    </InstitutionsContext.Provider>
  );
};
