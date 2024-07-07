import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AboutUsComponent() {
    const containerStyle = {
        padding: '40px',
        backgroundColor: '#f9f9f9'
    };

    const sectionStyle = {
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    };

    const textStyle = {
        maxWidth: '600px',
        fontSize: '1.1rem', // Increased font size
        lineHeight: '2', // Increased line height for better readability
        textAlign: 'justify', // Proper text alignment
        flex: '1 1 45%', // Flex properties to adjust based on screen size
        padding: '10px' // Reduced padding
    };

    const imageStyle = {
        width: '100%',
        height: 'auto',
        maxWidth: '500px',
        borderRadius: '10px',
        transition: 'transform 0.3s ease-in-out',
        flex: '1 1 45%', // Flex properties to adjust based on screen size
        padding: '10px' // Reduced padding
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '2.5rem',
        fontWeight: 'bold'
    };

    return (
        <div style={containerStyle}>
            <h2 style={titleStyle}>About Us</h2>

            <div style={sectionStyle}>
                <div style={textStyle}>
                    <p>
                        Fashion Fusion is dedicated to bringing you the latest trends in fashion.
                        Our mission is to inspire confidence through style and empower individuals
                        to express their unique personalities through fashion choices. With a focus
                        on quality and innovation, we strive to redefine the fashion industry.
                    </p>
                </div>
                <div>
                    <img
                        style={imageStyle}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        src="https://www.bonsoir.co.in/cdn/shop/articles/LATEST_NEHRU_JACKETS_COLLECTION_1024x1024.jpg?v=1696331225"
                        alt="Fashion Fusion"
                    />
                </div>
            </div>

            <div style={{...sectionStyle, flexDirection: 'row-reverse'}}>
                <div style={textStyle}>
                    <h2>Our Story</h2>
                    <p>
                        Fashion Fusion was founded in 2000 with the vision of bridging the gap between
                        traditional craftsmanship and modern design. Our team of designers and artisans
                        work tirelessly to bring you collections that are not only fashionable but also
                        sustainable and ethical.
                    </p>
                </div>
                <div>
                    <img
                        style={imageStyle}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        src="https://ayushi-verma.dmlearning.in/wp-content/uploads/2023/08/20230808_154758_0000.png"
                        alt="Our Story"
                    />
                </div>
            </div>

            <div style={sectionStyle}>
                <div style={textStyle}>
                    <h2 style={{marginLeft:'30px',}}>Our Values</h2>
                    <ul>
                        <li><strong>Innovation:</strong> We are constantly exploring new techniques and materials to stay ahead of fashion trends.</li>
                        <li><strong>Quality:</strong> We prioritize quality in every piece we create, ensuring it lasts and looks great.</li>
                        <li><strong>Sustainability:</strong> We are committed to reducing our environmental footprint through sustainable practices.</li>
                    </ul>
                </div>
                <div>
                    <img
                        style={imageStyle}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        src="https://teeshopper.in/store_page_asset/images/Fashion-fusion-.png"
                        alt="Our Values"
                    />
                </div>
            </div>

            <div style={{...sectionStyle, flexDirection: 'row-reverse'}}>
                <div style={textStyle}>
                    <h2>Meet the Team</h2>
                    <p>
                        Our team is made up of passionate individuals from diverse backgrounds, each bringing their unique perspective to the table. We believe that collaboration and creativity are the keys to our success.
                    </p>
                    <p>
                        Thank you for being a part of our journey. We hope you love our fashion as much as we love creating it for you.
                    </p>
                </div>
                <div>
                    <img
                        style={imageStyle}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                        src="https://zola.in/cdn/shop/articles/jeggings_banner.jpg?v=1685606239"
                        alt="Meet the Team"
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutUsComponent;
