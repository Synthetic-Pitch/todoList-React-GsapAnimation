import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreateTodo from "./pages/CreateTodo"
import History from "./pages/History"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addTodo" element={<CreateTodo/>}/>
       <Route path="/history" element={<History/>}/>
    </Routes>
  )
};

export default App
