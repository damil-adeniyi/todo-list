const hero = document.createElement('div');
const about = document.createElement('div');
const contact = document.createElement('div');
const content = document.getElementById('content');

export function aboutPage() {
    hero.classList.add('hero');
    about.classList.add('about');
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
    content.appendChild(contact);
}