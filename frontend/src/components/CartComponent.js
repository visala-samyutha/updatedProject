import axios from 'axios';
import { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../cartComponent.css'; 
import '../style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function CartComponent() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/cart/${userId}`);
      const cartData = response.data.items || [];
      setCarts(cartData);
      setIsCartEmpty(cartData.length === 0);
    } catch (err) {
      console.log(err);
      setCarts([]);
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
      if (response.data.message !== 'cart is empty')
        navigate('/cartorder');
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
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button className="button btn1" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handlePlaceOrder}>
          Place order
        </button>
      </div>
      {isCartEmpty ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <h2>Your cart is empty.</h2>
        </div>
      ) : (
        <Container>
          <Row className="justify-content-center">
            {carts.map((cart) => (
              <Col key={cart.productId} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Card className='product-card' style={{ maxWidth: '18rem', border: 'none', textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Img variant="top" src={cart.imageUrl} style={{ maxHeight: '150px', width: 'auto', margin: '0 auto' }} />
                  <Card.Body>
                   <Card.Title style={{ fontSize: '1rem' }}>{cart.productName}</Card.Title>
                    <Card.Text>Quantity: {cart.quantity}</Card.Text>
                    <Card.Text>Price: ${cart.price}</Card.Text>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                      <Button variant='light' onClick={() => handleDecrement(cart.productId)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>
                      <span style={{ margin: '0 10px', fontSize: '1rem', fontWeight: 'bold' }}>{cart.quantity}</span>
                      <Button variant='light' onClick={() => handleIncrement(cart.productId)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </div>
                    <Button variant='danger' onClick={() => handleDeleteItem(cart.productId)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default CartComponent;
