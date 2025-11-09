import React, { createContext } from "react";
import type { DataItem, DateType, TodoType } from "../models/Context-api";

interface DataContextType {
    item: DataItem[],
    setItem:React.Dispatch<React.SetStateAction<DataItem[]>>,
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    todoText:string,
    setTodoText:React.Dispatch<React.SetStateAction<string>>;
    isTextAreaValue:boolean;
    setTextAreaValue:React.Dispatch<React.SetStateAction<boolean>>
    todo:TodoType[],
    setTodo:React.Dispatch<React.SetStateAction<TodoType[]>>,
    date:{
        isOpen:boolean,
        date:Date | undefined
    },
    setDate:React.Dispatch<React.SetStateAction<DateType>>,
    dateValidation:string,
    setDateValidation:React.Dispatch<React.SetStateAction<string>>,
}

const DataContext = createContext<DataContextType>({
    status: 'view',
    setStatus: () => {},
    item: [],
    setItem :() => {},
    todoText:'',
    setTodoText:()=>{},
    isTextAreaValue:false,
    setTextAreaValue:()=>{},
    todo:[],
    setTodo:()=>{},
    date:{
        isOpen:false,
        date: undefined
    },
    setDate:()=>{},
    dateValidation:'',
    setDateValidation:()=>{},
});

export default DataContext;