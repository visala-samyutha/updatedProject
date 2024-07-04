import React from 'react';
import {Link,useNavigate} from 'react-router-dom'
import '../DropStyle.css'
import {useRef,useState, useEffect} from 'react'
import { useAuth } from "../Provider/AuthProvider";
import user from '../img/user.png'
function DropDownComponent() {
    const navigate=useNavigate();
  const menus=['profile','your apps']
  const [open,setOpen]=useState(false);
   const menuRef=useRef();
   const imgRef=useRef();

   window.addEventListener('click',(e)=>{
    if(e.target!==menuRef.current && e.target!==imgRef.current){
       setOpen(false);
    }
   })
   const  {logOut}  = useAuth();
    const handleLogout = () => {
        console.log("Logout button clicked");
        logOut();
    };
    const handleProfile=()=>{
        navigate('/profile');
    }
    const handleProduct=()=>{
        navigate('/product')
    }
    const handlePass=()=>{
        navigate('/pass')
    }
       return(
        <>
       <div className="relative">
        <img 
        ref={imgRef}
        onClick={()=>setOpen(!open)}
        src={user} alt="user" 
        className="h-15 w-10 object-cover border-4  rounded-full cursor-pointer"/>
       </div>
       {
        open &&(
    //    <div  
    //    className='bg-white p-4 w-52 shadow-lg absolute -right-5 top-24' style={{ zIndex: 9999 }}>
    //     <ul>
    //     <li className='p-2 cursor-pointer rounded hover:bg-purple-200' onClick={handleProduct}>
    //         AdminPage
    //          </li>
    //     <li className='p-2 cursor-pointer rounded hover:bg-purple-200' onClick={handlePass}>
    //         ChangePassword
    //          </li>
    //     <li className='p-2 cursor-pointer rounded hover:bg-purple-200' onClick={handleLogout}>
    //         Logout
    //          </li>
    //     </ul>
    //    </div>
    //     )}
    <div
    className='bg-white p-2 w-30 shadow-lg absolute -right-2 top-24 border border-gray-300 rounded'
    style={{ zIndex: 9999 }}
>
    <ul className='text-left'>
    <li className='p-2 cursor-pointer rounded hover:bg-purple-200' onClick={handleProfile}>
            UserProfile
        </li>
        <li className='p-2 cursor-pointer rounded hover:bg-purple-200' onClick={handleProduct}>
            AdminPage
        </li>
        <li className='p-2 cursor-pointer rounded hover:bg-purple-200' onClick={handlePass}>
            ChangePassword
        </li>
        <li className='p-2 cursor-pointer rounded hover:bg-purple-200' onClick={handleLogout}>
            Logout
        </li>
    </ul>
</div>

        )}
</>
    )
  }
  
  
  export default DropDownComponent;