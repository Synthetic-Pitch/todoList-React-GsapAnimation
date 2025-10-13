import DataContext from "./Data-Context";
import { UI_Data } from "./Data";
import { useState } from "react";
import type { DataItem } from "../models/Context-api";


export default function ReactProvider ({children}:{children:React.ReactNode}){
    const [status,setStatus] = useState('view');
    const [item,setItem] = useState<DataItem[]>([]);
    const [todoText,setTodoText] = useState<string>('');
    const [isTextAreaValue,setTextAreaValue] = useState<boolean>(false);
    
    const contextValue = {
        UI_Data,
        status,
        item,
        setItem,
        setStatus,
        todoText,
        setTodoText,
        isTextAreaValue,
        setTextAreaValue
    }
    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
};