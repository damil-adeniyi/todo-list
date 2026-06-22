const hero = document.createElement('div');
const about = document.createElement('div');
const menu = document.createElement('div');
const faq = document.createElement('div');
const contact = document.createElement('div');
const content = document.getElementById('content');

export function loadPage() {
    hero.classList.add('hero');
    about.classList.add('about');
    menu.classList.add('menu');
    faq.classList.add('faq');
    contact.classList.add('contact');

    hero.innerHTML = `
        <div class="hero-text">
                <h1>Welcome to Our Restaurant</h1>
                <p>Enjoy the best food in town!</p>
            </div>
    `;

    about.innerHTML = `
    <div class="wrapper-col"> 
    <div class="about-text">
                <h2>Our Story</h2>
                <p>Founded in 2000, our restaurant has been a staple in the community for over two decades. 
                We pride ourselves on our commitment to quality and customer satisfaction.</p>
                
        </div>
            
        <div class="about-img">
                <img src="https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Restaurant Image">
        </div>
    </div>
        
    `;

    menu.innerHTML = `
    <div class="wrapper-col"> 
        <div class="menu-text">
                <h2>Our Menu</h2>
                <p>From classic dishes to modern twists, our menu offers something for everyone. Whether you're in the mood for a hearty meal or a light snack, we've got you covered.</p>
            </div>

            <div class="menus">
                <div class="menu-item">
                    <div class="menu-item-head">
                        
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Grilled Salmon">
                    </div>

                    <div class="menu-item-body">
                    <div class="menu-item-body-head">
                     <h3>Grilled Salmon</h3>
                        <p>Fresh salmon grilled to perfection, served with a side of vegetables.</p>
                    </div>
                    
                        <div class="price-cta">
                            <span class="price">$18.99</span>
                            <button class="order-btn">Order Now</button>
                        </div>
                    </div>
                </div>
                <div class="menu-item">
                    <div class="menu-item-head">
                        
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Caesar Salad">
                    </div>  
                    <div class="menu-item-body">
                    <div class="menu-item-body-head">
                     <h3>Caesar Salad</h3>
                        <p>Crisp romaine lettuce with our famous Caesar dressing and croutons.</p>
                    </div>
                    
                        <div class="price-cta">
                            <span class="price">$12.99</span>
                            <button class="order-btn">Order Now</button>
                        </div>
                    </div>
                </div>
                <div class="menu-item">
                    <div class="menu-item-head">
                        
                        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Chicken Parmesan">
                    </div>
                    <div class="menu-item-body">
                    <div class="menu-item-body-head">
                     <h3>Chicken Parmesan</h3>
                        <p> breaded chicken breast topped with marinara sauce and melted mozzarella.</p>
                    </div>
                        
                        <div class="price-cta">
                            <span class="price">$16.99</span>
                            <button class="order-btn">Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
    </div>
        
        `;

    faq.innerHTML = `
    <div class="wrapper"> 
         <h2>Frequently Asked Questions</h2>
            <div class="faq-item">
                <h3>What are your hours of operation?</h3>
                <p>We are open daily from 11:00 AM to 10:00 PM.</p>
            </div>
            <div class="faq-item">
                <h3>Do you offer delivery?</h3>
                <p>Yes, we offer delivery within a 5-mile radius of our restaurant.</p>
            </div>
    </div>
       
    `;

    contact.innerHTML = `
    <div class="wrapper-col"> 
            <div class="contact-info">
                <h2>Contact Us</h2>
                <p>Have questions or feedback? We'd love to hear from you!</p>
            </div>

            <div class="contact-body">
                <div class="contact-body-right">
                    <div class="contact-items">
                        <div class="contact-item">
                        <h3>Address:</h3>
                        <p>123 Main Street, Anytown, USA</p>
                        </div>
                        <div class="contact-item">
                        <h3>Phone:</h3>
                        <p>(123) 456-7890</p>
                        </div>
                        <div class="contact-item">
                        <h3>Email:</h3>
                        <p>info@myrestaurant.com</p>
                        </div>
                    </div>

                    
                 
                </div>
                  
                
                
            </div>
    </div>
        
    `;

    content.appendChild(hero);
    content.appendChild(about);
    content.appendChild(menu);
    // content.appendChild(faq);
    content.appendChild(contact);

    console.log('Home');
    
}