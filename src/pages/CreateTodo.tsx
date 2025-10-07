import TodoForm from "../components/TodoForm";
import TodoMap from "../components/TodoMap";
import { UseTodo } from "../customHook/todoHook";

const CreateTodo = () => {
    const {status,setStatus} = UseTodo();

    return (
        <div className="bg-[#D4A483] min-h-[100dvh] flex flex-col items-center">
            <nav className="w-full max-w-[1200px] flex py-4">
                <section className="w-full tablet:w-[30%] h-full flex justify-evenly text-3xl">
                    {
                        (status === 'view' || status === 'edit') ? (
                            <button onClick={()=>setStatus('add')} className="px-4 cursor-pointer font-azeret outline-0 text-shadow-2xs text-[#197862]">Add</button>
                        ) : (
                            <button onClick={()=>setStatus('view')} className="px-4 cursor-pointer font-azeret outline-0 text-shadow-2xs text-[#197862]">Back</button>
                        )
                    }
                    {
                        status === 'view' ? (
                            <button onClick={()=>setStatus('edit')} className="px-4 cursor-pointer font-azeret outline-0 text-shadow-2xs text-[#FDEA61]">Edit</button>
                        ) : (
                            <button onClick={()=>setStatus('view')} className="px-4 cursor-pointer font-azeret outline-0 text-shadow-2xs text-[#FDEA61]">Save</button>
                        )
                    }
                </section>
                <aside className="hidden w-[70%] tablet:flex justify-evenly pl-[20%] text-xl font-azeret select-none">
                    <button className="text-[#FFFFFF] cursor-pointer px-2">history</button>
                    <button className="text-[#FFFFFF] cursor-pointer px-2">failed</button>
                    <button className="text-[#FFFFFF] cursor-pointer px-2">succed</button>
                </aside>
            </nav>
            {
                (status === 'view' || status === 'edit') ? <TodoMap/> : <TodoForm/>
            }
        </div>
    );
};

export default CreateTodo;