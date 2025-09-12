import React, { useState,useEffect, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import {motion} from 'motion/react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Login = () => {
    const [state,setState]=useState('Login');
    const {setShowLogin,backend_url,setToken,setUser}=useContext(AppContext);
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const onSubmitHandler=async(e)=>{
    e.preventDefault();
      try {
        if(state=='Login'){
          const {data} = await axios.post(backend_url +'/api/user/login',{email,password})
          if(data.success){
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          }else{
            toast.error(data.message)
          }
        }else{
           const {data} = await axios.post(backend_url +'/api/user/register',{name,email,password})
           if(data.success){
            setToken(data.token)
            setUser(data.user)
            localStorage.setItem('token',data.token)
            setShowLogin(false)
          }else{
            toast.error(data.message)
          }
        }
      } catch (error) {
        toast.error(data.message)
      }
    }
    useEffect(() => {
      document.body.style.overflow='hidden';
    
      return ()=>document.body.style.overflow='unset';
    
      
    }, [])
    
  return (
    <div className= 'fixed    z-10 left-0 top-0 right-0 bottom-0 backdrop-blur-sm bg-black/30  flex justify-center items-start'   >
         <motion.form onSubmit={onSubmitHandler} className='sticky top-32 bg-white p-10 rounded-lg  text-slate-500 '
         initial={{opacity:0.2,y:100}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.8}} >
            <h1 className='text-center text-2xl font-medium '>{state}</h1>
            <p className='text-sm'>Welcome back! please sign in to continue</p>
            {state!='Login'&&<div className='flex gap-2 items-center mt-10 border-1 shadow-md rounded-full p-2'>
                <img className='w-6 ' src={assets.profile_icon} alt="" />
                <input onChange={e=>setName(e.target.value)} value={name} className=' rounded-full outline-none  text-gray-500' type="text" name='name' placeholder='Enter your name ' required/>

            </div>}
            <div className='flex gap-2 items-center mt-5 border-1 shadow-md rounded-full p-2'>
                <img className='w-3  ' src={assets.email_icon} alt="" />
                <input onChange={e=>setEmail(e.target.value)} value={email} name='email' className=' rounded-full outline-none  text-gray-500' type="email" placeholder='Enter your Email ' required/>

            </div>
            <div className='flex gap-2 items-center mt-5 border-1 shadow-md rounded-full p-2'>
                <img className='w-3 ' src={assets.lock_icon} alt="" />
                <input onChange={e=>{setPassword(e.target.value)}} value={password} name='password' className=' rounded-full outline-none  text-gray-500' type="password" placeholder='Enter your password ' required/>

            </div>
            <p className='p-2 text-sm text-blue-500 cursor-pointer'>Forgot password?</p>
            <button type='submit' className='cursor-pointer m-auto w-full bg-blue-500 rounded-full text-white p-3'>{state=='Login'?'Login':'Create account'}</button>
            { state==='Login'? <p  className='text-sm mt-5 px-8'>Dont have an account ?
                <span onClick={()=>setState('Signup')} className='text-blue-500 cursor-pointer'> Sign up</span>
            </p> :<p className='text-sm mt-5 px-8'>Already have an account ?
                <span onClick={()=>setState('Login')} className='text-blue-500 cursor-pointer'> Login</span>
            </p>}
            <img onClick={()=>setShowLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
         </motion.form>
    </div>
  )
}

export default Login