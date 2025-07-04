import React, { useEffect, useState } from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const router = useNavigate();
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setTimeout(() => setAnimate(true), 100);
    }, []);

    return (
        <div className='landingPageContainer' style={{ overflow: 'hidden' }}>
            {/* Navbar */}
            <nav>
                <div className='navHeader'>
                    <h2 style={{
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'all 0.6s ease'
                    }}>PeerSpace</h2>
                </div>
                <div className='navlist' style={{ display: 'flex', gap: '20px' }}>
                    {['Join as Guest', 'Register', 'Login'].map((text, idx) => (
                        <p
                            key={idx}
                            onClick={() => router(text === 'Join as Guest' ? "/aljk23" : "/auth")}
                            style={{
                                cursor: 'pointer',
                                color: 'white',
                                opacity: animate ? 1 : 0,
                                transform: animate ? 'translateY(0)' : 'translateY(-10px)',
                                transition: 'all 0.1s ease-in-out',
                                transitionDelay: `${0.3 + idx * 0.1}s`,
                                display: 'inline-block',
                                marginLeft: '10px',
                                fontWeight: '500'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.color = '#2D8CFF';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.color = 'white';
                            }}
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="landingMainContainer">
                {/* Left Text Section */}
                <div
                    style={{
                        maxWidth: '700px',
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateX(0)' : 'translateX(-40px)',
                        transition: 'all 1s ease'
                    }}
                >
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 'bold',
                        color: 'white',
                        lineHeight: '1.2',
                        marginBottom: '1rem',
                        textAlign: 'left'
                    }}>
                        <span style={{ color: "#2D8CFF" }}>
                            Connect
                        </span> with your loved ones
                    </h1>

                    <p style={{
                        fontSize: '1.8rem',
                        color: '#ccc',
                        fontStyle: 'italic',
                        fontWeight: '500',
                        textAlign: 'left',
                        marginBottom: '1rem'
                    }}>
                        Feel closer, no matter how far.
                    </p>

                    <p style={{
                        fontSize: '1rem',
                        color: '#aaa',
                        fontWeight: '400',
                        textAlign: 'left',
                        marginBottom: '1rem'
                    }}>
                        Crystal-clear HD video. Seamless voice. Built with simplicity, speed, and security in mind.
                    </p>

                    <p style={{
                        fontSize: '1rem',
                        color: '#aaa',
                        fontWeight: '400',
                        textAlign: 'left',
                        marginBottom: '2rem'
                    }}>
                        Whether you're catching up with friends, studying together, or sharing a laugh — this platform brings you closer.
                    </p>

                    <div role='button' style={{ textAlign: 'left' }}>
                        <Link
                            to="/auth"
                            style={{
                                padding: '14px 28px',
                                backgroundColor: '#2D8CFF',
                                color: 'white',
                                fontWeight: '600',
                                borderRadius: '12px',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                transition: 'all 0.1s ease-in-out',
                                boxShadow: '0 0 15px rgba(45, 140, 255, 0.7)',
                                display: 'inline-block'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'scale(1.05)';
                                e.target.style.boxShadow = '0 0 25px rgba(45, 140, 255, 1)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'scale(1)';
                                e.target.style.boxShadow = '0 0 15px rgba(45, 140, 255, 0.7)';
                            }}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>

                {/* Right Image Section */}
                <div
                    style={{
                        transform: animate ? 'translateX(0)' : 'translateX(60px)',
                        opacity: animate ? 1 : 0,
                        transition: 'all 1s ease'
                    }}
                >
                    <div style={{
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '20px',
                        borderRadius: '20px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)',
                        maxWidth: '430px',
                        margin: '0 auto'
                    }}>
                        <img
                            src="/mobile.png"
                            alt="App Preview"
                            style={{
                                width: '100%',
                                borderRadius: '16px',
                                display: 'block',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
