import { useContext,useEffect,useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import DataContext from "../context-api/Data-Context";
import { DayPicker } from 'react-day-picker';



const CreateTodo = () => {
  const {status,setStatus} = useContext(DataContext);
  const [item,setItem] = useState<string[]>([]);
  const [todo,setTodo] = useState<string>('');
  const ref = useRef<HTMLInputElement | null>(null);
  const modal = useRef<HTMLDialogElement | null>(null)
  const datePicker = useRef<HTMLDialogElement | null>(null)
  const [onCheck, setOnCheck] = useState<number[]>([]);
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  // const [todoList,setTodoList] = useState<any>({
  //   today:[],
  //   tomorrow:[],
  //   upcoming:[]
  // });
  
  useEffect(()=>{
    const localTodo = JSON.parse(localStorage.getItem("todos") || '[]');
    localTodo.forEach((todo:any)=>console.log(todo.text));
  },[localStorage.getItem("todos")]);

  const AddItem = () => {
    if(item.includes(''))return
    setItem(prev=>[...prev,'']);
  }

  const UpdateItem = (index: number, newValue: string) => {
    setItem(prev => prev.map((item, i) => i === index ? newValue : item));
  };
  
  const DeleteItem = ()=> {
    const Filtered = item.filter((_,index)=>!onCheck.includes(index));
    setItem(Filtered);
    setOnCheck([]);
    if(ref.current) ref.current.checked = false;
  }
  
  const SaveItem = async () => {
    if(todo === '' || selected === undefined) {
      
      return
    }
    modal.current?.showModal()
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        modal.current?.close();
        resolve();
      }, 1500)
    })
   
    const newTodo = { id: Date.now(), text:todo, done: false,item:item, DateToAcomplish:selected || null };
    const todos = JSON.parse(localStorage.getItem("todos") || "[]")
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
    setStatus('view');
  }

  return (
    <MainLayout>
      <main className="bg-[#D4A483] min-h-[100dvh] w-full flex flex-col items-center">
        <nav className="h-[100px] w-full max-w-[1200px] flex">
          <section className="h-full w-[70%] tablet:w-[30%] flex justify-evenly items-center font-bold tracking-[3px] text-4xl font-azeret">
            {
              status === 'view' && (
                <button onClick={()=>setStatus('add')} className="text-[#197862]">Add</button>
              )
            }
            {
              status === 'add' && (
                <button className="text-[#197862] cursor-pointer h-min " onClick={()=>setStatus('view')}>Back</button>
              )
            }
            {
              status === 'add' ? (
                <button
                  className="text-[#f9ee95] cursor-pointer h-min"
                  onClick={SaveItem}
                >Save</button>
              ):(
                <button
                  className="text-[#dedede]"
                >Edit</button>
              )
            }
          </section>
          <section className="h-full w-[30%] tablet:w-[70%] flex justify-end items-center px-6 text-white select-none text-2xl font-azeret">
            <div className="hidden tablet:flex gap-[65px]">
              <button className="cursor-pointer h-min">history</button>
              <button className="cursor-pointer h-min">failed</button>
              <button className="cursor-pointer h-min">succed</button>
            </div>
          </section>
        </nav>
        <aside className="w-full max-w-[1200px] flex flex-col">
          {
            (status === 'view' || status === 'edit') ? (
              <main>
                 
              </main>
            ) : (
                <div className="flex flex-col">
                  <textarea
                    value={todo}
                    onChange={(e)=>setTodo(e.target.value)}
                    placeholder="add todo"
                    className="text-2xl rounded-[2rem] font-mono outline-0 px-4 py-4 bg-[#e9b390] w-full desktop:w-[80%] mb-[1rem] mx-auto"
                    rows={4}
                  />
                <aside className="ml-4 relative">
                  <button className="cursor-pointer bg-[#00800060] px-4 rounded-full text-white select-none" onClick={AddItem}>+addItem</button>
                  {
                    (item.length > 0 && onCheck.length > 0) && (
                      <button
                        className="ml-4 cursor-pointer bg-[#ff000093] px-2 rounded-full text-white select-none" onClick={DeleteItem}>
                          delete
                      </button>
                    )
                  }
                  <button className="ml-4 cursor-pointer bg-[#f9ee95] px-4 rounded-xl" onClick={()=>datePicker.current?.showModal()}>{selected ? selected.toLocaleDateString():"select date"}</button>
                  <main className="mt-4 flex flex-col gap-2">
                    {
                      item.map((value,index) => (
                        <div key={index} className="h-[30px] flex items-center gap-2">
                          <input
                            type="checkbox"
                            className="h-[20px] w-[20px] outline-0 border-0"
                            checked={onCheck.includes(index)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                  setOnCheck((prev) => [...prev, index]);
                                } else {
                                  setOnCheck((prev) => prev.filter((i) => i !== index));
                                }
                              }
                            }
                          />
                          <input 
                            type="text" 
                            placeholder="enter item" 
                            value={value} 
                            onChange={(e) => UpdateItem(index, e.target.value)} 
                            className="outline-0 h-full w-full tablet:w-[500px] desktop:w-[600px] bg-[#eee6e74b] m-0 px-4 font-mono placeholder:text-gray-500 placeholder:font-mono"
                          /> 
                        </div> 
                      )) 
                    } 
                  </main> 
                </aside> 
              </div> 
            )
          }
        </aside>
        <dialog ref={modal} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#8dd38d] px-[100px] py-[100px] rounded-2xl outline-0">
          <p className="text-[#dddddd] text-4xl">succes</p>
        </dialog>
        <dialog ref={datePicker} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#dcd0a6] px-[20px] py-[40px] rounded-2xl outline-0">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date)=>{
              setSelected(date);
              datePicker.current?.close();
            }}
          />
        </dialog>

      </main>
    </MainLayout>
  )
}

export default CreateTodo