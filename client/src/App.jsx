import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from "axios"
import { Toaster } from "react-hot-toast"
import { UserContextProvider } from "./context/userContext"
import { DashBoard } from "./pages/DashBoard"

axios.defaults.baseURL = "http://localhost:5001"
axios.defaults.withCredentials = true

function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position="top-right" toastOptions={{ durations: 2000 }} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </UserContextProvider >
  )
}

export default App
