//  import { Link } from 'react-router-dom';
//  import { useNavigate } from 'react-router-dom';
//  import {useState} from 'react'

//  function HeaderComponent() {
//      const navigate=useNavigate()
//      const handleCartClick=()=>{
//            navigate('/cart')
//      }
//     const handleOrderClick=()=>{
//             navigate('/order')
//     }
//     return (
//          <header>
//             <div className="px-3 py-2 bg-light text-dark border-bottom position-sticky">
//                  <div className="container">
//                     <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
//                          {/* <a href="/" className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-decoration-none"></a> */}
//                         <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
//                             <li>
//                                 <Link to="/product" className="btn btn-light text-dark me-2">Product</Link>
//                              </li>
//                             <li>
//                                 <Link to="/home" className="btn btn-light text-dark me-2">Home</Link>
//                              </li>
//                              <li>
//                                 <Link to="/login" className="btn btn-light text-dark me-2">Login</Link>
//                             </li>
//                              <li>
//                                 <Link to="/signup" className="btn btn-light text-dark me-2">SignUp</Link>
//                             </li>
//                         </ul>
//                     </div>
//                  </div>
//             </div>
//             <div className="px-3 py-2 border-bottom mb-3">
//             <div className="container d-flex flex-wrap justify-content-between">
//                 <form className="col-12 col-lg-auto mb-2 mb-lg-0" role="search">
//                    <input type="search" className="form-control" placeholder="Search..." aria-label="Search" />
//                 </form>
//                <button className="btn btn-dark" onClick={()=>handleCartClick()}>
//                     <i className="fa-solid fa-cart-shopping"></i>
//                </button>
//                  <button onClick={()=>handleOrderClick()}>Orders</button>
//              </div>
//          </div>
//          </header>
//      );
//  }

//  export default HeaderComponent;
import { Link } from 'react-router-dom';
import { useAuth } from "../Provider/AuthProvider";
import '../style.css'
import '../HeaderComponent.css'
import DropDownComponent from './DropDownComponent';
import logo from '../img/logo.png'
import {useState,useEffect} from 'react';

function HeaderComponent() {
    const { token } = useAuth();
    const[isLoggedIn,setIsLoggedIn]=useState(false)
    useEffect(() => {
        const token = localStorage.getItem('token'); // Replace with your actual token retrieval logic
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      }, [token]);
    return (
        <div className="container bg-color position-sticky">
        <div className="d-flex align-items-center justify-content-between">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="h-20 w-20 object-cover border-1 rounded-full cursor-pointer" />
            </div>
            <h1
             style={{ fontFamily: 'Georgia, serif',fontWeight: 'bold', margin: '20px 0' }}>
            Fashion Fusion</h1>
            <div className="d-flex flex-grow-1 justify-content-end align-items-center">
                <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                <li>
                        <Link to="/home" className="btn btn-color text-dark me-2">Home</Link>
                    </li>
                <li>
                        <Link to="/about" className="btn btn-color text-dark me-2">About Us</Link>
                    </li>
    
                    {!isLoggedIn ? (
                        <li>
                           <Link to="/login" className="btn btn-color text-dark me-2">Login</Link>
                        </li>
                    ) : null}
                    <li>
                        <Link to="/signup" className="btn btn-color text-dark me-2">SignUp</Link>
                    </li>
                    <DropDownComponent/>
                </ul>
            </div>
        </div>
    </div>

// </div>
    );
}

export default HeaderComponent;
