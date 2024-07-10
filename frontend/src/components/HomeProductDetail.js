// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { Card, Container, Row, Col, Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../Provider/AuthProvider';
// import OptionsComponent from './OptionsComponent';
// import '../HomeProductDetails.css';
// import { toast } from 'react-toastify'; // Import toast from react-toastify
// import 'react-toastify/dist/ReactToastify.css';

// const HomeProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const uid = localStorage.getItem("userId");
//   const role = localStorage.getItem("role");
//   const { setProductId } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3002/admin/productEdit/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching the product details:', error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   const handleAddToCart = async (pid) => {
//     try {
//       if (uid === null) {
//         toast.error("You must login"); // Show error toast message
//         navigate('/login');
//         return;
//       }
//       //  if(role!=="user"){
//       //   toast.error("you cannot access this page");
//       //   navigate('/home');
//       //  }
//        else{
//       const response = await axios.post(`http://localhost:3002/home/${uid}/${pid}`);
//       //toast.success(response.data.message); // Show success toast message
//       if (response.data.message === "Out of stock") {
//         toast.error("out of stock");
//         navigate('/home');
//       }
//       else{
//         alert("added to cart successfully");
//       }}
//       //fetchProductData();
//     } catch (error) {
//       console.error("There was an error adding the product to the cart:", error);
//     }
//   };

//   const handlePlaceOrder = async (pid) => {
//     try {
//       if (uid === null) {
//         toast.error("You must login"); // Show error toast message
//         navigate('/login');
//         return;
//       }
//       // if(role!=="user"){
//       //   toast.error("you cannot access this page");
//       //   navigate('/home');
//       // }
//       else{
//       const response = await axios.post(`http://localhost:3002/order/direct/${uid}/${pid}`);
//        // Show success toast message
//       if (response.data.message === "Out of stock") {
//         toast.error("out of stock");
//         navigate('/home');
//       }
//       else {
//         toast.success("placed successfully");
//         setProductId(pid);
//         //fetchProductData();
//         navigate('/homeorder');
//       }}
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Container className="product-detail-container mt-5">
//         <Row>
//           <Col md={6}>
//             <Card className="product-image-card">
//               <Card.Img variant="top" src={product.imageUrl} className="product-image" />
//             </Card>
//           </Col>
//           <Col md={6}>
//             <Card className="product-info-card">
//               <Card.Body>
//                 <center><h1><Card.Title className="product-title">{product.productName}</Card.Title></h1></center>
//                 <Card.Text className="product-price"><strong>Price:</strong> ${product.price}</Card.Text>
//                 <Card.Text className="product-color"><strong>Color:</strong> {product.color}</Card.Text>
//                 <Card.Text className="product-type"><strong>Type:</strong> {product.type}</Card.Text>
//                 <Card.Text className="product-description"><strong>Description:</strong> {product.description}</Card.Text>

//                 <div className="button-group">
//                   <Button variant="none" className="add-to-cart-button button btn1" onClick={() => handleAddToCart(product._id)}>
//                     Add to cart
//                   </Button>
//                   <Button variant="none" className="place-order-button button btn1" onClick={() => handlePlaceOrder(product._id)}>
//                     Place order
//                   </Button>
//                 </div>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </>
//   )
// }

// export default HomeProductDetail;
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Provider/AuthProvider';
import '../HomeProductDetails.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const uid = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const { setProductId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/admin/productEdit/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching the product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    console.log("User ID:", uid);
    console.log("User role:", role);
  }, [uid, role]);

  if (!product) return <p>Loading...</p>;

  const handleAddToCart = async (pid) => {
    try {
      if (!uid) {
        toast.error("You must login");
        navigate('/login');
        return;
      }
      const response = await axios.post(`http://localhost:3002/home/${uid}/${pid}`);
      if (response.data.message === "Out of stock") {
        toast.error("Out of stock");
        navigate('/home');
      } 
      else{
        toast.success("added to cart successfully")
      }
    } catch (error) {
      console.error("There was an error adding the product to the cart:", error);
    }
  };

  const handlePlaceOrder = async (pid) => {
    try {
      if (!uid) {
        toast.error("You must login");
        navigate('/login');
        return;
      }
      const response = await axios.post(`http://localhost:3002/order/direct/${uid}/${pid}`);
      if (response.data.message === "Out of stock") {
        toast.error("Out of stock");
        navigate('/home');
      } else {
        toast.success("order placed successfully")
        setProductId(pid);
        navigate('/homeorder');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container className="product-detail-container mt-5">
        <Row>
          <Col md={6}>
            <Card className="product-image-card">
              <Card.Img variant="top" src={product.imageUrl} className="product-image" />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="product-info-card">
              <Card.Body>
                <center><h1><Card.Title className="product-title">{product.productName}</Card.Title></h1></center>
                <Card.Text className="product-price"><strong>Price: </strong><i class="fa-solid fa-rupee-sign"></i>{product.price}</Card.Text>
                <Card.Text className="product-color"><strong>Color:</strong> {product.color}</Card.Text>
                <Card.Text className="product-type"><strong>Type:</strong> {product.type}</Card.Text>
                <Card.Text className="product-description"><strong>Description:</strong> {product.description}</Card.Text>
                <Card.Text className="product-gender"><strong>Category:</strong> {product.gender}</Card.Text>
                <div className="button-group">
                  <Button variant="none" className="add-to-cart-button button btn1" onClick={() => handleAddToCart(product._id)}>
                    Add to cart
                  </Button>
                  <Button variant="none" className="place-order-button button btn1" onClick={() => handlePlaceOrder(product._id)}>
                    Place order
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomeProductDetail;
