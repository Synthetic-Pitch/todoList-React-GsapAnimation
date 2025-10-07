import { useEffect, useState } from "react";


export function UseTodo(){
    const [status,setStatus] = useState('view');
    
    useEffect(()=>{
        console.log(status);
    },[status])

    return {status,setStatus}
}