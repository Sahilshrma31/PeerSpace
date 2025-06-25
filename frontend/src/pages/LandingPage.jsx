import React from 'react'
import { Link } from 'react-router-dom';


export default function LandingPage() {
  return (
    <div className="landingPageContainer">
     <nav>

      <div className='navHeader'>
    <h2>Video call</h2>
      </div>

      <div className='navlist'>
    <p>Join as Guest</p>
    <p>Register</p>
    <div role='button'>
    <p>Login</p>
    </div>
      </div>
     </nav>

     <div className='landingMainContainer'>
    <div>
      <h1><span style={{color:"#4a90e2"}}>Connect</span> with your Loved ones</h1>
      <p>Cover the distance by PeerSpace</p>
      <div role='button'>
        <Link to={"/auth"}>Get Started</Link>
      </div>
    </div>
    <div>
      <img src="/mobile.png" alt=""></img>
    </div>

     </div>
     
    </div>
  )
}
