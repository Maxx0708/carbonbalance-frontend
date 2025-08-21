import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InterventionSelection = () => {
  const navigate = useNavigate();
  
  const [selectedInterventions, setSelectedInterventions] = useState({
    installSolarPanels: true, // Pre-selected as shown in screenshot
    upgradeToLED: false,
    improveInsulation: false,
    lowFlowFixture: false,
    rainwaterHarvesting: false,
    indoorEnvironmentCurtains: false,
    indoorEnvironmentLighting: false,
    bicycleRacksEV: false,
    smartLeakDetection: false
  });

  const [themeToggle, setThemeToggle] = useState(true);
  const isMobile = window.innerWidth <= 768;

  const handleInterventionChange = (interventionName) => {
    setSelectedInterventions(prev => ({
      ...prev,
      [interventionName]: !prev[interventionName]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selected = Object.entries(selectedInterventions)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    
    console.log('Selected interventions:', selected);
    navigate('/results');
  };

  // Intervention data matching the screenshot
  const interventionData = [
    {
      theme: 'Energy Efficiency',
      interventions: [
        { key: 'installSolarPanels', label: 'Install solar panels', checked: true },
        { key: 'upgradeToLED', label: 'Upgrade to LED' },
        { key: 'improveInsulation', label: 'Improve insulation' }
      ]
    },
    {
      theme: 'Water conservation',
      interventions: [
        { key: 'lowFlowFixture', label: 'Low flow fixture' },
        { key: 'rainwaterHarvesting', label: 'Rain water harvesting' }
      ]
    },
    {
      theme: 'Indoor Environment',
      interventions: [
        { key: 'indoorEnvironmentCurtains', label: 'Indoor Environment - By adding curtains' },
        { key: 'indoorEnvironmentLighting', label: 'Indoor Environment - Maximize natural lighting and ventilation' }
      ]
    },
    {
      theme: 'Transport access',
      interventions: [
        { key: 'bicycleRacksEV', label: 'Provide bicycle racks and EV charging stations' }
      ]
    },
    {
      theme: 'Water management',
      interventions: [
        { key: 'smartLeakDetection', label: 'Install smart leak detection systems' }
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('${process.env.PUBLIC_URL}/newdashbg.jpg')`, // Same background as other pages
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
          width: isMobile ? '100%' : '700px',
          maxWidth: '700px',
          backgroundColor: 'rgba(66, 86, 103, 0.7)', // Same translucency as ThemeRating
          borderRadius: '16px',
          padding: isMobile ? '24px 20px' : '28px 32px',
          boxShadow: '0 20px 60px rgba(66, 86, 103, 0.3)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '0 auto'
        }}>
          
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: isMobile ? '20px' : '24px'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '22px' : '26px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900',
              color: '#ffffff',
              margin: 0,
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)'
            }}>
              Sustainability Intervention
            </h2>
            
            {/* Toggle Switch and Help Icon */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Theme Toggle Switch */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  onClick={() => setThemeToggle(!themeToggle)}
                  style={{
                    width: '48px',
                    height: '24px',
                    backgroundColor: themeToggle ? '#FF7F00' : '#ccc',
                    borderRadius: '12px',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: themeToggle ? '26px' : '2px',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                  }} />
                </div>
              </div>
              
              {/* Help Icon */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                backgroundColor: 'rgb(50, 195, 226)',
                borderRadius: '50%',
                color: 'white',
                fontSize: '14px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '900',
                cursor: 'pointer'
              }}>
                ?
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Table Headers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
              gap: isMobile ? '16px' : '30px',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid rgba(50, 195, 226, 0.5)'
            }}>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '900',
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
              }}>
                Theme
              </div>
              <div style={{
                fontSize: isMobile ? '14px' : '16px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '900',
                color: '#ffffff',
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
              }}>
                Intervention
              </div>
            </div>

            {/* Interventions List */}
            <div style={{ marginBottom: '32px' }}>
              {interventionData.map((themeGroup, themeIndex) => (
                <div key={themeIndex} style={{ 
                  marginBottom: '24px',
                  padding: '16px',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : '180px 1fr',
                    gap: isMobile ? '12px' : '30px',
                    alignItems: 'flex-start'
                  }}>
                    {/* Theme Column */}
                    <div style={{
                      fontSize: isMobile ? '13px' : '14px',
                      fontFamily: "'Arquitecta', sans-serif",
                      fontWeight: '300',
                      color: '#ffffff',
                      paddingTop: '4px',
                      textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                    }}>
                      {themeGroup.theme}
                    </div>
                    
                    {/* Interventions Column */}
                    <div>
                      {themeGroup.interventions.map((intervention, index) => (
                        <div key={intervention.key} style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: index < themeGroup.interventions.length - 1 ? '12px' : '0',
                          padding: '6px 0'
                        }}>
                          {/* Custom Checkbox */}
                          <div
                            onClick={() => handleInterventionChange(intervention.key)}
                            style={{
                              width: '16px',
                              height: '16px',
                              border: '2px solid rgb(50, 195, 226)',
                              borderRadius: '3px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              backgroundColor: selectedInterventions[intervention.key] || intervention.checked ? 'rgb(50, 195, 226)' : 'transparent',
                              transition: 'all 0.2s ease',
                              flexShrink: 0,
                              marginTop: '2px'
                            }}
                          >
                            {(selectedInterventions[intervention.key] || intervention.checked) && (
                              <span style={{ 
                                color: 'white', 
                                fontSize: '10px', 
                                fontWeight: 'bold',
                                fontFamily: "'Arquitecta', sans-serif"
                              }}>
                                ✓
                              </span>
                            )}
                          </div>
                          
                          <label 
                            onClick={() => handleInterventionChange(intervention.key)}
                            style={{
                              fontSize: isMobile ? '13px' : '14px',
                              fontFamily: "'Arquitecta', sans-serif",
                              fontWeight: '300',
                              color: '#ffffff',
                              cursor: 'pointer',
                              userSelect: 'none',
                              lineHeight: '1.4',
                              flex: 1,
                              textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                            }}
                          >
                            {intervention.label}
                          </label>
                        </div>
                      ))}
                    </div>
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
                  padding: isMobile ? '14px 40px' : '16px 48px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '900',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  boxShadow: '0 8px 24px rgba(50, 195, 226, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px) scale(1.02)';
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
    </div>
  );
};

export default InterventionSelection;
