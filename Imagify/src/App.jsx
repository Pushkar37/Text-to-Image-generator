import Result from "./pages/Result"
import Home from "./pages/Home"
import Buycredits from "./pages/Buycredits"
import {Routes,Route} from 'react-router-dom'
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Login from "./components/Login"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function App() {
  
 const{showLogin}=useContext(AppContext);
  return (
   
      <div className=" px-14 sm:px-18 md:px-22 lg:px-32  min-h-screen bg-gradient-to-b from teal-50 to-orange-50  ">
        <ToastContainer position="bottom-right"/>
        <Navbar/>
        {showLogin?<Login/>:''}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/result" element={<Result/>}/>
          <Route path="/buycredits" element={ <Buycredits/>}/>
        </Routes>
        
        <Footer/>
      </div>
  )}
  export default App;