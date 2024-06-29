import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';


const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
              <Card.Text><strong>Quantity:</strong> {product.quantity}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;