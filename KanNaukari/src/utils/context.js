import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [sharedData, setSharedData] = useState('');

  const setData = (data) => {
    setSharedData(data);
  };

  return (
    <DataContext.Provider value={{ sharedData, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);