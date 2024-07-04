import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap'

const ProfileComponent = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem('userId');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/signup/user/${id}`);
        const userData = response.data.user;
        setUser(userData);
        setUsername(userData.username);
        setEmail(userData.email);
        setMobileNumber(userData.mobileNumber);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleCartClick = () => {
    if (!localStorage.getItem('token')) {
      toast.error('You must log in to access your cart');
      navigate('/login');
    } else {
      navigate('/cart');
    }
  };

  const handleOrderClick = () => {
    if (!localStorage.getItem('token')) {
      toast.error('You must log in to view your orders');
      navigate('/login');
    } else {
      navigate('/order');
    }
  };

  const handleProfileDelete = async () => {
    try {
      await axios.delete(`http://localhost:3002/signup/user/${id}`);
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      toast.success('User deleted successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error deleting profile');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3002/signup/user/${id}`, {
        username,
        email,
        mobileNumber,
      });

      setUser(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Error updating profile.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) {
    toast.error(error);
    return null;
  }

  return (
    <div className="container">
      <div className="main-body">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                  <div className="mt-3">
                    <h4>{user.username}</h4>
                    <p className="text-secondary mb-1">Full Stack Developer</p>
                    <Button variant="none" className="button"  onClick={handleCartClick} style={{color:'purple'}}>Cart</Button>
                    <Button variant='none' className="button" onClick={handleOrderClick} style={{color:'purple'}}>My Orders</Button><br/><br/>
                    <Button className='btn btn-danger' onClick={handleProfileDelete}>Delete Account</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                {!isEditing ? (
                  <>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">UserName</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {user.username}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {user.email}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        {user.mobileNumber}
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <Button variant='none' className="button" onClick={handleEditToggle} style={{color:'purple'}}>Edit</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">UserName</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input 
                          type="text" 
                          className="form-control" 
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Email</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input 
                          type="email" 
                          className="form-control" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <h6 className="mb-0">Mobile</h6>
                      </div>
                      <div className="col-sm-9 text-secondary">
                        <input 
                          type="text" 
                          className="form-control" 
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value)}
                        />
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-12">
                        <button className="btn btn-primary" type="submit">Save</button>
                        <button className="btn btn-secondary ml-2" type="button" onClick={handleEditToggle}>Cancel</button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
