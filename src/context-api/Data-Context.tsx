import React, { createContext } from "react";
import type { DataItem } from "../models/Context-api";


interface DataContextType {
    item: DataItem[],
    setItem:React.Dispatch<React.SetStateAction<DataItem[]>>,
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextType>({
    status: 'view',
    setStatus: () => {},
    item: [],
    setItem :() => {}
});

export default DataContext;