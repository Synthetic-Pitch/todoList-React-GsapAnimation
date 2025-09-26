import { createContext } from "react";
import type { DataItems } from "../models/Context-api";

interface DataContextType {
    UI_Data: DataItems[];
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
}

const DataContext = createContext<DataContextType>({
    UI_Data: [],
    status: 'view',
    setStatus: () => {},
});

export default DataContext;