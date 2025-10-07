import { useContext,useEffect,useRef, useState } from "react";
import MainLayout from "../layout/MainLayout";
import DataContext from "../context-api/Data-Context";
import { DayPicker } from 'react-day-picker';



interface Td {
  id:number,
  done:boolean,
  DateToAcomplish:string,
  item:string[],
  text:string
}

type TodoList = {
  today: Td[];
  tomorrow: Td[];
  upcoming: Td[];
};

const CreateTodo = () => {
  const {status,setStatus} = useContext(DataContext);
  const [item,setItem] = useState<string[]>([]);
  const [todo,setTodo] = useState<string>('');
  const ref = useRef<HTMLInputElement | null>(null);
  const modal = useRef<HTMLDialogElement | null>(null)
  const datePicker = useRef<HTMLDialogElement | null>(null)
  const [onCheck, setOnCheck] = useState<number[]>([]);
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  
  const [todoList,setTodoList] = useState<TodoList>({
    today:[],
    tomorrow:[],
    upcoming:[]
  });
  
  useEffect(()=>{
    const localTodo = JSON.parse(localStorage.getItem("todos") || '[]');
    SortTodo(localTodo)
  },[localStorage.getItem("todos")]);
  useEffect(()=>{
    console.log(status);
    
  },[status])


  const SortTodo = (todo:any[]) => {
    const today = new Date().toLocaleDateString();
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString(); // add 1 day in ms
   
    
    setTodoList((prev: TodoList) => ({
      ...prev, // keep today, tomorrow, upcoming
      today: todo.filter((td: Td) => td.DateToAcomplish === today),
      tomorrow: todo.filter((td:Td) => td.DateToAcomplish === tomorrow),
      upcoming: todo.filter((td:Td) => td.DateToAcomplish !== today && td.DateToAcomplish !== tomorrow)
    }));

  }

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
    
    const newTodo = { id: Date.now(), text:todo, done: false,item:item, DateToAcomplish:selected.toLocaleDateString() || null };
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
          {/* //displaying todo */}
          {
            status === 'view' && (
              <>
                {todoList.today.length > 0 && <h1>Today</h1>}
                {todoList.today.map((td)=><div key={td.id}>{td.text}</div>)}
                {todoList.tomorrow.length > 0 && <h1>Tomorrow</h1>}
                {todoList.tomorrow.map((td)=><div key={td.id}>{td.text}</div>)}
              </>
            )
          }
          {/* //adding todo */}
          {
            status === 'add' && (
              <>
                <textarea 
                  name="text" 
                  placeholder="enter todo"  
                  className="px-4 py-4 min-h-20 w-full tablet:w-[90%] outline-1 rounded-xl m-auto" 
                  cols={50}
                  rows={4}
                />
                <div className="flex gap-6 mt-6">
                  <button 
                    className="cursor-pointer bg-[#89db89] px-4 rounded-xl" 
                    onClick={AddItem}>+addItem</button>
                  <button 
                    className="cursor-pointer bg-[#dd7777] px-4 rounded-xl " 
                    onClick={DeleteItem}>delete</button>
                  <button className="cursor-pointer bg-[#ddbe77] px-4 rounded-xl ">Date</button>
                </div>
                <div className="flex flex-col gap-2 py-2 mt-2">
                  {
                    item.map((singleItem, index) => (
                      <div key={index} className="flex gap-2">
                        <input 
                          onChange={(e)=>{
                            const val = e.target.checked
                            if(val){
                              setOnCheck(prev=>[...prev,index])
                            }
                          }}
                          type="checkbox" 
                          className=" h-6 w-6"
                        />
                        <input 
                          type="text" 
                          placeholder="enter item" 
                          value={singleItem}  // ✅ Just use singleItem, not item[index]
                          onChange={(e) => {
                            // Update the specific index when user types
                            const newArray = [...item];
                            newArray[index] = e.target.value;
                            setItem(newArray);
                          }}
                          className="px-6 outline-0 bg-[#ede0e0]"
                        />
                      </div>
                    ))
                  }
                </div>
              </>
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