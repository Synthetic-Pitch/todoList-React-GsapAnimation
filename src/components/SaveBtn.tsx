import { useContext } from "react";
import DataContext from "../context-api/Data-Context";


const SaveBtn = () => {  // ✅ Receive as prop
    const {status,item,setStatus} = useContext(DataContext);

    const SaveTodo = ()=>{
        console.log(status,item);
        setStatus('view')
    }

    return (
        <button onClick={SaveTodo} 
            className=""
        >
            SAVE
        </button>
    );
};

export default SaveBtn;