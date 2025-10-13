import React, { createContext } from "react";
import type { DataItem } from "../models/Context-api";


interface DataContextType {
    item: DataItem[],
    setItem:React.Dispatch<React.SetStateAction<DataItem[]>>,
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    todoText:string,
    setTodoText:React.Dispatch<React.SetStateAction<string>>;
    isTextAreaValue:boolean;
    setTextAreaValue:React.Dispatch<React.SetStateAction<boolean>>
}

const DataContext = createContext<DataContextType>({
    status: 'view',
    setStatus: () => {},
    item: [],
    setItem :() => {},
    todoText:'',
    setTodoText:()=>{},
    isTextAreaValue:false,
    setTextAreaValue:()=>{}
});

export default DataContext;