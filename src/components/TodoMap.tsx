import deleteIcon from '../assets/images/delete.png';
import { useContext} from "react";
import type { TodoType } from "../models/Context-api";
import DataContext from "../context-api/Data-Context";
import { UseTodo } from '../customHook/todoHook';

const TodoMap =  () => {
    const {status,todo, setTodo} = useContext(DataContext);
    const {DeleteTodo,DeleteTdoItem} = UseTodo();
    
    return (
        <div className=" w-full max-w-[1200px] flex flex-col gap-2">{
            (Array.isArray(todo) && todo.length > 0 && todo !== undefined) &&
            todo.map((td:TodoType,index:number) => (
                <div key={td.id || index} className=''>
                   <section className='flex items-center px-4'>
                        { 
                            status === 'edit' && (
                            <img 
                                src={deleteIcon} alt="" 
                                className='h-5 cursor-pointer px-2'
                                onClick={()=>DeleteTodo(td.id)}
                            />
                        )}
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
                            style={{width:`${td.todo.length + 1}ch`,outline:'none'}}
                            className='text-4xl font-poppins'
                            disabled={status === 'edit' ? false: true}
                        />
                   </section>
                   <aside className='px-8'>
                        {
                            td.item.map((tdi,_)=>{
                                if(tdi.text !== ''){
                                    return (
                                         <div key={tdi.id} className='flex items-center py-1'>
                                    { 
                                        status === 'edit' && (
                                        <img 
                                            src={deleteIcon} alt="" 
                                            className='h-3 cursor-pointer px-2'
                                            onClick={()=>DeleteTdoItem(td.id,tdi.id)}
                                        />
                                    )}
                                    <input
                                        type="text" value={tdi.text}
                                        onChange={(e) => {
                                            setTodo(prev => {
                                                return prev.map(todo => {
                                                    // Find the matching todo
                                                    if (todo.id === td.id) {
                                                        return {
                                                            ...todo,
                                                            item: todo.item.map(item => {
                                                                // Find the matching item and update its text
                                                                if (item.id === tdi.id) {
                                                                    return {
                                                                        ...item,
                                                                        text: e.target.value
                                                                    };
                                                                }
                                                                return item;
                                                            })
                                                        };
                                                    }
                                                    return todo;
                                                });
                                            });
                                        }}
                                        className='outline-0'
                                        disabled={status === 'edit' ? false : true}
                                    />
                                </div>
                                    )
                                }
                            })
                        }
                   </aside>
                </div>
            ))
        }</div>
    );
};

export default TodoMap;