import { UseTodo } from "../customHook/todoHook";

const TodoForm = () => {
    const {AddItem,item,setItem} = UseTodo();
    
    return (
        <div className="w-full max-w-[1200px] flex flex-col items-center">
            <textarea rows={4} className="w-full tablet:w-[80%] py-4 px-2 outline-1 rounded-xl outline-gray-700 text-xl"></textarea>
            
            <section className="w-full px-4 py-6">
                <aside className="flex gap-4 select-none">
                    <button className="cursor-pointer px-2 bg-[red] rounded-xl" onClick={AddItem}>+addItem</button>
                    <button className="cursor-pointer px-2 bg-[red] rounded-xl">delete</button>
                    <button className="cursor-pointer px-2 bg-[red] rounded-xl">date</button>
                </aside>
            </section>

            <main className="w-full pl-4">{
                item.map((_,index:number)=>(
                    <div key={index} className="flex gap-2 mt-2">
                        <input type="checkbox" className="h-6 w-6" />
                        <input 
                            type="text" 
                            className="bg-[white] outline-0 px-2 h-6" 
                            value={item[index]}
                            onChange={(e)=>{
                                const val = e.target.value;
                                 setItem(prev => {
                                    const newItems = [...prev]; // copy the array
                                    newItems[index] = val;      // update specific index
                                    return newItems;            // return new array
                                })
                            }}
                        />
                    </div>
                ))
            }</main>
        </div>
    );
};

export default TodoForm;