import { useContext } from "react";
import DataContext from "../context-api/Data-Context";



const SaveBtn = () => {  
    const {item,setItem, setStatus, todoText,setTodoText,isTextAreaValue,setTextAreaValue} = useContext(DataContext);
    
    const SaveTodo = () => {
        if(todoText.trim() === ''){
            console.log(isTextAreaValue);
            
            return setTextAreaValue(true);
        }else setTextAreaValue(false);

        let todo = {
            id: crypto.randomUUID(),
            todo: todoText.trim(),
            item: item,
            done: false,
            dateToAcomplish: '',
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
    }

    return (
        <>
            <button onClick={SaveTodo} className="textShadow text-[#FDEA61] cursor-pointer">
                SAVE
            </button>

        </>
    );
};

export default SaveBtn;