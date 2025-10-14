import deleteIcon from '../assets/images/delete.png';
import { useContext, useEffect } from "react";
import type { TodoType } from "../models/Context-api"; 
import DataContext from "../context-api/Data-Context";


const TodoMap =  () => {
    const {status,todo, setTodo} = useContext(DataContext);
    const storage = localStorage.getItem('todo');
    
    useEffect(()=>{
        if(storage){
            setTodo(JSON.parse(storage));
        }
    },[storage]);
    
    const deleteTodo = (id:string)=> {
        console.log(id);
        setTodo(prev=>{
            const updated = prev.filter((td:TodoType,_)=> td.id !== id);
            localStorage.setItem('todo',JSON.stringify(updated));
            return updated;
        });
    }

    return (
        <div className=" w-full max-w-[1200px]">{
            (Array.isArray(todo) && todo.length > 0 && todo !== undefined) &&
            todo.map((td:TodoType,index:number) => (
                <div key={td.id || index} className=''>
                   <section className='flex items-center'>
                        <input
                            type="text"
                            value={ td.todo }
                            onChange={(e)=>{
                                setTodo(prev=>{
                                    const arr = [...prev];
                                    arr[index].todo = e.target.value;
                                    return arr;
                                })
                            }}
                            style={{width:`${td.todo.length + 2}ch`,outline:'none'}}
                            className='text-2xl'
                        />
                        { status === 'edit' && (
                            <img 
                                src={deleteIcon} alt="" 
                                className='h-5 cursor-pointer'
                                onClick={()=>deleteTodo(td.id)}
                            />
                        ) }
                   </section>
                   <aside>
                        {
                            td.item.map((tdi,_)=>(
                                <div key={tdi.id}>{tdi.text}</div>
                            ))
                        }
                   </aside>
                </div>
            ))
        }</div>
    );
};

export default TodoMap;