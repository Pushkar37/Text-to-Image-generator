import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react'
import {motion} from 'motion/react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const[imageisLoaded,setImageisLoaded]=useState(true);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

   const {generateImage}=useContext(AppContext)
 
  const onSubmitHandler=async(e)=>{
    setImageisLoaded(!imageisLoaded)
e.preventDefault();
setLoading(true)
if(input){
  const image= await generateImage(input);
  console.log(image)
  if(image){
    setImageisLoaded(true);
    setImage(image);
    
  }
}
setLoading(false)
  }
  return (
    
      <motion.form onSubmit={onSubmitHandler} className='flex items-center flex-col mb-32 ' initial={{opacity:0.2,y:100}}
            whileInView={{opacity:1,y:0}}
            transition={{duration:0.8}}>
        <div className='relative'>
        <img className='w-[400px]' src={image} alt="" />
        <span className={`absolute bottom-0 left-0   h-1 bg-blue-500 ${!loading?`w-0`:`w-[400px] transition-all duration-300`} `}></span>
        <p className={loading?'':'hidden'}>Loading...</p>
        </div>
        {imageisLoaded&&
        <div className='mt-10 w-fit bg-neutral-700 rounded-full text-white'>
          <input onChange={(e)=>setInput(e.target.value)} value={input} className='bg-transparent w-100 outline-none rounded-full p-3' type="text" placeholder='Describe what you want' />
          <button type='submit'   className='bg-black rounded-full p-3 inline-flex gap-2 group'>Generate Image <img className=' w-5   group-hover:translate-y-2 transition-all duration-300' src={assets.star_group} alt="" /></button>
        </div>}
        {!imageisLoaded&&
        <div className=' px-3 py-3 mt-7  flex gap-5'>
          <button   onClick={()=>setImageisLoaded(!imageisLoaded)} className='border rounded-full px-2 py-2  border-gray-500'>Generate Another</button>
          <a href={image} download className='border rounded-full px-6 py-2 border-gray-500 bg-black text-white'  >Download</a>
        </div>
        }
        
      </motion.form>
    
  )
}

export default Result