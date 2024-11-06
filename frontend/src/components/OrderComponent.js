import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../OrderComponent.css'
function OrderComponent() {
  const [orders, setOrders] = useState([]);
  const [isOrderEmpty, setIsOrderEmpty] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const id = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3002/order/${id}`);
      const orderData = response.data.items || [];
      setOrders(orderData);
      if (orderData.length === 0) setIsOrderEmpty(true);
    } catch (err) {
      console.error(err);
      setOrders([]);
      setIsOrderEmpty(true);
    }
  };

  const cardStyle = {
    borderRadius: '10px',
    marginBottom: '20px',
    border: 'none',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  return (
    <section className="h-100 gradient-custom">
      {isOrderEmpty ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2>No orders yet</h2>
        </div>
      ) : (
        <Container className="py-5 h-100">
          <h1 align="center">My Orders</h1>
          <Row className="d-flex justify-content-center align-items-center h-100">
            <Col lg={10} xl={8}>
              {orders.map((order) => (
                <Card
                  key={order.id}
                  style={cardStyle}
                  className="hover-card"
                >
                  <Card.Body style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                      <p className="lead fw-normal mb-0" style={{ color: '#a8729a' }}>Receipt</p>
                    </div>
                    <Card style={{ border: 'none', marginBottom: '20px' }}>
                      <Card.Body>
                        <Row>
                          <Col md={2}>
                            <img src={order.imageUrl} className="img-fluid" alt="Product" />
                          </Col>
                          <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0">Product: {order.productName}</p>
                          </Col>
                          <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Qty: {order.quantity}</p>
                          </Col>
                          <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Product Price: Rs.{order.price / order.quantity}</p>
                          </Col>
                          <Col md={2} className="text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Category: {order.gender}</p>
                          </Col>
                          <Col md={4} className="text-center d-flex justify-content-center align-items-center">
                            <p className="text-muted mb-0 small">Date:{order.date}</p>
                          </Col>
                        </Row>
                        <hr style={{ backgroundColor: '#e0e0e0', opacity: 1, margin: '20px 0' }} />
                        <div className="row d-flex align-items-center">
                          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px' }}>
                            <p className="fw-bold mb-0"style={{color:'#BA68C8'}}>Order Details</p>
                            <p className="text-muted mb-0"><span className="fw-bold me-4"style={{color:'#BA68C8'}}>Total</span>${order.price}</p>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                            <p className="text-muted mb-0">Receipt Voucher: {order.id}</p>
                            <p className="text-muted mb-0"><span className="fw-bold me-4" style={{color:'#BA68C8'}}>Delivery Charges</span> Free</p>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Card.Body>
                </Card>
              ))}
            </Col>
          </Row>
        </Container>
      )}
    </section>
  );
}

export default OrderComponent;

