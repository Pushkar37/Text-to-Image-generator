import axios from "axios";
import { useEffect } from "react";
import { createContext ,useState} from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AppContext=createContext();
const AppContextProvider=(props)=>{
    const navigate=useNavigate();
    const [user, setUser] = useState(null);
    const [showLogin,setShowLogin]=useState(false);
    const backend_url=import.meta.env.VITE_BACKEND_URL
    const [credit,setCredit]=useState('0')
    const loadCreditsData= async()=>{
  try {
    const{data}=await axios.get(backend_url+'/api/user/credits',{headers:{token}})
    console.log(data)
    if(data.success){
        console.log(data.message)
        setCredit(data.credits)
        setUser(data.user)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
    }
    const generateImage=async(prompt)=>{
  try {
      const{data}=await axios.post(backend_url+'/api/image/generate-image',{prompt},{headers:{token}})
      console.log(data)
      if(data.sucess){
         await loadCreditsData()
          
          return data.image;
      }else{
          toast.error(data.message)
          await loadCreditsData()
          if(data.creditBalance==0){
              navigate("/buycredits");
          }
      }
  } catch (error) {
      toast.error(error.message)
  }
    }
    const [token,setToken]=useState(localStorage.getItem('token'))
    const logout=()=>{
        localStorage.removeItem('token');
        setToken('');
        setUser(null)
    }
    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])
   const value={
        user,setUser,showLogin,setShowLogin,backend_url,token,setToken,credit,setCredit ,loadCreditsData,logout,generateImage
    }
    return(
        <AppContext.Provider value={value}>
     {props.children}
    </AppContext.Provider>
)
}
export default AppContextProvider;
