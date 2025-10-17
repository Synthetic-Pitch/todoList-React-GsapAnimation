import {  useContext, useEffect, useState } from "react";
import DataContext from "../context-api/Data-Context";
import type { TodoType } from "../models/Context-api";



export function UseTodo(){
    const [deleteList,setDeleteList] = useState<number[]>([]);
    const [toggleToolTp,setToggleToolTp] = useState(false);
    const [emptyInput,setEmptyInput] = useState<number | null>(null);
    const {item,setItem,todoText,setTodoText,isTextAreaValue,setTodo,date,setDate} = useContext(DataContext);
    const storage = localStorage.getItem('todo');

    useEffect(()=>{
        if(storage){
            setTodo(JSON.parse(storage));
        }else console.log('asd');
    },[storage,date]);

    // This add item together with random UUID and check if it has empty value
    const AddItem = () => {
        const condition = item.some((item,_)=> item.text.trim() === '');
        
        if(condition) { 
            const findIndex = item.findIndex((i,_)=> i.text.trim() === ''); //this find what index is empty
            setEmptyInput(findIndex === -1 ? null:findIndex);
            setToggleToolTp(true);
            setTimeout(()=>{
                setToggleToolTp(false);
            },1600);
            return;
        }else{
            const value = {
                id:crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
                text:''
            }
            setItem(prev=>[...prev,value]); 
        }
       
    }

    // This delete specific index from list
    const DeleteItem = () => {
        const indexSet = new Set(deleteList);
        setItem(prev=>
            prev.filter((_,index)=> !indexSet.has(index))
        );
        setDeleteList([]);
    }

    //this delete 
    const DeleteTodo = ( id:string )=> {
        setTodo(prev=>{
            const updated = prev.filter((td:TodoType,_)=> td.id !== id);
            localStorage.setItem('todo',JSON.stringify(updated));
            return updated;
        });
    };

    const DeleteTdoItem = (todoID: string, todoItem: string) => {
        setTodo(prev => {
            const updated = prev.map(td => {
                if (td.id === todoID) {
                    return {
                        ...td,
                        item: td.item.filter(item => item.id !== todoItem)
                    };
                }
                return td;
            });
            
            // Update localStorage after state update
            localStorage.setItem("todo", JSON.stringify(updated));
            return updated;
        });
    };

    return {
        item,setItem,AddItem,DeleteItem,deleteList,setDeleteList,
        toggleToolTp,emptyInput,todoText,setTodoText,isTextAreaValue,
        DeleteTodo,DeleteTdoItem,date,setDate
    }
}