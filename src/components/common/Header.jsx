import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  console.log('Header component called, current path:', location.pathname);
  
  // Don't render header on login or admin pages (case insensitive)
  const currentPath = location.pathname.toLowerCase();
  if (currentPath === '/login' || currentPath === '/admin') {
    console.log('Login/Admin page detected - hiding header');
    return null;
  }

  console.log('Regular page - showing header');
  
  return (
    <header style={{ 
      backgroundColor: 'rgb(66, 86, 103)', // Brand Grey background
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(101, 201, 148, 0.3)', // Brand Blue border
      position: 'relative',
      zIndex: 1000
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 40px',
        display: 'flex',
        justifyContent: 'flex-start', // Align everything to the left
        alignItems: 'center',
        height: '70px',
        gap: '80px' // Space between logo and navigation
      }}>
        
        {/* Left Side - Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            to="/dashboard" 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'rgb(50, 195, 226)', // Brand Blue
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ 
                color: 'white', 
                fontSize: '18px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '900'
              }}>C</span>
            </div>
            <span style={{ 
              color: '#ffffff', // White text on grey background
              fontSize: '22px', 
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900' // Arquitecta Black for logo
            }}>
              CarbonBalance
            </span>
          </Link>
        </div>

        {/* Navigation - Now positioned next to logo */}
        <nav style={{ 
          display: 'flex', 
          gap: '60px',
          alignItems: 'center'
        }}>
          <Link 
            to="/dashboard" 
            style={{ 
              color: '#ffffff', // White text on grey background
              textDecoration: 'none',
              fontSize: '18px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '300', // Arquitecta Light for navigation
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'rgb(50, 195, 226)'} // Brand Blue on hover
            onMouseOut={(e) => e.target.style.color = '#ffffff'}
          >
            home
          </Link>
          <a 
            href="/services" 
            style={{ 
              color: '#ffffff', // White text on grey background
              textDecoration: 'none',
              fontSize: '18px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '300', // Arquitecta Light for navigation
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'rgb(50, 195, 226)'} // Brand Blue on hover
            onMouseOut={(e) => e.target.style.color = '#ffffff'}
          >
            services
          </a>
          <a 
            href="https://costplangroup.com/our-blogs/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#ffffff', // White text on grey background
              textDecoration: 'none',
              fontSize: '18px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '300', // Arquitecta Light for navigation
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'rgb(50, 195, 226)'} // Brand Blue on hover
            onMouseOut={(e) => e.target.style.color = '#ffffff'}
          >
            blogs
          </a>
          <a 
            href="https://costplangroup.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: '#ffffff', // White text on grey background
              textDecoration: 'none',
              fontSize: '18px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '300', // Arquitecta Light for navigation
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = 'rgb(50, 195, 226)'} // Brand Blue on hover
            onMouseOut={(e) => e.target.style.color = '#ffffff'}
          >
            about us
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;