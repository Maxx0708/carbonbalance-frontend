import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCreateUser = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    role: 'Admin',
    assignedProjectName: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role: role
    }));
  };

  const handleClearForm = () => {
    setFormData({
      name: '',
      password: '',
      email: '',
      role: 'Admin',
      assignedProjectName: ''
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    console.log('Creating user:', formData);
    alert('User created successfully!');
    
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const isMobile = window.innerWidth <= 768;

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '16px 44px 16px 44px' : '14px 44px 14px 44px',
    border: 'none',
    borderRadius: '12px',
    fontSize: isMobile ? '16px' : '14px',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    outline: 'none',
    fontFamily: "'Arquitecta', sans-serif",
    fontWeight: '300',
    color: 'rgb(66, 86, 103)',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: isMobile ? '12px' : '8px',
    fontFamily: "'Arquitecta', sans-serif",
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: isMobile ? '15px' : '14px'
  };

  const fieldContainerStyle = {
    marginBottom: isMobile ? '24px' : '24px'
  };

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
        
        {/* Main Content Area - Responsive */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: window.innerWidth <= 768 ? 'center' : 'flex-start',
          padding: window.innerWidth <= 768 ? '20px' : '40px 80px',
          position: 'relative'
        }}>
          
          {/* Admin Form Container - Responsive */}
          <div style={{
            width: isMobile ? '100%' : '480px',
            maxWidth: isMobile ? '420px' : 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Ultra translucent
            borderRadius: '20px',
            padding: isMobile ? '32px 24px' : '32px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(20px)', // Strong glass effect
            border: '1px solid rgba(255, 255, 255, 0.2)',
            margin: isMobile ? '0 auto' : '0'
          }}>
            
            {/* Header - Responsive */}
            <div style={{ 
              textAlign: 'center', 
              marginBottom: isMobile ? '32px' : '32px',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h2 style={{
                margin: 0,
                fontSize: isMobile ? '28px' : '32px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '300',
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
              }}>
                Create New User
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateUser}>
              
              {/* Name Field */}
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Name:</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(66, 86, 103, 0.6)',
                    fontSize: isMobile ? '18px' : '16px',
                    zIndex: 1
                  }}>
                    👤
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Password:</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(66, 86, 103, 0.6)',
                    fontSize: isMobile ? '18px' : '16px',
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
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
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
                      fontSize: isMobile ? '18px' : '16px',
                      color: 'rgb(66, 86, 103)',
                      padding: isMobile ? '12px' : '4px',
                      borderRadius: '4px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                    }}
                  >
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {/* Email Field */}
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Email:</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgba(66, 86, 103, 0.6)',
                    fontSize: isMobile ? '18px' : '16px',
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
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
                    required
                  />
                </div>
              </div>

              {/* Role Assignment - Responsive */}
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Role Assignment:</label>
                <div style={{ 
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', // Changed to 2 columns for 4 roles
                  gap: isMobile ? '16px' : '12px',
                  marginTop: '8px'
                }}>
                  {['Admin', 'Staff', 'Client', 'Consultant'].map((role) => (
                    <label 
                      key={role}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        cursor: 'pointer',
                        fontSize: isMobile ? '16px' : '14px',
                        fontFamily: "'Arquitecta', sans-serif",
                        fontWeight: '300',
                        color: 'rgba(255, 255, 255, 0.9)',
                        padding: isMobile ? '12px 16px' : '8px 12px',
                        backgroundColor: formData.role === role ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                      onClick={() => handleRoleChange(role)}
                    >
                      <div style={{
                        width: isMobile ? '20px' : '16px',
                        height: isMobile ? '20px' : '16px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255, 255, 255, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: formData.role === role ? 'rgba(255, 255, 255, 0.8)' : 'transparent',
                        transition: 'all 0.3s ease',
                        flexShrink: 0
                      }}>
                        {formData.role === role && (
                          <div style={{
                            width: isMobile ? '10px' : '8px',
                            height: isMobile ? '10px' : '8px',
                            borderRadius: '50%',
                            backgroundColor: 'rgb(66, 86, 103)'
                          }} />
                        )}
                      </div>
                      {role}
                    </label>
                  ))}
                </div>
              </div>

              {/* Assigned Project Name - Responsive */}
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Assigned Project Name:</label>
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '20px',
                    color: 'rgba(66, 86, 103, 0.6)',
                    fontSize: isMobile ? '18px' : '16px',
                    zIndex: 1,
                    lineHeight: '1'
                  }}>
                    📋
                  </span>
                  <textarea
                    name="assignedProjectName"
                    value={formData.assignedProjectName}
                    onChange={handleInputChange}
                    placeholder="Enter project name or details"
                    style={{
                      ...inputStyle,
                      height: isMobile ? '100px' : '80px',
                      paddingTop: '20px',
                      paddingLeft: '44px',
                      resize: 'vertical',
                      fontFamily: "'Arquitecta', sans-serif",
                      lineHeight: '1.4'
                    }}
                    onFocus={(e) => {
                      e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }}
                  />
                </div>
              </div>

              {/* Action Buttons - Responsive */}
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? '16px' : '16px',
                justifyContent: 'center',
                marginTop: isMobile ? '32px' : '32px'
              }}>
                {/* Clear Form Button */}
                <button
                  type="button"
                  onClick={handleClearForm}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    padding: isMobile ? '16px 24px' : '12px 24px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    fontSize: isMobile ? '16px' : '14px',
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: '300',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    width: isMobile ? '100%' : 'auto',
                    minWidth: isMobile ? 'auto' : '120px',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  Clear Form
                </button>

                {/* Create User Button */}
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: isMobile ? '16px 24px' : '12px 24px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: isMobile ? '16px' : '14px',
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    letterSpacing: '0.5px',
                    width: isMobile ? '100%' : 'auto',
                    minWidth: isMobile ? 'auto' : '120px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                    e.target.style.transform = 'translateY(-1px)';
                    e.target.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateUser;