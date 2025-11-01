import deleteIcon from '../assets/images/delete.png';
import { useContext, useEffect, useState} from "react";
import type { TodoType } from "../models/Context-api";
import DataContext from "../context-api/Data-Context";
import { UseTodo } from '../customHook/todoHook';
import { el } from 'date-fns/locale';

const TodoMap =  () => {
    const {status,todo, setTodo} = useContext(DataContext);
    const {DeleteTodo,DeleteTdoItem} = UseTodo();
    const [sortedTodo,setSortedTodo] = useState<{ today: TodoType[]; tomorrow: TodoType[]; upcoming: TodoType[] }>({
        today: [],
        tomorrow: [],
        upcoming: []
    });
    
    useEffect(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        // Temporary arrays to collect todos
        const todayList: TodoType[] = [];
        const tomorrowList: TodoType[] = [];
        const upcomingList: TodoType[] = [];

        todo.forEach((item) => {
            const itemDate = new Date(item.dateToAcomplish);
            itemDate.setHours(0, 0, 0, 0);

            if (itemDate.getTime() === today.getTime()) {
                todayList.push(item);
            } else if (itemDate.getTime() === tomorrow.getTime()) {
                tomorrowList.push(item);
            } else if (itemDate.getTime() > tomorrow.getTime()) {
                upcomingList.push(item);
            }
        });

        // Update state once, after sorting
        setSortedTodo({
            today: todayList,
            tomorrow: tomorrowList,
            upcoming: upcomingList
        });

    }, [todo]);

    return (
        <div className=" w-full max-w-[1200px] flex flex-col gap-2 px-2">
            {/* this section is  for todo map: */}
            <section>
                {sortedTodo.today.length > 0 && <h1 className='text-white text-4xl'>Today</h1>}
                {/* Today */}
                {sortedTodo.today.map((td:TodoType)=>(
                    <div key={td.id} className=''>
                        <section className='flex items-center px-4'>
                            {
                                status === 'edit' && (
                                <img
                                    src={deleteIcon} alt=""
                                    className='h-4 cursor-pointer px-2'
                                    onClick={()=>DeleteTodo(td.id)}
                                />
                            )}
                           <input
                                type="text"
                                value={td.todo}
                                onChange={(e)=>{
                                    setTodo(prev => {
                                        const arr = [...prev];
                                        const indx = arr.findIndex(t => t.id === td.id);
                                        if (indx === -1) return prev;
                                        arr[indx] = { ...arr[indx], todo: e.target.value };
                                        return arr;
                                    });
                                }}
                                style={{
                                    width:`${td.todo.length + 1}ch`,
                                    outline:'none'
                                }}
                                className={`text-3xl font-poppins ${status === 'edit' ? "":"[&::selection]:bg-transparent"} `}
                                disabled={status === 'edit' ? false: true}
                            />
                        </section>
                        <section>{
                            td.item.map((itd)=>(
                                <div key={itd.id} className='flex items-center px-8'>
                                    {
                                        status === 'edit' && (
                                        <img
                                            src={deleteIcon} alt=""
                                            className={`h-4 cursor-pointer px-2 `}
                                            onClick={()=>DeleteTodo(td.id)}
                                        />
                                    )}
                                    <input type="text"
                                        value={itd.text}
                                        onChange={(e)=>{
                                            setTodo(prev=>{
                                                const arr = [...prev];
                                                const ind = arr.findIndex(t => t.id === td.id);
                                                const itemInd = arr[ind].item.findIndex(i=>i.id === itd.id);
                                                if (ind === -1 || itemInd === -1) return prev;
                                                arr[ind].item[itemInd] = {
                                                    ...arr[ind].item[itemInd],
                                                    text:e.target.value
                                                }
                                                return arr;
                                            });
                                        }}
                                        className={`outline-0 text-xl text-[#4d4d4d] ${status === 'edit' ? "":"[&::selection]:bg-transparent"}`}
                                        disabled={status === 'edit' ? false: true}
                                    />
                                </div>
                            ))
                        }</section>
                    </div>
                ))}

                {sortedTodo.tomorrow.length > 0 && <h1 className='text-white text-4xl'>Tomorrow</h1>}
                {/* Tomorrow */}
                {sortedTodo.tomorrow.map((td:TodoType)=>(
                   <div key={td.id} className=''>
                        <section className='flex items-center px-4'>
                            {
                                status === 'edit' && (
                                <img
                                    src={deleteIcon} alt=""
                                    className='h-4 cursor-pointer px-2'
                                    onClick={()=>DeleteTodo(td.id)}
                                />
                            )}
                           <input
                                type="text"
                                value={td.todo}
                                onChange={(e)=>{
                                    setTodo(prev => {
                                        const arr = [...prev];
                                        const indx = arr.findIndex(t => t.id === td.id);
                                        if (indx === -1) return prev;
                                        arr[indx] = { ...arr[indx], todo: e.target.value };
                                        return arr;
                                    });
                                }}
                                style={{
                                    width:`${td.todo.length + 1}ch`,
                                    outline:'none'
                                }}
                                className={`text-3xl font-poppins ${status === 'edit' ? "":"[&::selection]:bg-transparent"} `}
                                disabled={status === 'edit' ? false: true}
                            />
                        </section>
                        <section>{
                            td.item.map((itd)=>(
                                <div key={itd.id} className='flex items-center px-8'>
                                    {
                                        status === 'edit' && (
                                        <img
                                            src={deleteIcon} alt=""
                                            className={`h-4 cursor-pointer px-2 `}
                                            onClick={()=>DeleteTodo(td.id)}
                                        />
                                    )}
                                    <input type="text"
                                        value={itd.text}
                                        onChange={(e)=>{
                                            setTodo(prev=>{
                                                const arr = [...prev];
                                                const ind = arr.findIndex(t => t.id === td.id);
                                                const itemInd = arr[ind].item.findIndex(i=>i.id === itd.id);
                                                if (ind === -1 || itemInd === -1) return prev;
                                                arr[ind].item[itemInd] = {
                                                    ...arr[ind].item[itemInd],
                                                    text:e.target.value
                                                }
                                                return arr;
                                            });
                                        }}
                                        className={`outline-0 text-xl text-[#4d4d4d] ${status === 'edit' ? "":"[&::selection]:bg-transparent"}`}
                                        disabled={status === 'edit' ? false: true}
                                    />
                                </div>
                            ))
                        }</section>
                    </div>
                ))}
                
                {sortedTodo.upcoming.length > 0 && <h1 className='text-white text-4xl'>Upcoming</h1>}
                {/* Upcoming */}
                {sortedTodo.upcoming.map((td:TodoType)=>(
                   <div key={td.id} className=''>
                        <section className='flex items-center px-4'>
                            {
                                status === 'edit' && (
                                <img
                                    src={deleteIcon} alt=""
                                    className='h-4 cursor-pointer px-2'
                                    onClick={()=>DeleteTodo(td.id)}
                                />
                            )}
                           <input
                                type="text"
                                value={td.todo}
                                onChange={(e)=>{
                                    setTodo(prev => {
                                        const arr = [...prev];
                                        const indx = arr.findIndex(t => t.id === td.id);
                                        if (indx === -1) return prev;
                                        arr[indx] = { ...arr[indx], todo: e.target.value };
                                        return arr;
                                    });
                                }}
                                style={{
                                    width:`${td.todo.length + 1}ch`,
                                    outline:'none'
                                }}
                                className={`text-3xl font-poppins ${status === 'edit' ? "":"[&::selection]:bg-transparent"} `}
                                disabled={status === 'edit' ? false: true}
                            />
                        </section>
                        <section>{
                            td.item.map((itd)=>(
                                <div key={itd.id} className='flex items-center px-8'>
                                    {
                                        status === 'edit' && (
                                        <img
                                            src={deleteIcon} alt=""
                                            className={`h-4 cursor-pointer px-2 `}
                                            onClick={()=>DeleteTodo(td.id)}
                                        />
                                    )}
                                    <input type="text"
                                        value={itd.text}
                                        onChange={(e)=>{
                                            setTodo(prev=>{
                                                const arr = [...prev];
                                                const ind = arr.findIndex(t => t.id === td.id);
                                                const itemInd = arr[ind].item.findIndex(i=>i.id === itd.id);
                                                if (ind === -1 || itemInd === -1) return prev;
                                                arr[ind].item[itemInd] = {
                                                    ...arr[ind].item[itemInd],
                                                    text:e.target.value
                                                }
                                                return arr;
                                            });
                                        }}
                                        className={`outline-0 text-xl text-[#4d4d4d] ${status === 'edit' ? "":"[&::selection]:bg-transparent"}`}
                                        disabled={status === 'edit' ? false: true}
                                    />
                                </div>
                            ))
                        }</section>
                    </div>
                ))}
            </section>

            {/* history */}
            <section>

            </section>
            
            {
            // (Array.isArray(todo) && todo.length > 0 && todo !== undefined) &&
            // todo.map((td:TodoType,index:number) => (
            //     <div key={td.id || index} className=''>
            //        <section className='flex items-center px-4'>
            //             {
            //                 status === 'edit' && (
            //                 <img 
            //                     src={deleteIcon} alt="" 
            //                     className='h-5 cursor-pointer px-2'
            //                     onClick={()=>DeleteTodo(td.id)}
            //                 />
            //             )}
            //             <input
            //                 type="text"
            //                 value={ td.todo }
            //                 onChange={(e)=>{
            //                     setTodo(prev=>{
            //                         const arr = [...prev];
            //                         arr[index].todo = e.target.value;
            //                         return arr;
            //                     })
            //                 }}
            //                 style={{width:`${td.todo.length + 1}ch`,outline:'none'}}
            //                 className='text-4xl font-poppins'
            //                 disabled={status === 'edit' ? false: true}
            //             />
            //        </section>
            //        <aside className='px-8'>
            //             {
            //                 td.item.map((tdi,_)=>{
            //                     if(tdi.text !== ''){
            //                         return (
            //                              <div key={tdi.id} className='flex items-center py-1'>
            //                                 { 
            //                                     status === 'edit' && (
            //                                         <img 
            //                                             src={deleteIcon} alt="" 
            //                                             className='h-3 cursor-pointer px-2'
            //                                             onClick={()=>DeleteTdoItem(td.id,tdi.id)}
            //                                         />
            //                                     )}
            //                                 <input
            //                                     type="text" value={tdi.text}
            //                                     onChange={(e) => {
            //                                         setTodo(prev => {
            //                                             return prev.map(todo => {
            //                                                 // Find the matching todo
            //                                                 if (todo.id === td.id) {
            //                                                     return {
            //                                                         ...todo,
            //                                                         item: todo.item.map(item => {
            //                                                             // Find the matching item and update its text
            //                                                             if (item.id === tdi.id) {
            //                                                                 return {
            //                                                                     ...item,
            //                                                                     text: e.target.value
            //                                                                 };
            //                                                             }
            //                                                             return item;
            //                                                         })
            //                                                     };
            //                                                 }
            //                                                 return todo;
            //                                             });
            //                                         });
            //                                     }}
            //                                     className='outline-0'
            //                                     disabled={status === 'edit' ? false : true}
            //                                 />
            //                             </div>
            //                         )
            //                     }
            //                 })
            //             }
            //        </aside>
            //     </div>
            // ))
        }

       
        </div>
    );
};

export default TodoMap;