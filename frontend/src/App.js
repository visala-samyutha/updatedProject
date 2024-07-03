import './App.css';
import LoginComponent from './components/LoginComponent';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import PaswordComponent from './components/PasswordComponent';
import HeaderComponent from './components/HeaderComponent';
// import PrivComponent from './components/PrivComponent';
 import Footer from './components/FooterComponent'
import ProductComponent from './components/ProductComponent';
import SignUpComponent from './components/SignupComponent';
import HomeComponent from './components/HomeComponent';
import MainComponent from './components/MainComponent';
import CartComponent from './components/CartComponent';
import OrderComponent from './components/OrderComponent';
import HomeOrderComponent from './components/HomeOrderComponent'
import AuthProvider from './Provider/AuthProvider';
// import { HomeOrderProvider } from './components/HomeOrderProvider';
import CartOrderComponent from './components/CartOrderComponent';
import PaswordComponent from './components/PasswordComponent';
import PrivComponent from './components/PrivComponent';
import AdminPrivateRoute from './Routes/AdminPrivateRoute'
import ProductDetail from './components/ProductDetail';
import HomeProductDetail from './components/HomeProductDetail';
import UserPrivateRoute from './Routes/UserPrivateRoute';
import FooterComponent from './components/FooterComponent';
import DropDownComponent from './components/DropDownComponent';
import { ToastContainer } from 'react-toastify';
function App() {
  return(
 <BrowserRouter>
  <AuthProvider>
    <HeaderComponent/>
    <ToastContainer />
 <Routes>
 <Route path="/" exact element={<MainComponent/>}></Route>
  <Route path="/login" exact element={<LoginComponent/>}></Route>
  <Route path="/pass" exact element={<PaswordComponent/>}></Route>
   <Route path="/term" exact element={<PrivComponent/>}></Route>
 <Route path="/signup" exact element={<SignUpComponent/>}></Route>
 <Route path='/home' element={<HomeComponent/>}></Route>
 <Route  element={<UserPrivateRoute />}>
                    <Route path="/cart" exact element={<CartComponent/>}></Route>
                    <Route path="/order" exact element={<OrderComponent/>}></Route>
                    <Route path="/homeorder" exact element={<HomeOrderComponent/>}></Route>
                    <Route path="/cartorder" exact element={<CartOrderComponent/>}></Route>
                   </Route>
 <Route  element={<AdminPrivateRoute />}>
                    <Route path='/product' element={<ProductComponent/>}></Route>
                    <Route path="/product/:id" element={<ProductDetail />} />
                   </Route>
  <Route path="/homeproduct/:id" exact element={<HomeProductDetail/>}></Route>
  </Routes>
 
 </AuthProvider>
 <Footer/>
 </BrowserRouter>
    
  )
}

export default App;
