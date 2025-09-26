import { useContext, useEffect, useState } from "react";
import MainLayout from "../layout/MainLayout";
import DataContext from "../context-api/Data-Context";

const CreateTodo = () => {
  const {status,setStatus} = useContext(DataContext);
  const [item,setItem] = useState<string[]>([]);
  const [indexes,setIndexes] = useState<number[]>([]);
  const [onCheck, setOnCheck] = useState<number[]>([]);

  useEffect(()=>{
    console.log(onCheck,item);
  },[onCheck,item]);
  
  const AddItem = () => {
    setItem(prev=>[...prev,'']);
    console.log(item);
  }

  const UpdateItem = (index: number, newValue: string) => {
    setItem(prev => prev.map((item, i) => i === index ? newValue : item));
  };
  
  const DeleteItem = ()=> {
   const Filtered = item.filter((_,index)=>!onCheck.includes(index))
   setItem(Filtered);
   setOnCheck([]);
    
  }
  
  return (
    <MainLayout>
      <main className="bg-[#D4A483] min-h-[100dvh] w-full flex flex-col items-center">
        <nav className="h-[100px] w-full max-w-[1200px] flex">
          <section className="h-full w-[70%] tablet:w-[30%] flex justify-evenly items-center font-bold tracking-[3px] text-4xl font-azeret">
            <button
              className="text-[#197862] cursor-pointer h-min"
              onClick={()=>setStatus('add')}
            >{status === 'add' ? (<>Back</>) : 'ADD'}</button>
            <button
              className="text-[#FDEA61] cursor-pointer h-min"
              onClick={()=>setStatus('edit')}
            >{status === 'add' ? 'SAVE' : 'EDIT'}</button>
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
              <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem nihil debitis soluta ab delectus ad, nobis itaque saepe minima ipsam vitae incidunt ut dolorem laborum dignissimos voluptatum at est voluptate?
              </div>
            ) : (
                <div className="flex flex-col">
                  <textarea
                    placeholder="add todo"
                    className="text-2xl rounded-[2rem] font-mono outline-0 px-4 py-4 bg-[#e9b390] w-[80%] mb-[1rem] mx-auto "
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
                  <main className="mt-4 flex flex-col gap-2">
                    {
                      item.map((value,index) => (
                        <div key={index} className="h-[30px] flex items-center gap-2">
                          <input 
                            type="checkbox" 
                            className="h-[20px] w-[20px] outline-0 border-0" 
                            onChange={(e)=>{
                              if(e.target.checked){
                                setOnCheck(prev=>[...prev,index]);
                              }else setOnCheck(prev=>prev.filter(i=>i!==index));
                            }}/>
                          <input 
                            type="text" 
                            placeholder="enter item" 
                            value={value} 
                            onChange={(e) => UpdateItem(index, e.target.value)} 
                            className="outline-0 h-full min-w-[200px] bg-[#eee6e74b] m-0 px-4"
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
      </main>
    </MainLayout>
  )
}

export default CreateTodo