import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import '../ProductComponent.css'; 

function CartComponent() {
  const navigate=useNavigate()
  const [carts, setCarts] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const userId=localStorage.getItem("userId");

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/cart/${userId}`);
      const cartData = response.data.items || [];
      setCarts(cartData);
      if(cartData.length===0) setIsCartEmpty(true);
    } catch (err) {
      console.log(err);
      setCarts([]); // Ensure carts is an array even on error
      setIsCartEmpty(true);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      await axios.post(`http://localhost:3002/cart/delete/${userId}/${productId}`);
      fetchCartData();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`http://localhost:3002/order/cart/${userId}`);
      alert(response.data.message);
      fetchCartData();
      if(response.data.message!=='cart is empty')
      navigate('/cartorder')
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncrement = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:3002/cart/incCart/${userId}/${productId}`);
      if (response.data.message === "cart items incremented") {
        fetchCartData();
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDecrement = async (productId) => {
    try {
      const response = await axios.post(`http://localhost:3002/cart/decCart/${userId}/${productId}`);
      if (response.data.message === "cart items decremented") {
        fetchCartData();
      } else {
        alert(response.data.message);
        fetchCartData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="primary" className="ml-auto" onClick={handlePlaceOrder}>Place order</Button>
      </div>
      {isCartEmpty? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2>Your cart is empty.</h2>
        </div>
      ) : (
        <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '20px' }}>
          {Array.isArray(carts) && carts.map((cart) => (
            <Card style={{ width: '20rem' }} key={cart.productId}>
              <Card.Img variant="top" src={cart.imageUrl} style={{ height: '250px', width: '20rem' }} />
              <Card.Body>
                <Card.Text>Product Name: {cart.productName}</Card.Text>
                <Card.Text>Product Id: {cart.productId}</Card.Text>
                <Card.Text>Quantity: {cart.quantity}</Card.Text>
                <Card.Text>Price: {cart.price}</Card.Text>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Button variant="secondary" onClick={() => handleDecrement(cart.productId)}>-</Button>
                  <span>{cart.quantity}</span>
                  <Button variant="secondary" onClick={() => handleIncrement(cart.productId)}>+</Button>
                </div>
                <br />
                <Button variant="primary" onClick={() => handleDeleteItem(cart.productId)}>Delete Item</Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
}

export default CartComponent;
