
import { useContext } from "react";
import SaveBtn from "../components/SaveBtn";
import TodoForm from "../components/TodoForm";
import TodoMap from "../components/TodoMap";
import DataContext from "../context-api/Data-Context";
import { Link } from "react-router-dom";


const CreateTodo = () => {
    const {status,setStatus} = useContext(DataContext);
    
    return (
        <div className="bg-[#D4A483] min-h-[100dvh] flex flex-col items-center">
            <nav className="w-full max-w-[1200px] flex py-4">
                <section className="w-full tablet:w-[30%] h-full flex justify-evenly text-4xl">
                    { (status === 'view' || status === 'edit') && (
                        <button 
                            className="textShadow text-[#197862] cursor-pointer"
                            onClick={()=>setStatus('add')}
                        >ADD</button>
                    )}
                    { status === 'view' && (
                        <button 
                            className="textShadow text-[#FDEA61] cursor-pointer"
                            onClick={()=>setStatus('edit')}
                        >EDIT</button>
                    )}
                    { status === 'add' && (
                        <button 
                            className="textShadow text-[#197862] cursor-pointer"
                            onClick={()=>setStatus('view')}
                        >BACK</button>
                    )}
                    { (status === 'add' || status === 'edit') && (
                        <SaveBtn />
                    )}
                </section>
                <aside className="hidden w-[70%] tablet:flex justify-evenly pl-[20%] text-2xl font-azeret select-none">
                    <Link to="/history" className="text-[#FFFFFF] cursor-pointer px-2">history</Link>
                     <Link to="/failed" className="text-[#FFFFFF] cursor-pointer px-2">failed</Link>
                     <Link to="/succed" className="text-[#FFFFFF] cursor-pointer px-2">succed</Link>
                </aside>
            </nav>
            {
                (status === 'view' || status === 'edit') ? <TodoMap/> : <TodoForm/>
            }
        </div>
    );
};

export default CreateTodo;