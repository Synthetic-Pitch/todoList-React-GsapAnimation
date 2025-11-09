import deleteIcon from '../assets/images/delete.png';
import { useContext, useEffect, useState} from "react";
import type { TodoType } from "../models/Context-api";
import DataContext from "../context-api/Data-Context";
import { UseTodo } from '../customHook/todoHook';

const TodoMap =  () => {
    const {status,todo, setTodo,} = useContext(DataContext);
    const {DeleteTodo} = UseTodo();
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
            <div><h2 className='text-2xl text-[blue] cursor-pointer'>DONE</h2></div>
            <section >
                { sortedTodo.today.length > 0 && <h1 className='text-white text-4xl mb-4'>Today</h1>}
                
                { sortedTodo.today.map((td:TodoType) => (
                    <div key={td.id}>
                        
                        <section className='flex items-center px-4 gap-4'>
                            {
                                status === 'view' && (
                                    <input type="checkbox" name='isDoneCheckbox' className='h-5 w-5  bg-[#D4A483] border-1 border-black' />
                                )
                            }
                            {
                                status === 'edit' && (
                                <img
                                    src={deleteIcon} alt=""
                                    className='h-5 w-5 cursor-pointer object-cover'
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
                                name='todo'
                                style={{
                                    width:`${td.todo.length + 1}ch`,
                                    outline:'none',
                                }}
                                className={`text-3xl font-poppins ${status === 'edit' ? "":"[&::selection]:bg-transparent"} `}
                                disabled={status === 'edit' ? false: true}
                            />
                        </section>
                        <section>{
                            td.item.map((itd)=>(
                                <div key={itd.id} className='flex items-center px-18'>
                                    {
                                        status === 'edit' && (
                                        <img
                                            src={deleteIcon} alt=""
                                            className={`h-4 w-4 cursor-pointer mr-2`}
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
                
                {sortedTodo.tomorrow.length > 0 && <h1 className='text-white text-4xl mb-4'>Tomorrow</h1>}
                {/* Tomorrow */}
                {sortedTodo.tomorrow.map((td:TodoType)=>(
                   <div key={td.id} className=''>
                        <section className='flex items-center px-4 gap-4'>
                            {
                                status === 'view' && (
                                    <input type="checkbox" name='isDoneCheckbox' className='h-5 w-5  bg-[#D4A483] border-1 border-black' />
                                ) 
                            }
                            {
                                status === 'edit' && (
                                <img
                                    src={deleteIcon} alt=""
                                    className='h-5 w-5 cursor-pointer object-cover'
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
                                name='todo'
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
                                <div key={itd.id} className='flex items-center px-18'>
                                    {   
                                        status === 'edit' && (
                                        <img
                                            src={deleteIcon} alt=""
                                            className={`h-4 cursor-pointer `}
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
                
                {sortedTodo.upcoming.length > 0 && <h1 className='text-white text-4xl mb-4'>Upcoming</h1>}
                {/* Upcoming */}
                {sortedTodo.upcoming.map((td:TodoType)=>(
                   <div key={td.id} className=''>
                        <section className='flex items-center px-4 gap-4'>
                            {
                                status === 'view' && (
                                    <input type="checkbox" name='isDoneCheckbox' className='h-5 w-5  bg-[#D4A483] border-1 border-black' />
                                ) 
                            }
                             {
                                status === 'edit' && (
                                <img
                                    src={deleteIcon} alt=""
                                    className='h-5 w-5 cursor-pointer object-cover'
                                    onClick={()=>DeleteTodo(td.id)}
                                />
                            )}
                           <input
                                type="text"
                                name='todo'
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
                                <div key={itd.id} className='flex items-center px-18'>
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
       
        </div>
    );
};

export default TodoMap;