// import React from 'react';
// import '../AboutUs.css'; // Import CSS file for styling

// const AboutUsComponent = () => {
//   return (
//     <div className="about-us">
//       <header className="about-us-header">
//         <h1>About Fashion Fusion</h1>
//       </header>
//       <section className="about-us-content">
//         <p>Welcome to Fashion Fusion, where style meets innovation. Our mission is to provide trendy, high-quality fashion that empowers individuals to express their unique selves.</p>
//         <h2>Our Story</h2>
//         <p>Fashion Fusion was founded in [Year] with the vision of bridging the gap between traditional craftsmanship and modern design. Our team of designers and artisans work tirelessly to bring you collections that are not only fashionable but also sustainable and ethical.</p>
//         <h2>Our Values</h2>
//         <ul>
//           <li><strong>Innovation:</strong> We are constantly exploring new techniques and materials to stay ahead of fashion trends.</li>
//           <li><strong>Quality:</strong> We prioritize quality in every piece we create, ensuring it lasts and looks great.</li>
//           <li><strong>Sustainability:</strong> We are committed to reducing our environmental footprint through sustainable practices.</li>
//         </ul>
//         <h2>Meet the Team</h2>
//         <p>Our team is made up of passionate individuals from diverse backgrounds, each bringing their unique perspective to the table. We believe that collaboration and creativity are the keys to our success.</p>
//       </section>
//       <footer className="about-us-footer">
//         <p>Thank you for being a part of our journey. We hope you love our fashion as much as we love creating it for you.</p>
//       </footer>
//     </div>
//   );
// }

// export default AboutUsComponent;
import React from 'react';
import '../AboutUs.css'; // Import the CSS file for styling

function AboutUsComponent() {
    return (
        <div className="about-container">
            <div className>
                <center><h2>About Us</h2></center>
                <p>
                    Fashion Fusion is dedicated to bringing you the latest trends in fashion.
                    Our mission is to inspire confidence through style and empower individuals
                    to express their unique personalities through fashion choices. With a focus
                    on quality and innovation, we strive to redefine the fashion industry.
                </p>
                <hr/>
                <h2>Our Story</h2>
        <p>Fashion Fusion was founded in [Year] with the vision of bridging the gap between traditional craftsmanship and modern design. Our team of designers and artisans work tirelessly to bring you collections that are not only fashionable but also sustainable and ethical.</p>
        <hr/>
        <h2>Our Values</h2>
    
        <ul>
          <li><strong>Innovation:</strong> We are constantly exploring new techniques and materials to stay ahead of fashion trends.</li>
          <li><strong>Quality:</strong> We prioritize quality in every piece we create, ensuring it lasts and looks great.</li>
          <li><strong>Sustainability:</strong> We are committed to reducing our environmental footprint through sustainable practices.</li>
        </ul>
        <hr/>
        <h2>Meet the Team</h2>
        <p>Our team is made up of passionate individuals from diverse backgrounds, each bringing their unique perspective to the table. We believe that collaboration and creativity are the keys to our success.</p>
        <p>Thank you for being a part of our journey. We hope you love our fashion as much as we love creating it for you.</p>

            </div>
        </div>
    );
}

export default AboutUsComponent;
