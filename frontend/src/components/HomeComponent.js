import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useAuth } from "./AuthProvider";
import HeaderComponent from './HeaderComponent';
import OptionsComponent from './OptionsComponent';
import '../ProductComponent.css'; 

function HomeComponent() {
  const navigate = useNavigate();
  const { setProductId } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/home/");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSingleProduct = (id) => {
    navigate(`/homeproduct/${id}`);
  };

  return (
    <>
      <OptionsComponent />
      <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Row style={{ width: '100%' }}>
          {products.map((product) => (
            <Col key={product._id} xs={12} sm={6} md={4} lg={3} style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <Card 
                className="product-card" 
                style={{ width: '18rem', background: 'none', border: 'none', textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <Card.Img variant="top" src={product.imageUrl} style={{ height: '200px', width: 'auto', margin: '0 auto' }} />
                <Card.Body style={{ padding: '10px' }}>
                  <Card.Text>Product Name: {product.productName}</Card.Text>
                  <Card.Text>Product Price: {product.price}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="link" onClick={() => handleSingleProduct(product._id)}>See More</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default HomeComponent;
