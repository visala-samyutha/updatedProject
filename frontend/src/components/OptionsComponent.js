import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
import {useAuth} from '../Provider/AuthProvider'
const uid=localStorage.getItem("userId");
const OptionsComponent=()=>{
  const {token}=useAuth();
    const navigate=useNavigate()
    const handleCartClick=()=>{
      if(!token){
            alert("you must login");
            navigate('/login')
          }
          else
              navigate('/cart')
    }
    const handleOrderClick=()=>{
      if(!token){
            alert("you must login");
            navigate('/login')
          }
          else 
           navigate('/order')
    }
   return(
         <>
 <div className="container d-flex flex-wrap ">
     
   <button className='btn-color' onClick={()=>handleCartClick()} style={{ marginRight: '20px',color:'purple',backgroundColor:'white',border:'white' }}>
   <i className="fa-solid fa-cart-shopping"></i>Cart
     </button>
      {/* <form className="col-12 col-lg-auto mb-2 mb-lg-0" role="search">
         <input type="search" className="form-control" onChange={()=>handleSearch()} placeholder="Search..." aria-label="Search" />
    </form>  */}
     <button className='btn-color'onClick={()=>handleOrderClick()} style={{ height: '40px' ,color:'purple',backgroundColor:'white',border:'white'}}> <i class="bi bi-bag-fill"></i>My Orders</button>
 </div>

         </>
   )
}
export default OptionsComponent