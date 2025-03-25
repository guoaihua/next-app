import { createContext, useContext, useState } from "react";


const ParentDataContext = createContext({
    data: {},
    setData: (...args: any) => { }
})


export const ParentDataProvider = ({ children }) => {
    const [data, setData] = useState<Record<string, any>>({});

    const contextValue = {
        data,
        setData: (path: string, value: any) => {
            setData(prev => ({
                ...prev,
                [path]: value
            }));
        }
    };

    return (
        <ParentDataContext.Provider value={contextValue}>
            {children}
        </ParentDataContext.Provider>
    );
};

export const useParentData = () => useContext(ParentDataContext);