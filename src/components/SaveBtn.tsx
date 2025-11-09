import { useContext, useState } from "react";
import DataContext from "../context-api/Data-Context";
import { Tooltip as ReactTooltip} from 'react-tooltip';

const SaveBtn = () => {
    const {item,setItem,status, setStatus, todoText,setTodoText,setTextAreaValue,todo,dateValidation,date,setDate,} = useContext(DataContext);
    const [isOpen,setOpen] = useState(false);

    const SaveTodo = () => {
        if(status === 'add'){
            handleEdit();
        }
        else if(status === 'edit'){
            localStorage.setItem('todo',JSON.stringify(todo));
            setStatus('view');
        }
    }
    
    const handleEdit = () =>  {
        
        // Check if todoText is empty
        if(todoText.trim() === ''){
            return setTextAreaValue(true);
        }else setTextAreaValue(false);
        // Check date validation
        if(dateValidation === 'invalid date' || dateValidation === 'please select a date'){
            setOpen(true);
            setTimeout(()=>{
                setOpen(false);
            },1500)
            return;
        }
        // Create new todo object
        let todo = {
            id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
            todo: todoText.trim(),
            item: item,
            done: false,
            dateToAcomplish: date.date?.toLocaleDateString() || undefined,
        }
        const prevTodo = localStorage.getItem('todo');
        if(prevTodo) {
            const arr = JSON.parse(prevTodo);
            const todoArr = Array.isArray(arr) ? arr : [arr];
            todoArr.push(todo);
            localStorage.setItem('todo', JSON.stringify(todoArr));
        } else {
            localStorage.setItem('todo', JSON.stringify([todo]));
        }
        setItem([]);
        setTodoText('');
        setStatus('view');
        setDate(prev=>({
            ...prev,
            date: undefined
        }))
    }
    
    return (
        <>
            <button onClick={SaveTodo} className="textShadow text-[#FDEA61] cursor-pointer">
                SAVE
            </button>
            <ReactTooltip 
                id="date-tooltip"
                style={{
                    fontSize: '16px',
                    position:'fixed',
                    zIndex:1000,
                }} 
                isOpen={isOpen}
            />
            
        </>
    );
};

export default SaveBtn;