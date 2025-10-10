import { useEffect, useState } from "react";

export type ItemType = {
    id:string;
    text:string;
}

export function UseTodo(){
    const [status,setStatus] = useState('view');
    const [item,setItem] = useState<ItemType[]>([]);
    const [deleteList,setDeleteList] = useState<number[]>([]);
    const [toggleToolTp,setToggleToolTp] = useState(false);
    const [emptyInput,setEmptyInput] = useState<number | null>(null);

    useEffect(()=>{
       console.log(item);
    },[item]);
    
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
                id:crypto.randomUUID(),
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
        )
        setDeleteList([]);
    }

    return {
        status,setStatus,item,setItem,AddItem,DeleteItem,deleteList,setDeleteList,
        toggleToolTp,emptyInput
    }
}