import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query'; 
import { getAllPools } from '../Services/ms_question/QuestionService';

const PoolContext = createContext();

export const usePoolContext = () => useContext(PoolContext);


export const PoolProvider = ({ children }) => {
  const [pools, setPools] = useState([]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['poolls'],
    queryFn: async() =>
    {
        const response = await getAllPools();
        return response.data;
    }
  })

  const refetchPools = () => refetch();

  useEffect(() => {
    if (data) {
      setPools(data);
    }
  }, [data]);

  return (
    <PoolContext.Provider value={{ pools, setPools, isLoading, error, refetchPools }}>
      {children}
    </PoolContext.Provider>
  );
};
