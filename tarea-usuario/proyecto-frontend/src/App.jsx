import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './components/pages/home/Home'
import Register from './components/pages/register/Register'
import Login from './components/pages/login/Login'
import NavBar from "./components/navbar/NavBar"
import RecoverPass from "./components/pages/recover_password/RecoverPass"

function App() {
 

  return (
    <div className="App">
      <NavBar/>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/recoverPass" element={<RecoverPass/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
