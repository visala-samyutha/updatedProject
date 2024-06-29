import { useNavigate } from 'react-router-dom';
import {useState} from 'react'
const OptionsComponent=()=>{
    const navigate=useNavigate()
    const handleCartClick=()=>{
          navigate('/cart')
    }
    const handleOrderClick=()=>{
           navigate('/order')
    }
    const handleSearch=()=>{
        
    }
   return(
         <>
  <div className="px-3 py-2 border-bottom mb-3">
 <div className="container d-flex flex-wrap justify-content-between">
     <form className="col-12 col-lg-auto mb-2 mb-lg-0" role="search">
         <input type="search" className="form-control" onChange={()=>handleSearch()} placeholder="Search..." aria-label="Search" />
    </form>
   <button className="btn btn-dark" onClick={()=>handleCartClick()}>
        <i className="fa-solid fa-cart-shopping"></i>
     </button>
     <button onClick={()=>handleOrderClick()}>My Orders</button>
 </div>
 </div> 
         </>
   )
}
export default OptionsComponent