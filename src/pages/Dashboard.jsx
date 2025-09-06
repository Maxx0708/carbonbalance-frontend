import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api'; // make sure this path matches your project

const Dashboard = () => {
  const isMobile = window.innerWidth <= 768;
  const navigate = useNavigate();
  // however you store auth; adjust as needed
  const userObj = JSON.parse(localStorage.getItem('user') || '{}');
  const userId = userObj?.id ?? userObj?.user_id ?? null;



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

      {/* Subtle overlay for depth */}
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
        flexDirection: 'column',
        position: 'relative',
        zIndex: 1
      }}>

        {/* Hero Text Section */}
        <div style={{
          position: 'absolute',
          top: isMobile ? '30px' : '80px',
          left: isMobile ? '20px' : '60px',
          maxWidth: isMobile ? '300px' : '450px',
          zIndex: 3
        }}>
          <h1 style={{
            fontSize: isMobile ? '24px' : '48px',
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: '300',
            color: '#ffffff',
            marginBottom: isMobile ? '12px' : '20px',
            lineHeight: '1.2',
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(50, 195, 226, 0.9) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Where Innovation Meets Sustainability in Construction
          </h1>

          <p style={{
            fontSize: isMobile ? '13px' : '16px',
            color: '#ffffff',
            lineHeight: '1.6',
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: '300',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            maxWidth: isMobile ? '280px' : '380px'
          }}>
            We combine data-driven strategies and proven construction practices to lower emissions without compromising quality.
          </p>
        </div>

        {/* Project Canvas - Centered in layout */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2
        }}>

          {/* Project Canvas Card */}
          <div style={{
            width: isMobile ? '90vw' : '420px',
            maxWidth: '420px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '24px',
            padding: isMobile ? '32px 24px' : '48px 40px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(50, 195, 226, 0.1)',
            backdropFilter: 'blur(30px)',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
            transition: 'all 0.4s ease'
          }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-8px) scale(1.02)';
              e.target.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.2), 0 12px 40px rgba(50, 195, 226, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0) scale(1)';
              e.target.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(50, 195, 226, 0.1)';
            }}
          >

            {/* Animated background gradient */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'conic-gradient(from 0deg, rgba(50, 195, 226, 0.1) 0deg, rgba(255, 127, 0, 0.1) 120deg, rgba(50, 195, 226, 0.1) 240deg, rgba(255, 127, 0, 0.1) 360deg)',
              borderRadius: '50%',
              animation: 'rotate 20s linear infinite',
              opacity: 0.3
            }} />

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              {/* Icons Section */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '28px',
                marginBottom: '36px'
              }}>
                {/* Green folder icon */}
                <div style={{
                  width: '42px',
                  height: '32px',
                  backgroundColor: 'rgba(76, 175, 80, 0.9)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(76, 175, 80, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1) rotate(5deg)';
                    e.target.style.boxShadow = '0 12px 32px rgba(76, 175, 80, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                    e.target.style.boxShadow = '0 8px 24px rgba(76, 175, 80, 0.3)';
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '16px',
                    backgroundColor: 'rgba(102, 187, 106, 0.9)',
                    borderRadius: '3px'
                  }} />
                </div>

                {/* Blue document icon */}
                <div style={{
                  width: '32px',
                  height: '42px',
                  backgroundColor: 'rgba(50, 195, 226, 0.9)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(50, 195, 226, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1) rotate(-5deg)';
                    e.target.style.boxShadow = '0 12px 32px rgba(50, 195, 226, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                    e.target.style.boxShadow = '0 8px 24px rgba(50, 195, 226, 0.3)';
                  }}
                >
                  <div style={{
                    width: '16px',
                    height: '20px',
                    backgroundColor: 'rgba(66, 195, 219, 0.9)',
                    borderRadius: '3px'
                  }} />
                </div>
              </div>

              {/* X pattern with glow effect */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '36px'
              }}>
                <div style={{
                  position: 'relative',
                  width: '90px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div style={{
                    position: 'absolute',
                    width: '60px',
                    height: '5px',
                    backgroundColor: 'rgba(50, 195, 226, 0.9)',
                    borderRadius: '3px',
                    transform: 'rotate(45deg)',
                    boxShadow: '0 0 20px rgba(50, 195, 226, 0.5)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '60px',
                    height: '5px',
                    backgroundColor: 'rgba(50, 195, 226, 0.9)',
                    borderRadius: '3px',
                    transform: 'rotate(-45deg)',
                    boxShadow: '0 0 20px rgba(50, 195, 226, 0.5)'
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'rgba(66, 86, 103, 0.9)',
                    borderRadius: '50%',
                    boxShadow: '0 4px 12px rgba(66, 86, 103, 0.4)'
                  }} />
                </div>
              </div>

              {/* Star and user icons */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '35px',
                marginBottom: '36px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  color: '#FFD700',
                  fontSize: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0 4px 12px rgba(255, 215, 0, 0.5))',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.2) rotate(18deg)';
                    e.target.style.filter = 'drop-shadow(0 6px 16px rgba(255, 215, 0, 0.7))';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1) rotate(0deg)';
                    e.target.style.filter = 'drop-shadow(0 4px 12px rgba(255, 215, 0, 0.5))';
                  }}
                >
                  ⭐
                </div>

                <div style={{
                  width: '28px',
                  height: '28px',
                  backgroundColor: 'rgba(66, 86, 103, 0.9)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 16px rgba(66, 86, 103, 0.4)',
                  transition: 'all 0.3s ease'
                }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.1)';
                    e.target.style.boxShadow = '0 8px 20px rgba(66, 86, 103, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 6px 16px rgba(66, 86, 103, 0.4)';
                  }}
                >
                  <span style={{
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: '900'
                  }}>👤</span>
                </div>
              </div>

              <h3 style={{
                fontSize: isMobile ? '22px' : '28px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '300',
                color: 'rgba(66, 86, 103, 0.9)',
                marginBottom: '12px',
                textShadow: '0 2px 8px rgba(255, 255, 255, 0.5)'
              }}>
                Your Project Canvas
              </h3>

              <p style={{
                fontSize: isMobile ? '15px' : '18px',
                color: 'rgba(66, 86, 103, 0.7)',
                marginBottom: '36px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '300'
              }}>
                Create something amazing
              </p>

              {/* Action Buttons */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '18px'
              }}>
                <Link
                  to="/create-project"
                  style={{
                    background: 'linear-gradient(135deg, rgb(50, 195, 226) 0%, rgb(40, 175, 206) 100%)',
                    color: 'white',
                    padding: isMobile ? '16px 24px' : '18px 28px',
                    borderRadius: '12px',
                    border: 'none',
                    fontSize: isMobile ? '15px' : '17px',
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: '500',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    transition: 'all 0.4s ease',
                    boxShadow: '0 8px 24px rgba(50, 195, 226, 0.4)',
                    letterSpacing: '0.5px',
                    position: 'relative',
                    overflow: 'hidden'
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
                  Generate New Project +
                </Link>

                <button style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.4)',
                  color: 'rgba(66, 86, 103, 0.9)',
                  padding: isMobile ? '16px 24px' : '18px 28px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                  fontSize: isMobile ? '15px' : '17px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '300',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  transition: 'all 0.4s ease',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
                  }}
                  onClick={async () => {
                    try {
                      if (!userId) {
                        alert('Please log in first.');
                        return navigate('/login');
                      }
                      const projects = await api.listProjectsByUser(userId);
                      // stash for later page implementation
                      localStorage.setItem('lastProjects', JSON.stringify(projects));
                      console.table(projects);
                      const names = projects.slice(0, 5).map(p => p.name || `Project #${p.id}`);
                      alert(
                        `Found ${projects.length} project(s).\n` +
                        (names.length ? `Recent:\n• ${names.join('\n• ')}` : 'No recent projects.')
                      );
                      // When your list page exists, swap this for:
                      // navigate('/projects', { state: { userId, projects } });
                    } catch (e) {
                      console.warn('Failed to load projects:', e);
                      alert('Could not load projects. Please try again.');
                    }
                  }}
                >
                  View Existing Project →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Positioned on the right within content */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            right: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            zIndex: 2
          }}>
            {[
              { number: '100+', label: 'Projects Created', color: 'rgb(50, 195, 226)' },
              { number: '50+', label: 'Happy Users', color: '#FF7F00' },
              { number: '24/7', label: 'Support Available', color: 'rgb(50, 195, 226)' }
            ].map((stat, index) => (
              <div key={index} style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '24px 28px',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(25px)',
                width: '180px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-5px) translateX(-5px) scale(1.05)';
                  e.target.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0) translateX(0) scale(1)';
                  e.target.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.15)';
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                }}>

                {/* Gradient accent */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}80 100%)`,
                  borderRadius: '16px 16px 0 0'
                }} />

                <div style={{
                  fontSize: '36px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '300',
                  color: stat.color,
                  marginBottom: '12px',
                  lineHeight: '1',
                  textShadow: `0 2px 8px ${stat.color}40`
                }}>
                  {stat.number}
                </div>
                <div style={{
                  fontSize: '15px',
                  color: 'rgba(66, 86, 103, 0.8)',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '300',
                  lineHeight: '1.4'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* CSS Animations */}
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Dashboard;