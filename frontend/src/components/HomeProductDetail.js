import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col,Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../Provider/AuthProvider';


const HomeProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const uid=localStorage.getItem("userId");
  const{setProductId}=useAuth();
  const navigate=useNavigate();

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

  if (!product) return <p>Loading...</p>;
  const handleAddToCart = async (pid) => {
    try {
        const response = await axios.post(`http://localhost:3002/home/${uid}/${pid}`);
        alert(response.data.message);
        //fetchProductData();
    } catch (error) {
        console.error("There was an error adding the product to the cart:", error);
        alert("An error occurred while adding the product to the cart. Please try again.");
    }
};
const handlePlaceOrder = async (pid) => {
  try {
    const response = await axios.post(`http://localhost:3002/order/direct/${uid}/${pid}`);
    alert(response.data.message);
    setProductId(pid);
    //fetchProductData();
    navigate('/homeorder');
  } catch (error) {
    alert(error);
  }
};

  return (
    <Container className="product-detail-container mt-5">
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img variant="top" src={product.imageUrl} />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>{product.productName}</Card.Title>
              <Card.Text><strong>Price:</strong> ${product.price}</Card.Text>
              <Card.Text><strong>Color:</strong> {product.color}</Card.Text>
              <Card.Text><strong>Type:</strong> {product.type}</Card.Text>
              <Card.Text><strong>Description:</strong> {product.description}</Card.Text>
              
              <Button variant="primary"  onClick={() => handleAddToCart(product._id)}>Add to cart</Button>
              <Button variant="primary" onClick={() => handlePlaceOrder(product._id)}>Place order</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeProductDetail;