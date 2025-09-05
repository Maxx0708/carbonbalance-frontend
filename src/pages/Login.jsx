import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Login attempt:', formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = (fieldName) => ({
    width: '100%',
    padding: '16px 44px 16px 44px',
    border: 'none',
    borderRadius: '12px',
    fontSize: '14px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    fontFamily: "'Arquitecta', sans-serif",
    fontWeight: '300',
    color: 'rgb(66, 86, 103)',
    transition: 'all 0.3s ease',
    transform: focusedField === fieldName ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: focusedField === fieldName ? '0 4px 12px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
  });

  return (
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#f0f8ff'
    }}>
      
      {/* Blurred background layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url('${process.env.PUBLIC_URL}/newbg.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(3px)',
        zIndex: 0
      }} />
      
      {/* Content container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        
        {/* Main Content Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start',
          padding: window.innerWidth <= 768 ? '20px' : '40px 80px',
          position: 'relative'
        }}>
          
          {/* Login Form Container - Responsive */}
          <div style={{
            width: window.innerWidth <= 768 ? '100%' : '400px',
            maxWidth: window.innerWidth <= 768 ? '400px' : 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: window.innerWidth <= 768 ? '32px 24px' : '40px 32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transform: 'translateY(0)',
            transition: 'all 0.3s ease'
          }}>
            
            {/* Logo and Title */}
            <div style={{ marginBottom: window.innerWidth <= 768 ? '24px' : '32px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '24px',
                justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'rgb(50, 195, 226)',
                  borderRadius: '8px',
                  marginRight: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'rotate(5deg) scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'rotate(0deg) scale(1)'}
                >
                  <span style={{ 
                    color: 'white', 
                    fontSize: '20px', 
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: '900'
                  }}>C</span>
                </div>
                <h1 style={{
                  margin: 0,
                  fontSize: window.innerWidth <= 768 ? '28px' : '32px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '300',
                  color: '#ffffff',
                  textAlign: window.innerWidth <= 768 ? 'center' : 'left',
                  marginBottom: '8px',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  CarbonBalance
                </h1>
              </div>
              
              <h2 style={{
                margin: 0,
                fontSize: window.innerWidth <= 768 ? '16px' : '18px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: window.innerWidth <= 768 ? 'center' : 'left',
                marginBottom: '32px'
              }}>
                Log in
              </h2>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              {/* Email Field */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focusedField === 'email' ? 'rgb(66, 86, 103)' : 'rgba(66, 86, 103, 0.6)',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    zIndex: 1
                  }}>
                    ✉️
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="abc@email.com"
                    style={inputStyle('email')}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: focusedField === 'password' ? 'rgb(66, 86, 103)' : 'rgba(66, 86, 103, 0.6)',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    zIndex: 1
                  }}>
                    🔒
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Your password"
                    style={inputStyle('password')}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '16px',
                      color: 'rgb(66, 86, 103)',
                      transition: 'all 0.3s ease',
                      padding: '4px',
                      borderRadius: '4px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'rgba(50, 195, 226, 0.1)';
                      e.target.style.transform = 'translateY(-50%) scale(1.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.transform = 'translateY(-50%) scale(1)';
                    }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '16px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '500',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  marginBottom: '24px',
                  opacity: isLoading ? 0.8 : 1,
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                  transform: 'translateY(0)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseOver={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div style={{
                      width: '16px',
                      height: '16px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite'
                    }} />
                    Signing in...
                  </>
                ) : (
                  <>
                    Log in
                    <span style={{ fontSize: '16px', transition: 'transform 0.3s ease' }}>→</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            body {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;