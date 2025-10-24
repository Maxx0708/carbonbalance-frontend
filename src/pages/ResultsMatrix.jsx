import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsMatrix = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;
  
  // Sample intervention data for the matrix
  const interventions = ['Intv A', 'Intv B', 'Intv C', 'Intv D', 'Intv E', 'Intv F', 'Intv G', 'Intv H'];
  
  // Sample dependency data (✓ = dependent, — = self)
  const dependencies = {
    'Intv A': { 'Intv A': 'self', 'Intv B': 'dependent', 'Intv C': null, 'Intv D': null, 'Intv E': null, 'Intv F': null, 'Intv G': null, 'Intv H': null },
    'Intv B': { 'Intv A': null, 'Intv B': 'self', 'Intv C': 'dependent', 'Intv D': null, 'Intv E': null, 'Intv F': null, 'Intv G': null, 'Intv H': null },
    'Intv C': { 'Intv A': null, 'Intv B': null, 'Intv C': 'self', 'Intv D': 'dependent', 'Intv E': null, 'Intv F': null, 'Intv G': null, 'Intv H': null },
    'Intv D': { 'Intv A': null, 'Intv B': null, 'Intv C': null, 'Intv D': 'self', 'Intv E': null, 'Intv F': null, 'Intv G': null, 'Intv H': null }
  };

  const selectedInterventions = [
    'Install Solar Panels',
    'Low-flow water fixture'
  ];

  const handleDownloadReport = () => {
    alert('Report generation initiated. A PDF report will be available for download.');
  };

  const handleBackToProject = () => {
    navigate('/dashboard');
  };

  const getCellContent = (row, col) => {
    if (row === col) {
      return '—'; // Self
    }
    const dep = dependencies[row] && dependencies[row][col];
    if (dep === 'dependent') {
      return '✓';
    }
    return '';
  };


  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url('${process.env.PUBLIC_URL}/newdashbg.jpg')`,
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
        padding: isMobile ? '10px 16px' : '20px 40px', // Much reduced padding
        position: 'relative',
        zIndex: 1,
        paddingTop: isMobile ? '80px' : '90px' // Reduced top padding
      }}>
        
        {/* Main Content Card - Fixed height with internal scrolling */}
        <div style={{
          width: isMobile ? '100%' : '650px', // Back to better width
          maxWidth: '650px',
          height: isMobile ? 'calc(100vh - 180px)' : 'calc(100vh - 200px)', // Fixed height to fit viewport
          backgroundColor: 'rgba(66, 86, 103, 0.7)',
          borderRadius: '16px',
          padding: isMobile ? '20px 16px' : '24px 28px',
          boxShadow: '0 20px 60px rgba(66, 86, 103, 0.3)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden' // Prevent container from scrolling
        }}>
          
          {/* Header */}
          <h2 style={{ 
            fontSize: isMobile ? '20px' : '24px', // Back to readable size
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: '900',
            marginBottom: '20px',
            color: '#ffffff',
            textAlign: 'center',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
            flexShrink: 0 // Don't shrink header
          }}>
            Intervention Dependency Matrix
          </h2>

          {/* Scrollable Content Area */}
          <div style={{
            flex: 1,
            overflowY: 'auto', // Allow scrolling in this container
            overflowX: 'hidden',
            paddingRight: '8px', // Space for scrollbar
            marginRight: '-8px' // Offset padding
          }}>
            
            {/* Matrix Table */}
            <div style={{ 
              marginBottom: '20px',
              overflowX: 'auto'
            }}>
              <table style={{ 
                borderCollapse: 'collapse', 
                margin: '0 auto',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                overflow: 'hidden',
                width: '100%'
              }}>
                <thead>
                  <tr>
                    <th style={{ 
                      width: '80px',
                      padding: '8px',
                      backgroundColor: 'rgba(50, 195, 226, 0.2)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      position: 'sticky',
                      top: 0,
                      zIndex: 1
                    }}></th>
                    {interventions.map((intv, index) => (
                      <th key={index} style={{
                        width: '40px',
                        padding: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#ffffff',
                        textAlign: 'center',
                        backgroundColor: 'rgba(50, 195, 226, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontFamily: "'Arquitecta', sans-serif",
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1
                      }}>
                        {intv}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {interventions.map((rowIntv, rowIndex) => ( // Show all interventions now
                    <tr key={rowIndex}>
                      <td style={{
                        padding: '8px',
                        fontSize: '11px',
                        fontWeight: '600',
                        color: '#ffffff',
                        textAlign: 'right',
                        backgroundColor: 'rgba(50, 195, 226, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        fontFamily: "'Arquitecta', sans-serif",
                        position: 'sticky',
                        left: 0,
                        zIndex: 1
                      }}>
                        {rowIntv}
                      </td>
                      {interventions.map((colIntv, colIndex) => (
                        <td key={colIndex} style={{
                          width: '40px',
                          height: '40px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          textAlign: 'center',
                          verticalAlign: 'middle',
                          fontSize: '14px',
                          fontWeight: 'bold',
                          backgroundColor: getCellContent(rowIntv, colIntv) === '—' ? 'rgba(255, 255, 255, 0.1)' : getCellContent(rowIntv, colIntv) === '✓' ? 'rgba(76, 175, 80, 0.2)' : 'transparent',
                          color: getCellContent(rowIntv, colIntv) === '✓' ? '#4CAF50' : '#ffffff',
                          fontFamily: "'Arquitecta', sans-serif"
                        }}>
                          {getCellContent(rowIntv, colIntv)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div style={{
              display: 'flex',
              gap: '24px',
              marginBottom: '20px',
              fontSize: '14px',
              color: '#ffffff',
              justifyContent: 'center',
              fontFamily: "'Arquitecta', sans-serif"
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  color: '#4CAF50', 
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>✓</span>
                <span>Dependent</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}>—</span>
                <span>Self</span>
              </div>
            </div>

            {/* Selected Interventions Summary */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#ffffff',
                fontFamily: "'Arquitecta', sans-serif",
                textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
              }}>
                Selected Intervention
              </h3>
              
              <div style={{ fontSize: '14px', color: '#ffffff', lineHeight: '1.6' }}>
                {selectedInterventions.map((intervention, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: index < selectedInterventions.length - 1 ? '8px' : '0',
                    fontFamily: "'Arquitecta', sans-serif",
                    textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)'
                  }}>
                    <span style={{ color: 'rgb(50, 195, 226)', fontWeight: 'bold' }}>→</span>
                    <span>{intervention}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            flexShrink: 0, // Don't shrink buttons
            marginTop: 'auto' // Push to bottom
          }}>
            <button
              onClick={handleDownloadReport}
              style={{
                background: 'linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)',
                color: 'white',
                padding: isMobile ? '12px 20px' : '14px 28px',
                borderRadius: '8px',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: '140px',
                fontFamily: "'Arquitecta', sans-serif",
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 16px rgba(76, 175, 80, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.3)';
              }}
            >
              DOWNLOAD REPORT
            </button>
            
            <button
              onClick={handleBackToProject}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                padding: isMobile ? '12px 20px' : '14px 28px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                minWidth: '140px',
                fontFamily: "'Arquitecta', sans-serif",
                letterSpacing: '0.5px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              BACK TO PROJECT
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsMatrix;
