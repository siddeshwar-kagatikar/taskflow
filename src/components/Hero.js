import React from 'react'
import './HeroSection.css'
import video from './time.mp4'
import img from './black.jpg'
// import Footer from './Footer'
import './login.css'

export default function Home() {
  return (
    <>
      <div className='hero-container'>
        <video src={video} autoPlay loop muted />
        <h4>Manage your work with ease!!!</h4>
        <p>"Time is what we want the most, but use the worst."</p>
      </div>
      <div className='hero-container1'>
          <img src={img} alt=''></img>
            <h3>Connect Here</h3>
            <p>Join with us on different social media platform and promote a systematic work environment</p>
            <ul className="socials">
                <li><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://twitter.com/home?lang=en"><i className="fa fa-twitter"></i></a></li>
                <li><a href="/https://www.youtube.com/"><i className="fa fa-youtube"></i></a></li>
                <li><a href="https://www.linkedin.com/authwall?trk=qf&original_referer=https://www.google.com/&sessionRedirect=https%3A%2F%2Fin.linkedin.com%2F"><i className="fa fa-linkedin-square"></i></a></li>
            </ul>
            
        {/* <Footer/> */}
      </div>
      <div className="footer-bottom">
              <p>copyright &copy;2023 TaskFlow. designed by <span>SIDDU</span></p>
            </div>
    </>
  )
}
