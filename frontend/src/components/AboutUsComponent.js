

// import React from 'react';
// import '../AboutUs.css'; // Import the CSS file for styling

// function AboutUsComponent() {
//     return (
//         <div className="about-container">
//             <div className>
//                 <center><h2>About Us</h2></center>
//                 <p>
//                     Fashion Fusion is dedicated to bringing you the latest trends in fashion.
//                     Our mission is to inspire confidence through style and empower individuals
//                     to express their unique personalities through fashion choices. With a focus
//                     on quality and innovation, we strive to redefine the fashion industry.
//                 </p>
//                 <hr/>
//                 <h2>Our Story</h2>
//         <p>Fashion Fusion was founded in 2000 with the vision of bridging the gap between traditional craftsmanship and modern design. Our team of designers and artisans work tirelessly to bring you collections that are not only fashionable but also sustainable and ethical.</p>
//         <hr/>
//         <h2>Our Values</h2>
    
//         <ul>
//           <li><strong>Innovation:</strong> We are constantly exploring new techniques and materials to stay ahead of fashion trends.</li>
//           <li><strong>Quality:</strong> We prioritize quality in every piece we create, ensuring it lasts and looks great.</li>
//           <li><strong>Sustainability:</strong> We are committed to reducing our environmental footprint through sustainable practices.</li>
//         </ul>
//         <hr/>
//         <h2>Meet the Team</h2>
//         <p>Our team is made up of passionate individuals from diverse backgrounds, each bringing their unique perspective to the table. We believe that collaboration and creativity are the keys to our success.</p>
//         <p>Thank you for being a part of our journey. We hope you love our fashion as much as we love creating it for you.</p>

//             </div>
//         </div>
//     );
// }

// export default AboutUsComponent;
import React from 'react';
import '../AboutUs.css'; // Import the CSS file for styling

function AboutUsComponent() {
    return (
        <div className="about-container">
            <h2 className="title">About Us</h2>
            <div className="about-section">
                <div className="about-text">
                    <p>
                        Fashion Fusion is dedicated to bringing you the latest trends in fashion.
                        Our mission is to inspire confidence through style and empower individuals
                        to express their unique personalities through fashion choices. With a focus
                        on quality and innovation, we strive to redefine the fashion industry.
                    </p>
                </div>
                <div className="about-image"><img src="https://www.bonsoir.co.in/cdn/shop/articles/LATEST_NEHRU_JACKETS_COLLECTION_1024x1024.jpg?v=1696331225"></img></div>
            </div>

            <div className="about-section reverse">
                <div className="about-image"><img src="https://ayushi-verma.dmlearning.in/wp-content/uploads/2023/08/20230808_154758_0000.png"></img></div>
                <div className="about-text">
                    <h2>Our Story</h2>
                    <p>
                        Fashion Fusion was founded in 2000 with the vision of bridging the gap between
                        traditional craftsmanship and modern design. Our team of designers and artisans
                        work tirelessly to bring you collections that are not only fashionable but also
                        sustainable and ethical.
                    </p>
                </div>
            </div>

            <div className="about-section">
                <div className="about-text">
                    <h2>Our Values</h2>
                    <ul>
                        <li><strong>Innovation:</strong> We are constantly exploring new techniques and materials to stay ahead of fashion trends.</li>
                        <li><strong>Quality:</strong> We prioritize quality in every piece we create, ensuring it lasts and looks great.</li>
                        <li><strong>Sustainability:</strong> We are committed to reducing our environmental footprint through sustainable practices.</li>
                    </ul>
                </div>
                <div className="about-image"><img src="https://teeshopper.in/store_page_asset/images/Fashion-fusion-.png"></img></div>
            </div>

            <div className="about-section reverse">
                <div className="about-image"><img src="https://zola.in/cdn/shop/articles/jeggings_banner.jpg?v=1685606239"></img></div>
                <div className="about-text">
                    <h2>Meet the Team</h2>
                    <p>
                        Our team is made up of passionate individuals from diverse backgrounds, each bringing their unique perspective to the table. We believe that collaboration and creativity are the keys to our success.
                    </p>
                    <p>
                        Thank you for being a part of our journey. We hope you love our fashion as much as we love creating it for you.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUsComponent;
