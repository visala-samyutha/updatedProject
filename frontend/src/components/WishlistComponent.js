import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useAuth } from '../Provider/AuthProvider';
import { Container,Row,Col,Card,Button} from 'react-bootstrap';
import {toast} from 'react-toastify'

const WishlistComponent=()=>{
  const navigate=useNavigate();
  const { setProductId } = useAuth();
    const [list, setList] = useState([]);
    const userId = localStorage.getItem("userId");
    const [isListEmpty, setIsListEmpty] = useState(false);
    useEffect(()=>{
        fetchData();
    },[]);
    const fetchData=async ()=>{
        try{
            // const userId="664e288676a9ecbecc682f09"
        const response = await axios.get(`http://localhost:3002/wishlist/${userId}`);
        const listData=response.data || []
        setList(listData);
        setIsListEmpty(listData.length === 0);
        }
        catch(err){
            console.log(err);
            setList([]);
            setIsListEmpty(true);
        }
    }
    const handlePlaceOrder= async (pid)=>{
      const response = await axios.post(`http://localhost:3002/order/direct/${userId}/${pid}`);
      try{
      if (response.data.message === "Out of stock") {
        toast.error("Out of stock");
        navigate('/home');
      } else {
        toast.success("order placed successfully")
        setProductId(pid);
        navigate('/homeorder');
      }
    } 
    catch (error) {
      console.log(error);
    }
    }
    
    return(
        <>
           {isListEmpty ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
          <h2>Your wishlist is empty.</h2>
        </div>
      ) : (
        <Container>
          <Row className="justify-content-center">
          <h1 align="center">WishList</h1>
            {list.map((list) => (
              <Col key={list.productId} xs={12} sm={6} md={4} lg={3} className="mb-3">
                <Card className='product-card' style={{ maxWidth: '18rem', border: 'none', textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  <Card.Img variant="top" src={list.imageUrl} style={{ maxHeight: '150px', width: 'auto', margin: '0 auto' }} />
                  <Card.Body>
                   <Card.Title style={{ fontSize: '1rem' }}>{list.productName}</Card.Title>
                    <Card.Text>Price: Rs.{list.price}</Card.Text>
                    <Button variant='none' onClick={() => handlePlaceOrder(list.productId)}>Place Order</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
        </>
    )
}
export default WishlistComponent;