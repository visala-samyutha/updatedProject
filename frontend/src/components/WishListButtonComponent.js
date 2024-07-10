import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {toast} from 'react-toastify'

const WishlistButton = ({ productId, initialIsInWishlist, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(initialIsInWishlist);
  const userId = localStorage.getItem('userId');

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
      <span style={{ marginLeft: '8px' }}>
        {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </span>
    </div>
  );
};

export default WishlistButton;

