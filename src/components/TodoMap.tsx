import { useEffect, useState } from "react";
import type { TodoType } from "../models/Context-api"; 
const TodoMap =  () => {
    const [todo,setTodo] = useState([])
    const storage = localStorage.getItem('todo');
    
    useEffect(()=>{
        if(storage){
            setTodo(JSON.parse(storage));
        }
    },[storage]);

    return (
        <div className=" w-full max-w-[1200px]">{
            todo.map((td:TodoType)=>(
                <div key={td.id}>
                    <div className="flex">
                         <input type="checkBox" />
                         <h1 className="text-xl font-bold">{td.todo}</h1>
                    </div>
                    
                    {
                        td.item.map((item)=>(
                            <div key={item.id} className="text-[#fdfdfd] pl-4">{item.text}</div>
                        ))
                    }
                </div>
            ))
        }</div>
    );
};

export default TodoMap;