import DataContext from "./Data-Context";
import { UI_Data } from "./Data";
import { useState } from "react";
import type { DataItem, DateType, TodoType } from "../models/Context-api";


export default function ReactProvider ({children}:{children:React.ReactNode}){
    const [status,setStatus] = useState('view');
    const [item,setItem] = useState<DataItem[]>([]);
    const [todoText,setTodoText] = useState<string>('');
    const [isTextAreaValue,setTextAreaValue] = useState<boolean>(false);
    const [todo, setTodo] = useState<TodoType[]>([]);
    const [date,setDate] = useState<DateType>({
        isOpen:false,
        date:undefined,
    });
    const [dateValidation,setDateValidation] = useState<string>('');

    
    const contextValue = {
        UI_Data,
        status,
        item,
        setItem,
        setStatus,
        todoText,
        setTodoText,
        isTextAreaValue,
        setTextAreaValue,
        todo, setTodo,
        date,setDate,
        dateValidation,setDateValidation,

    }
    return <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
};