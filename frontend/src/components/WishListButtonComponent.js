import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify'

const WishlistButton = ({ productId, initialIsInWishlist, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  useEffect(() => {
    setIsInWishlist(initialIsInWishlist);
  }, [initialIsInWishlist]);

  const handleToggleWishlist = async () => {
    try {
      if (isInWishlist) {
        removeFromWishlist();
      } else {
        addToWishist();
      }
      setIsInWishlist(!isInWishlist);
      onToggleWishlist(productId, !isInWishlist);
    } catch (error) {
      console.error('Error toggling wishlist status:', error);
    }
  };
  const addToWishist= async () => {
    if(!userId){
      navigate('/login');
    }
    try{
        const response = await axios.post(`http://localhost:3002/wishlist/add/${userId}/${productId}`)
        toast.success(response.data.message,{autoClose:1000})
        setIsInWishlist(true)
    }
    catch(err){
        toast.error(err.response.data.message)
    }
  };
  const removeFromWishlist = async () => {
    try{
        const response = await axios.delete(`http://localhost:3002/wishlist/delete/${userId}/${productId}`)
        toast.success(response.data.message,{autoClose:1000})
        setIsInWishlist(false)
    }
    catch(err){
        toast.error(err.response.data.message)
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <FontAwesomeIcon
        icon={isInWishlist ? solidHeart : regularHeart}
        style={{ color: isInWishlist ? 'red' : 'black' }}
        onClick={handleToggleWishlist}
      />
      
    </div>
  );
};

export default WishlistButton;

