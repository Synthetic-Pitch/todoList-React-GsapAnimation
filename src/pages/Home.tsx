import MainLayout from "../layout/MainLayout";
import Img1 from '../assets/images/TimeLapseReview.png.png'
import Img2 from '../assets/images/paperBG.png'
import Img3 from '../assets/images/clip.png'
import Img4 from '../assets/images/pencil.png'
import Img5 from '../assets/images/check.png';
import Img6 from '../assets/images/barcode.png'
import { arr } from '../components/home-map'
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ArrType {
  id:number;
  toDo:string;
}

const Home = () => {
  const [selected,setSelected] = useState<number[]>([]);
  
  const handleClick = (id:number)=>{
    setSelected(prev =>
      prev.includes(id)? prev : [ ...prev, id]
    );
  }
  
  useGSAP(()=>{
    const section1 = document.querySelector("#section1") as HTMLElement | null;
    const pencil = document.querySelector("#pencil") as HTMLElement | null;
    
    if(!section1 || !pencil) return;
    const Y = (pencil.offsetTop + section1.offsetHeight) - pencil.offsetTop
    console.log(Y);
    
    gsap.to(pencil,{
      y:Y,
      x:-373,
      rotate:-90,
      scrollTrigger:{
        trigger:'#main2',
        start:'top center',
        scrub:1,
        markers:true
      },
    })
  },[])
  
  return (
    <MainLayout>
      <main className=" bg-[#D4A483] h-[100dvh] max-h-[1200px] w-full flex flex-col items-center relative">
        <svg viewBox="0 0 2400 1200" preserveAspectRatio="none" className="w-full max-w-[2400px] h-full absolute">
          <path d="M 0,159 L 1113,159 A 300,300 0 0 1 1313,0 L 2400,0 L 2400,1200 L 1869,1199 A 200,200 0 0 1 1656,1042 A 200,200 0 0 0 1464,880 L 1303,880 A 200,300 0 0 1 1113,570 A 350,200 0 0 0 778,360 L 0,360 Z" fill="#D9D9D9"/>
        </svg>

        <section className="w-full max-w-[2000px] h-full text-9xl relative">
          <aside className="h-[5%] tablet:h-[10%] w-full flex px-1 tablet:px-6 mt-2">
            <h1 className="bg-[#FFFFFF] text-sm inline max-h-min px-4 text-[gray] cursor-pointer select-none hover:scale-[1.1] transition-all duration-300">sign in</h1>
          </aside>

          <aside className="h-[75%] tablet:h-[70%] w-full flex flex-col tablet:flex-row">
            <section className="h-[30%] tablet:w-[30%] tablet:h-full flex flex-col relative select-none ">
              <div className="h-[50%] text-4xl tablet:text-5xl 1300:text-6xl text-center pb-4 font-bagel text-[#5D5D5D] flex flex-col justify-end">
                <h2>forbidden</h2><h2>forgotten</h2>
              </div>
              <div className="h-[50%] flex items-center justify-center">
                <img src={Img1} alt="" draggable="false" className="w-[80px] h-[120px] tablet:w-[280px] tablet:h-[320px] object-contain" />
              </div>
            </section>
            <section className="scrollXHidden w-full tablet:w-[70%] h-full gap-2 tablet:gap-6 px-6 overflow-x-scroll flex 1300:justify-center items-center overflow-y-hidden">
              {
                arr.map((todo:ArrType)=>(
                  <div key={todo.id} className="shadowEffect1 h-[60%] max-h-[400px] w-[250px] flex-shrink-0 relative rounded-tr-[5rem]">
                    <span className="shadowEffect2 absolute top-5 right-5 h-8 w-8 tablet:h-10 tablet:w-10 bg-[#D9D9D9] z-10 cursor-pointer" onClick={()=>handleClick(todo.id)}
                    >
                      {
                        selected.includes(todo.id) && <img src={Img5} alt="" />
                      }
                    </span>
                    <img src={Img3} alt="" draggable="false" className="absolute z-2 h-20 w-20 -top-14 left-1/2 -translate-x-1/2"/>
                    <img src={Img2} alt="" draggable="false" className="absolute h-full object-fill w-full rounded-tr-[2rem]"/>
                    <p className="text-xl relative p-6 mt-12 select-none h-full line-clamp-6" draggable="false">{todo.toDo}</p>
                  </div>
                ))
              }
            </section>
          </aside>
          
          <aside className="h-[20%] w-full relative flex justify-start">
            <div className=" w-[100%] tablet:w-[70%] flex relative">
              <img id="pencil" src={Img4} alt="" className="w-full h-[24rem] 1300:h-[28rem] absolute top-1/2 -translate-y-1/2 object-contain" />
            </div>
            <div className="hidden tablet:flex flex-col gap-2">
              <img src={Img6} alt="" className="h-20 relative z-20"/>
              <h6 className="text-4xl font-poppins font-bold flex justify-end">2002</h6>
            </div>
          </aside>
        </section>
      </main>

      <main id="main2" className="bg-[#e5b08c] w-full h-[100dvh] max-h-[1200px] flex justify-center ">
        <section className="flex w-full max-w-[2000px] h-full">
          <section id="section1" className="bg-[red] h-full w-[25%]">

        </section>
        <section className="bg-[teal] h-full w-[75%]">

        </section>
        </section>
      </main>

      <main className=" bg-[#21b3b3] w-full h-screen max-h-[1200px]">
            
      </main>
    </MainLayout>
  )
}

export default Home;