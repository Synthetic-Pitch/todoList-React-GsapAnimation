import { UseTodo } from "../customHook/todoHook";
import type { ItemType } from '../customHook/todoHook';
import { Tooltip as ReactTooltip} from 'react-tooltip';

const TodoForm = () => {
    const {AddItem,item,setItem,DeleteItem,setDeleteList,toggleToolTp,emptyInput} = UseTodo();

    return (
        <div className="w-full max-w-[1200px] flex flex-col items-center">
            <textarea rows={4} className="w-full tablet:w-[80%] py-4 px-2 outline-1 rounded-xl outline-gray-700 text-xl"></textarea>
            
            <section className="w-full px-4 py-6">
                <aside className="flex gap-4 select-none">
                    <button 
                        className="cursor-pointer px-2 bg-[red] rounded-xl" onClick={AddItem}>+addItem</button>
                    <button
                        className="cursor-pointer px-2 bg-[red] rounded-xl"
                        onClick={DeleteItem}
                    >delete</button>
                    <button 
                        className="cursor-pointer px-2 bg-[red] rounded-xl">date</button>
                </aside>
            </section>
            
            {/* This is Item's map*/}
            <main className="w-full pl-4">{
                item.map((i:ItemType,index:number)=>(
                    <div key={i.id} className="flex gap-2 mt-2">
                        <input
                            type="checkbox"
                            className="h-6 w-6"
                            onChange={(e)=>{
                                if(e.target.checked){
                                    setDeleteList(prev=>[...prev,index]);
                                }else{
                                    setDeleteList(prev=>prev.filter((d)=> d !== index))
                                }
                            }}
                         />
                        <input 
                            type="text" 
                            data-tooltip-id={`${emptyInput === index ? 'my-tooltip':''}`}
                            data-tooltip-content="please add item"
                            className="bg-[white] outline-0 px-2 h-6"
                            value={i.text}
                            onChange={(e)=>{
                                setItem(prev=>{
                                    const arr = [...prev];
                                    arr[index].text = e.target.value;
                                    return arr;
                                })
                            }}
                        />
                    </div>
                ))
            }</main>
           
            <ReactTooltip id="my-tooltip" isOpen={toggleToolTp}/>
        </div>
    );
};

export default TodoForm;