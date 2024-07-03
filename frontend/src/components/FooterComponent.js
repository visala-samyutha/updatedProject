import React from 'react';
import '../footer.css';

import { Link } from 'react-router-dom';
import FacebookOutlinedIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <footer className='footerWrapper'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <p>&copy; {new Date().getFullYear()} FashionFusion. All rights reserved.</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 text-center'>
                        <div className='d-flex justify-content-center'>
                            <ul className='list list-inline'>
                                <li className='list-inline-item'>
                                    <Link to={''}>
                                        <FacebookOutlinedIcon style={{ color: '#4267B2' }} />
                                    </Link>
                                </li>
                                <li className='list-inline-item'>
                                    <Link to={''}>
                                        <InstagramIcon style={{ color: '#E1306C' }} />
                                    </Link>
                                </li>
                                <li className='list-inline-item'>
                                    <Link to={''}>
                                        <YouTubeIcon style={{ color: '#FF0000' }} />
                                    </Link>
                                </li>
                                <li className='list-inline-item'>
                                    <Link to={''}>
                                        <TwitterIcon style={{ color: '#000000' }} />
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
