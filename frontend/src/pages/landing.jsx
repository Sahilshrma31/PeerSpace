import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const router = useNavigate();
    const [animate, setAnimate] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setTimeout(() => setAnimate(true), 100);
        
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
            overflow: 'hidden',
            position: 'relative',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
            {/* Animated Background Elements */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45, 140, 255, 0.08), transparent 40%)`,
                pointerEvents: 'none',
                transition: 'background 0.3s ease'
            }} />
            
            {/* Floating Orbs */}
            {[...Array(5)].map((_, i) => (
                <div
                    key={i}
                    style={{
                        position: 'absolute',
                        width: `${40 + i * 15}px`,
                        height: `${40 + i * 15}px`,
                        borderRadius: '50%',
                        background: `linear-gradient(45deg, rgba(45, 140, 255, 0.1), rgba(255, 255, 255, 0.03))`,
                        top: `${15 + i * 20}%`,
                        left: `${5 + i * 18}%`,
                        animation: `float${i} ${6 + i * 2}s ease-in-out infinite`,
                        backdropFilter: 'blur(1px)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        zIndex: 1
                    }}
                />
            ))}

            <style>{`
                @keyframes float0 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-15px) rotate(180deg); } }
                @keyframes float1 { 0%, 100% { transform: translateX(0px) rotate(0deg); } 50% { transform: translateX(20px) rotate(-180deg); } }
                @keyframes float2 { 0%, 100% { transform: translate(0px, 0px) rotate(0deg); } 50% { transform: translate(15px, -20px) rotate(90deg); } }
                @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(25px) rotate(-90deg); } }
                @keyframes float4 { 0%, 100% { transform: translateX(0px) rotate(0deg); } 50% { transform: translateX(-15px) rotate(270deg); } }
                
                @keyframes glow {
                    0%, 100% { box-shadow: 0 0 15px rgba(45, 140, 255, 0.4); }
                    50% { box-shadow: 0 0 30px rgba(45, 140, 255, 0.7); }
                }
                
                @keyframes textGlow {
                    0%, 100% { text-shadow: 0 0 8px rgba(45, 140, 255, 0.4); }
                    50% { text-shadow: 0 0 16px rgba(45, 140, 255, 0.7); }
                }

                @media (max-width: 768px) {
                    .landingMainContainer {
                        flex-direction: column !important;
                        text-align: center !important;
                        padding: 20px !important;
                        gap: 40px !important;
                    }
                    
                    .heroText h1 {
                        font-size: 2.2rem !important;
                    }
                    
                    .heroText p {
                        font-size: 1rem !important;
                    }
                    
                    .navlist {
                        gap: 15px !important;
                    }
                    
                    .navlist p {
                        font-size: 0.9rem !important;
                        margin-left: 0 !important;
                    }
                }

                @media (max-width: 480px) {
                    nav {
                        flex-direction: column !important;
                        gap: 20px !important;
                        padding: 20px !important;
                    }
                    
                    .navHeader h2 {
                        font-size: 1.5rem !important;
                    }
                    
                    .heroText h1 {
                        font-size: 1.8rem !important;
                    }
                    
                    .heroText .subtitle {
                        font-size: 1.3rem !important;
                    }
                }
            `}</style>

            {/* Navbar */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '25px 40px',
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                position: 'relative',
                zIndex: 100
            }}>
                <div className='navHeader'>
                    <h2 style={{
                        color: 'white',
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        margin: 0,
                        opacity: animate ? 1 : 0,
                        transform: animate ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'all 0.6s ease',
                        animation: 'textGlow 4s ease-in-out infinite'
                    }}>
                        <span style={{ color: '#2D8CFF' }}>Peer</span>Space
                    </h2>
                </div>

                <div className='navlist' style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    {['Join as Guest', 'Register', 'Login'].map((text, idx) => (
                        <p
                            key={idx}
                            onClick={() => router(text === 'Join as Guest' ? "/aljk23" : "/auth")}
                            style={{
                                cursor: 'pointer',
                                color: 'white',
                                margin: 0,
                                padding: idx === 2 ? '12px 24px' : '12px 8px',
                                border: idx === 2 ? '2px solid #2D8CFF' : 'none',
                                borderRadius: idx === 2 ? '25px' : '8px',
                                backgroundColor: idx === 2 ? 'rgba(45, 140, 255, 0.1)' : 'transparent',
                                backdropFilter: idx === 2 ? 'blur(10px)' : 'none',
                                fontSize: '1rem',
                                fontWeight: '500',
                                opacity: animate ? 1 : 0,
                                transform: animate ? 'translateY(0)' : 'translateY(-10px)',
                                transition: 'all 0.3s ease',
                                transitionDelay: `${0.3 + idx * 0.1}s`,
                                display: 'inline-block'
                            }}
                            onMouseEnter={(e) => {
                                if (idx === 2) {
                                    e.target.style.backgroundColor = '#2D8CFF';
                                    e.target.style.transform = 'scale(1.05) translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 25px rgba(45, 140, 255, 0.4)';
                                } else {
                                    e.target.style.color = '#2D8CFF';
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.backgroundColor = 'rgba(45, 140, 255, 0.1)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (idx === 2) {
                                    e.target.style.backgroundColor = 'rgba(45, 140, 255, 0.1)';
                                    e.target.style.transform = 'scale(1) translateY(0)';
                                    e.target.style.boxShadow = 'none';
                                } else {
                                    e.target.style.color = 'white';
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </nav>

            {/* Hero Section */}
            <div className="landingMainContainer" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '60px 40px',
                minHeight: 'calc(100vh - 120px)',
                gap: '60px',
                position: 'relative',
                zIndex: 10
            }}>
                {/* Left Text Section */}
                <div className="heroText" style={{
                    flex: '1',
                    maxWidth: '600px',
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateX(0)' : 'translateX(-40px)',
                    transition: 'all 1s ease'
                }}>
                    <h1 style={{
                        fontSize: '3.2rem',
                        fontWeight: '800',
                        color: 'white',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        textAlign: 'left'
                    }}>
                        <span style={{ 
                            color: "#2D8CFF",
                            background: 'linear-gradient(45deg, #2D8CFF, #64B5F6)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            Connect
                        </span> with your<br />loved ones
                    </h1>

                    <p className="subtitle" style={{
                        fontSize: '1.6rem',
                        color: '#e0e0e0',
                        fontStyle: 'italic',
                        fontWeight: '300',
                        textAlign: 'left',
                        marginBottom: '2rem',
                        letterSpacing: '0.5px'
                    }}>
                        Feel closer, no matter how far.
                    </p>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.03)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: '16px',
                        padding: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        marginBottom: '2.5rem'
                    }}>
                        <p style={{
                            fontSize: '1.1rem',
                            color: '#ccc',
                            fontWeight: '400',
                            textAlign: 'left',
                            marginBottom: '1rem',
                            lineHeight: '1.6'
                        }}>
                            Crystal-clear HD video. Seamless voice. Built with simplicity, speed, and security in mind.
                        </p>

                        <p style={{
                            fontSize: '1rem',
                            color: '#aaa',
                            fontWeight: '400',
                            textAlign: 'left',
                            margin: 0,
                            lineHeight: '1.6'
                        }}>
                            Whether you're catching up with friends, studying together, or sharing a laugh — this platform brings you closer.
                        </p>
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <Link
                            to="/auth"
                            style={{
                                padding: '16px 32px',
                                background: 'linear-gradient(45deg, #2D8CFF, #1976D2)',
                                color: 'white',
                                fontWeight: '600',
                                borderRadius: '50px',
                                textDecoration: 'none',
                                fontSize: '1.1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 8px 32px rgba(45, 140, 255, 0.3)',
                                display: 'inline-block',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'scale(1.05) translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 40px rgba(45, 140, 255, 0.5)';
                                e.target.style.background = 'linear-gradient(45deg, #1976D2, #0D47A1)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'scale(1) translateY(0)';
                                e.target.style.boxShadow = '0 8px 32px rgba(45, 140, 255, 0.3)';
                                e.target.style.background = 'linear-gradient(45deg, #2D8CFF, #1976D2)';
                            }}
                        >
                            Get Started
                            <span style={{
                                marginLeft: '8px',
                                fontSize: '1.2rem'
                            }}>→</span>
                        </Link>
                    </div>
                </div>

                {/* Right Image Section */}
                <div style={{
                    flex: '1',
                    maxWidth: '500px',
                    transform: animate ? 'translateX(0)' : 'translateX(60px)',
                    opacity: animate ? 1 : 0,
                    transition: 'all 1s ease',
                    position: 'relative'
                }}>
                    {/* Glowing background effect */}
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '-20px',
                        right: '-20px',
                        bottom: '-20px',
                        background: 'linear-gradient(45deg, rgba(45, 140, 255, 0.1), rgba(255, 255, 255, 0.05))',
                        borderRadius: '30px',
                        filter: 'blur(20px)',
                        animation: 'glow 3s ease-in-out infinite'
                    }} />
                    
                    <div style={{
                        backdropFilter: 'blur(20px)',
                        background: 'rgba(255, 255, 255, 0.08)',
                        padding: '30px',
                        borderRadius: '25px',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        position: 'relative',
                        zIndex: 2
                    }}>
                        <img
                            src="/mobile.png"
                            alt="PeerSpace App Preview"
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '20px',
                                display: 'block',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                                backgroundColor: 'transparent'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}