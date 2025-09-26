import DataContext from "./Data-Context";
import { UI_Data } from "./Data";
import { useState } from "react";

export default function ReactProvider ({children}:{children:React.ReactNode}){
    const [status,setStatus] = useState('view');
    const contextValue = {
        UI_Data,
        status,
        setStatus
    }
    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
};