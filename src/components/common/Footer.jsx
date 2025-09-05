import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(to top right, rgb(66, 86, 103) 0%, rgb(80, 110, 130) 50%, rgb(100, 140, 160) 100%)',
      padding: window.innerWidth <= 768 ? '16px 20px' : '16px 60px',
      display: 'flex',
      flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center',
      borderTop: '1px solid rgba(50, 195, 226, 0.3)',
      position: 'relative',
      overflow: 'hidden',
      gap: window.innerWidth <= 768 ? '16px' : '0'
    }}>
      {/* Subtle overlay for extra depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(to top right, rgba(50, 195, 226, 0.2) 0%, rgba(50, 195, 226, 0.1) 30%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      {/* Left Side - Logo and Copyright */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          width: '20px',
          height: '20px',
          backgroundColor: 'rgb(50, 195, 226)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(50, 195, 226, 0.3)'
        }}>
          <span style={{ 
            color: 'white', 
            fontSize: '10px',
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: '900'
          }}>C</span>
        </div>
        <span style={{ 
          color: '#ffffff',
          fontSize: window.innerWidth <= 768 ? '11px' : '12px',
          fontFamily: "'Arquitecta', sans-serif",
          fontWeight: '300',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }}>
          CarbonBalance © 2025 · All rights reserved
        </span>
      </div>

      {/* Right Side Container */}
      <div style={{
        display: 'flex',
        alignItems: window.innerWidth <= 768 ? 'flex-start' : 'center',
        flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
        gap: window.innerWidth <= 768 ? '16px' : '60px',
        position: 'relative',
        zIndex: 1,
        width: window.innerWidth <= 768 ? '100%' : 'auto'
      }}>
        {/* ABOUT and CONTACT sections */}
        <div style={{
          display: 'flex',
          gap: window.innerWidth <= 768 ? '24px' : '40px',
          alignItems: 'flex-start',
          width: window.innerWidth <= 768 ? '100%' : 'auto'
        }}>
          {/* ABOUT Section */}
          <div>
            <div style={{ 
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900',
              marginBottom: '4px', 
              color: '#ffffff',
              fontSize: window.innerWidth <= 768 ? '11px' : '12px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}>
              ABOUT
            </div>
            <div style={{ 
              color: '#ffffff',
              fontSize: window.innerWidth <= 768 ? '10px' : '11px',
              lineHeight: '1.3',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '300',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ marginBottom: '1px' }}>
                <a 
                  href="https://costplangroup.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#ffffff', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'rgb(50, 195, 226)'}
                  onMouseOut={(e) => e.target.style.color = '#ffffff'}
                >
                  company
                </a>
              </div>
              <div style={{ marginBottom: '1px' }}>
                <a 
                  href="https://costplangroup.com/team/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#ffffff', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'rgb(50, 195, 226)'}
                  onMouseOut={(e) => e.target.style.color = '#ffffff'}
                >
                  our team
                </a>
              </div>
              <div>
                <a 
                  href="https://costplangroup.com/careers/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ 
                    color: '#ffffff', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.color = 'rgb(50, 195, 226)'}
                  onMouseOut={(e) => e.target.style.color = '#ffffff'}
                >
                  careers
                </a>
              </div>
            </div>
          </div>

          {/* CONTACT Section */}
          <div>
            <div style={{ 
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900',
              marginBottom: '4px', 
              color: '#ffffff',
              fontSize: window.innerWidth <= 768 ? '11px' : '12px',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}>
              CONTACT
            </div>
            <div style={{ 
              color: '#ffffff',
              fontSize: window.innerWidth <= 768 ? '10px' : '11px',
              lineHeight: '1.3',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '300',
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ 
                marginBottom: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '3px'
              }}>
                <span style={{ color: 'rgb(50, 195, 226)', fontSize: '10px' }}>✉</span>
                aus@costplangroup.com
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '3px',
                lineHeight: '1.2'
              }}>
                <span style={{ color: 'rgb(50, 195, 226)', fontSize: '10px', marginTop: '1px' }}>📍</span>
                <div style={{ fontSize: window.innerWidth <= 768 ? '9px' : '10px' }}>
                  Level 4, 79 Adelaide Street,<br />
                  Brisbane City, QLD 4000
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Icons - Brand Colors */}
        <div style={{
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
          alignSelf: window.innerWidth <= 768 ? 'flex-start' : 'auto'
        }}>
          {[
            { icon: 'f', link: '#' },
            { icon: 'in', link: 'https://www.linkedin.com/company/costplan' }
          ].map((item, index) => (
            <a 
              key={index}
              href={item.link}
              target={item.link !== '#' ? '_blank' : '_self'}
              rel={item.link !== '#' ? 'noopener noreferrer' : undefined}
              style={{
                width: '24px',
                height: '24px',
                backgroundColor: 'rgb(50, 195, 226)',
                borderRadius: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                textDecoration: 'none'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <span style={{ 
                color: 'white', 
                fontSize: '14px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '900'
              }}>{item.icon}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;