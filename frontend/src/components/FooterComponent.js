import React from 'react';

const FooterComponent = () => {
    return (
        <footer className="bg-dark text-white py-4 fixed-bottom">
            <div className="container text-center">
                <p>&copy; {new Date().getFullYear()} FashionFusion. All rights reserved.</p>
                
            </div>
        </footer>
    );
};

export default FooterComponent;