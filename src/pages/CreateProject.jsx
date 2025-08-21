import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateProject = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  
  const [formData, setFormData] = useState({
    projectType: '',
    location: '',
    buildingType: '',
    numLevels: '',
    externalWallArea: '',
    buildingFootprint: '',
    openingPercentage: '',
    wallFloorRatio: '',
    footprintGIFA: '',
    gifa: '',
    externalOpening: '',
    avgHeightPerLevel: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/theme-rating');
  };

  const inputStyle = {
    width: '100%',
    padding: isMobile ? '8px 12px' : '10px 14px',
    border: '2px solid rgb(50, 195, 226)',
    borderRadius: '6px',
    fontSize: isMobile ? '14px' : '14px',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    outline: 'none',
    fontFamily: "'Arquitecta', sans-serif",
    fontWeight: '300',
    color: 'rgb(66, 86, 103)',
    transition: 'all 0.3s ease'
  };

  const numberInputStyle = {
    ...inputStyle,
    appearance: 'textfield'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '6px',
    fontFamily: "'Arquitecta', sans-serif",
    fontWeight: '900',
    color: '#ffffff',
    fontSize: isMobile ? '12px' : '13px'
  };

  const fieldContainerStyle = {
    marginBottom: isMobile ? '12px' : '14px'
  };

  const handleNumberChange = (fieldName, increment) => {
    const currentValue = parseInt(formData[fieldName]) || 0;
    const newValue = Math.max(0, currentValue + increment);
    setFormData(prev => ({
      ...prev,
      [fieldName]: newValue.toString()
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('${process.env.PUBLIC_URL}/newdashbg.jpg')`, // Changed to new background
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      
      {/* Subtle overlay for better form readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(255, 255, 255, 0.05) 100%)',
        zIndex: 0
      }} />
      
      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '20px 16px' : '40px 80px',
        position: 'relative',
        zIndex: 1,
        paddingTop: isMobile ? '90px' : '120px' // Account for header
      }}>
        
        {/* Form Container - Centered and More Translucent */}
        <div style={{
          width: isMobile ? '100%' : '800px',
          maxWidth: '800px',
          backgroundColor: 'rgba(66, 86, 103, 0.7)', // Much more translucent
          borderRadius: '20px',
          padding: isMobile ? '32px 24px' : '40px 36px',
          boxShadow: '0 20px 60px rgba(66, 86, 103, 0.3)',
          backdropFilter: 'blur(30px)', // Strong blur for glassmorphism
          border: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '0 auto'
        }}>
          
          <h2 style={{ 
            fontSize: isMobile ? '26px' : '30px',
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: '900',
            marginBottom: isMobile ? '24px' : '28px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
          }}>
            Create New Project
          </h2>
          
          <form onSubmit={handleSubmit}>
            {/* Basic Project Info */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: isMobile ? '14px' : '16px',
              marginBottom: isMobile ? '20px' : '22px'
            }}>
              
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Project Type*:</label>
                <div style={{ position: 'relative' }}>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    style={{
                      ...inputStyle,
                      appearance: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgb(40, 175, 206)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(50, 195, 226, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(50, 195, 226)';
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="commercial">Commercial</option>
                    <option value="residential">Residential</option>
                    <option value="industrial">Industrial</option>
                  </select>
                  <span style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgb(50, 195, 226)',
                    pointerEvents: 'none',
                    fontSize: '16px'
                  }}>🏢</span>
                </div>
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Location:</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    style={inputStyle}
                    placeholder="Enter location"
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgb(40, 175, 206)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(50, 195, 226, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(50, 195, 226)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgb(50, 195, 226)',
                    pointerEvents: 'none',
                    fontSize: '16px'
                  }}>📍</span>
                </div>
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Building Type:</label>
                <div style={{ position: 'relative' }}>
                  <select
                    name="buildingType"
                    value={formData.buildingType}
                    onChange={handleInputChange}
                    style={{
                      ...inputStyle,
                      appearance: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgb(40, 175, 206)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(50, 195, 226, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(50, 195, 226)';
                      e.target.style.boxShadow = 'none';
                    }}
                    required
                  >
                    <option value="">Select Building Type</option>
                    <option value="office">Office</option>
                    <option value="hotel">Hotel</option>
                    <option value="retail">Retail</option>
                    <option value="warehouse">Warehouse</option>
                  </select>
                  <span style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'rgb(50, 195, 226)',
                    pointerEvents: 'none',
                    fontSize: '16px'
                  }}>🗃️</span>
                </div>
              </div>
            </div>

            {/* Building Metrics Section */}
            <div style={{ 
              borderTop: '1px solid rgba(50, 195, 226, 0.3)',
              paddingTop: isMobile ? '16px' : '18px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: isMobile ? '14px' : '16px'
              }}>
                <span style={{ 
                  fontSize: '16px',
                  color: 'rgb(50, 195, 226)'
                }}>📊</span>
                <h3 style={{ 
                  fontSize: isMobile ? '16px' : '18px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '900',
                  margin: 0,
                  color: '#ffffff'
                }}>
                  All Building Metrics
                </h3>
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: isMobile ? '12px' : '14px'
              }}>
                {[
                  { name: 'numLevels', label: 'Number of levels:' },
                  { name: 'externalWallArea', label: 'External wall area:' },
                  { name: 'buildingFootprint', label: 'Building footprint:' },
                  { name: 'openingPercentage', label: 'Opening%:' },
                  { name: 'wallFloorRatio', label: 'Wall floor ratio:' },
                  { name: 'footprintGIFA', label: 'Footprint GIFA:' },
                  { name: 'gifa', label: 'GIFA:' },
                  { name: 'externalOpening', label: 'External opening:' },
                  { name: 'avgHeightPerLevel', label: 'Avg.height per level:' }
                ].map((field) => (
                  <div key={field.name} style={fieldContainerStyle}>
                    <label style={labelStyle}>{field.label}</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="number"
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        style={numberInputStyle}
                        placeholder="0"
                        min="0"
                        onFocus={(e) => {
                          e.target.style.borderColor = 'rgb(40, 175, 206)';
                          e.target.style.boxShadow = '0 0 0 3px rgba(50, 195, 226, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = 'rgb(50, 195, 226)';
                          e.target.style.boxShadow = 'none';
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1px'
                      }}>
                        <button
                          type="button"
                          onClick={() => handleNumberChange(field.name, 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '10px',
                            color: 'rgb(50, 195, 226)',
                            padding: '2px',
                            lineHeight: '1',
                            userSelect: 'none',
                            fontFamily: "'Arquitecta', sans-serif",
                            fontWeight: '900'
                          }}
                          onMouseOver={(e) => e.target.style.color = 'rgb(40, 175, 206)'}
                          onMouseOut={(e) => e.target.style.color = 'rgb(50, 195, 226)'}
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNumberChange(field.name, -1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '10px',
                            color: 'rgb(50, 195, 226)',
                            padding: '2px',
                            lineHeight: '1',
                            userSelect: 'none',
                            fontFamily: "'Arquitecta', sans-serif",
                            fontWeight: '900'
                          }}
                          onMouseOver={(e) => e.target.style.color = 'rgb(40, 175, 206)'}
                          onMouseOut={(e) => e.target.style.color = 'rgb(50, 195, 226)'}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div style={{ 
              textAlign: 'center', 
              marginTop: isMobile ? '20px' : '22px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(50, 195, 226, 0.3)'
            }}>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, rgb(50, 195, 226) 0%, rgb(40, 175, 206) 100%)',
                  color: 'white',
                  padding: isMobile ? '14px 36px' : '16px 40px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(50, 195, 226, 0.4)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px) scale(1.02)';
                  e.target.style.boxShadow = '0 12px 32px rgba(50, 195, 226, 0.5)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0) scale(1)';
                  e.target.style.boxShadow = '0 8px 24px rgba(50, 195, 226, 0.4)';
                }}
              >
                SUBMIT
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* CSS to hide number input arrows in WebKit browsers */}
      <style>
        {`
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
    </div>
  );
};

export default CreateProject;