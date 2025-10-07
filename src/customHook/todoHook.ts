import { useEffect, useState } from "react";


export function UseTodo(){
    const [status,setStatus] = useState('view');
    const [item,setItem] = useState<string[] >([]);

    useEffect(()=>{
        console.log(item);
    },[item])

    const AddItem = () => {
        if (item.includes(''))return;
        setItem(prev=>[...prev,''])
    }
    const DeleteItem = () => {
        
    }

    return {status,setStatus,item,setItem,AddItem,DeleteItem}
}