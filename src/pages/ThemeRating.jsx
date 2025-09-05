import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ThemeRating = () => {
  const navigate = useNavigate();
  
  const [themes, setThemes] = useState({
    energyEfficiency1: 65,
    waterConservation: 75,
    transportAccess1: 55,
    waterManagement1: 70,
    energyEfficiency2: 85,
    transportAccess2: 40,
    waterManagement2: 35,
    energyEfficiency3: 60
  });

  const handleSliderChange = (themeName, value) => {
    setThemes(prev => ({
      ...prev,
      [themeName]: parseInt(value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Theme ratings:', themes);
    navigate('/intervention-selection');
  };

  const isMobile = window.innerWidth <= 768;

  // Theme data using brand colors - alternating between Blue and Orange
  const themeData = [
    { key: 'energyEfficiency1', label: 'Energy Efficiency', color: 'rgb(50, 195, 226)' }, // Brand Blue
    { key: 'waterConservation', label: 'Water Conservation', color: '#FF7F00' }, // Orange PMS 1235
    { key: 'transportAccess1', label: 'Transport Access', color: 'rgb(50, 195, 226)' }, // Brand Blue
    { key: 'waterManagement1', label: 'Water Management', color: '#FF7F00' }, // Orange PMS 1235
    { key: 'energyEfficiency2', label: 'Energy Efficiency', color: 'rgb(50, 195, 226)' }, // Brand Blue
    { key: 'transportAccess2', label: 'Transport Access', color: '#FF7F00' }, // Orange PMS 1235
    { key: 'waterManagement2', label: 'Water Management', color: 'rgb(50, 195, 226)' }, // Brand Blue
    { key: 'energyEfficiency3', label: 'Energy Efficiency', color: '#FF7F00' } // Orange PMS 1235
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('${process.env.PUBLIC_URL}/newdashbg.jpg')`, // Same background as dashboard/create-project
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
        
        {/* Main Content Card - Compact to fit on one page */}
        <div style={{
          width: isMobile ? '100%' : '700px', // Reduced width
          maxWidth: '700px',
          backgroundColor: 'rgba(66, 86, 103, 0.7)',
          borderRadius: '16px', // Slightly smaller radius
          padding: isMobile ? '24px 20px' : '28px 32px', // Reduced padding
          boxShadow: '0 20px 60px rgba(66, 86, 103, 0.3)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '0 auto'
        }}>
          
          {/* Header */}
          <div style={{ 
            marginBottom: isMobile ? '20px' : '24px', // Reduced margin
            textAlign: 'center'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '22px' : '26px', // Smaller font
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900',
              color: '#ffffff',
              margin: 0,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
            }}>
              Sustainability Themes
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Table Headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 250px', // Reduced slider area
              gap: isMobile ? '16px' : '30px', // Reduced gap
              marginBottom: '20px', // Reduced margin
              paddingBottom: '12px', // Reduced padding
              borderBottom: '2px solid rgba(50, 195, 226, 0.5)'
            }}>
              <div style={{
                fontSize: isMobile ? '14px' : '16px', // Smaller font
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '900',
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
              }}>
                Theme Name
              </div>
              {!isMobile && (
                <div style={{
                  fontSize: '16px', // Smaller font
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '900',
                  color: '#ffffff',
                  textAlign: 'center',
                  textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                }}>
                  Rating Bar
                </div>
              )}
            </div>

            {/* Themes List */}
            <div style={{ marginBottom: '32px' }}> {/* Reduced margin */}
              {themeData.map((theme, index) => (
                <div key={`${theme.key}-${index}`} style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr 250px', // Reduced slider area
                  gap: isMobile ? '12px' : '30px', // Reduced gap
                  alignItems: 'center',
                  marginBottom: isMobile ? '16px' : '18px', // Reduced spacing
                  padding: isMobile ? '12px' : '14px', // Reduced padding
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px', // Smaller radius
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                  e.target.style.transform = 'translateY(-1px)'; // Smaller movement
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{
                    fontSize: isMobile ? '13px' : '14px', // Smaller font
                    color: '#ffffff',
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: '300',
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                  }}>
                    {theme.label}
                  </div>
                  
                  {/* Custom Slider */}
                  <div style={{ 
                    width: isMobile ? '100%' : '220px', // Reduced width
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: isMobile ? 'flex-start' : 'center',
                    gap: '10px' // Reduced gap
                  }}>
                    <div style={{
                      position: 'relative',
                      width: isMobile ? '160px' : '170px',
                      height: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      {/* Progress bar */}
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        height: '100%',
                        width: `${themes[theme.key]}%`,
                        background: theme.color, // Solid color instead of gradient
                        borderRadius: '4px',
                        transition: 'width 0.1s ease-out', // Faster, smoother transition
                        boxShadow: 'none' // Remove glow effect for better performance
                      }} />
                      
                      {/* Slider handle */}
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: `${themes[theme.key]}%`,
                        transform: 'translate(-50%, -50%)',
                        width: '16px',
                        height: '16px',
                        backgroundColor: theme.color,
                        borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.2)`, // Simplified shadow
                        cursor: 'pointer',
                        transition: 'left 0.1s ease-out', // Faster transition
                        willChange: 'left' // Optimize for changes
                      }} />
                      
                      {/* Slider input */}
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={themes[theme.key]}
                        onChange={(e) => handleSliderChange(theme.key, e.target.value)}
                        style={{
                          position: 'absolute',
                          top: '-4px',
                          left: 0,
                          width: '100%',
                          height: '16px',
                          background: 'transparent',
                          outline: 'none',
                          cursor: 'pointer',
                          appearance: 'none',
                          WebkitAppearance: 'none'
                        }}
                      />
                    </div>
                    
                    {/* Value display */}
                    <span style={{
                      fontSize: '12px',
                      fontFamily: "'Arquitecta', sans-serif",
                      fontWeight: '900',
                      color: theme.color,
                      minWidth: '30px',
                      textAlign: 'center',
                      textShadow: 'none' // Remove text shadow for better performance
                    }}>
                      {themes[theme.key]}%
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, rgb(50, 195, 226) 0%, rgb(40, 175, 206) 100%)',
                  color: 'white',
                  padding: isMobile ? '14px 40px' : '16px 48px', // Reduced padding
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px', // Smaller font
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '900',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 24px rgba(50, 195, 226, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.02)'; // Smaller movement
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

      {/* Custom CSS for slider styling */}
      <style>
        {`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 0;
            height: 0;
          }
          
          input[type="range"]::-moz-range-thumb {
            border: none;
            background: transparent;
            width: 0;
            height: 0;
          }
        `}
      </style>
    </div>
  );
};

export default ThemeRating;
