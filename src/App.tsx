import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreateTodo from "./pages/CreateTodo"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/addTodo" element={<CreateTodo/>}/>
    </Routes>
  )
};

export default App
