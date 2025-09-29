// src/pages/ViewExistingProjects.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api'; // <<< use the centralized API

const ViewExistingProjects = () => {
  const navigate = useNavigate();
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : true;

  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  // simple UI state
  const [sortBy, setSortBy]     = useState('updated_at'); // 'name' | 'updated_at' | 'location'
  const [filterBy, setFilterBy] = useState('');

  // Fetch projects for the logged-in user (uses token + user from api.js)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const list = await api.listMyProjects();
        if (!alive) return;
        setProjects(Array.isArray(list) ? list : []);
        setError(null);
      } catch (e) {
        if (!alive) return;
        setError('Failed to load projects.');
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const handleProjectClick = (project) => {
    // TODO: point this wherever your “open project” flow lives:
    // navigate(`/projects/${project.id}`);
    // or e.g. navigate(`/theme-rating?projectId=${project.id}`);
    navigate(`/projects/${project.id}`);
  };

  const handleGenerateNewProject = () => {
    navigate('/create-project');
  };

  const getBuildingTypeStyle = (buildingType) => ({
    padding: isMobile ? '6px 12px' : '8px 16px',
    borderRadius: '20px',
    fontSize: isMobile ? '12px' : '14px',
    fontFamily: "'Arquitecta', sans-serif",
    fontWeight: '300',
    color: 'white',
    backgroundColor: buildingType === 'Office' ? 'rgba(180, 170, 160, 0.9)' : 'rgb(66, 86, 103)',
    border: 'none',
    textAlign: 'center',
    minWidth: isMobile ? '60px' : '80px'
  });

  // Normalize + filter + sort; show only first 6
  const visible = useMemo(() => {
    const norm = (projects || []).map(p => ({
      ...p,
      name: p.name ?? 'Untitled',
      location: p.location ?? '—',
      buildingType: p.buildingType ?? p.building_type ?? '—',
    }));
    const filtered = filterBy
      ? norm.filter(p => {
          const q = filterBy.toLowerCase();
          return (p.name?.toLowerCase().includes(q)) || (p.location?.toLowerCase().includes(q));
        })
      : norm;
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'location') return a.location.localeCompare(b.location);
      const ad = a.updated_at ? new Date(a.updated_at).getTime() : 0;
      const bd = b.updated_at ? new Date(b.updated_at).getTime() : 0;
      return bd - ad || (b.id - a.id);
    });
    return sorted.slice(0, 6);
  }, [projects, filterBy, sortBy, isMobile]);

  return (
    <div style={{
      height: '100vh',
      backgroundImage: `url('${process.env.PUBLIC_URL}/dashboardbg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: isMobile ? '10px' : '20px'
    }}>
      <div style={{
        flex: 1,
        maxWidth: '1000px',
        margin: '0 auto',
        padding: isMobile ? '10px' : '20px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '12px',
          padding: isMobile ? '16px 12px' : '24px',
          boxShadow: '0 8px 32px rgba(66, 86, 103, 0.2)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(50, 195, 226, 0.2)',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'flex-start' : 'center',
            flexDirection: isMobile ? 'column' : 'row',
            marginBottom: isMobile ? '16px' : '20px',
            gap: isMobile ? '12px' : 0
          }}>
            <h1 style={{
              fontSize: isMobile ? '20px' : '24px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900',
              color: 'rgb(66, 86, 103)',
              margin: 0
            }}>
              View Existing Projects
            </h1>

            {/* Sort & Filter */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input
                placeholder="Filter by name or location"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                style={{ padding: '6px 10px', fontFamily: "'Arquitecta', sans-serif" }}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: '6px 10px', fontFamily: "'Arquitecta', sans-serif" }}
              >
                <option value="updated_at">Sort: Recently updated</option>
                <option value="name">Sort: Name (A–Z)</option>
                <option value="location">Sort: Location (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Loading / Error / Empty */}
          {loading && <div style={{ padding: 12, color: 'rgb(66, 86, 103)' }}>Loading...</div>}
          {!loading && error && <div style={{ padding: 12, color: '#b00020' }}>{error}</div>}
          {!loading && !error && visible.length === 0 && (
            <div style={{ padding: 12, color: 'rgb(66, 86, 103)' }}>
              No projects yet. Create your first one!
            </div>
          )}

          {/* Table header */}
          {!loading && !error && visible.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '2fr 1.5fr 1fr' : '2fr 2fr 1.5fr',
              gap: isMobile ? '8px' : '16px',
              padding: isMobile ? '8px' : '12px',
              borderBottom: '2px solid rgba(66, 86, 103, 0.1)',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: isMobile ? '12px' : '14px', fontFamily: "'Arquitecta', sans-serif", fontWeight: 900, color: 'rgb(66, 86, 103)' }}>Project Name</div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', fontFamily: "'Arquitecta', sans-serif", fontWeight: 900, color: 'rgb(66, 86, 103)' }}>Location</div>
              <div style={{ fontSize: isMobile ? '12px' : '14px', fontFamily: "'Arquitecta', sans-serif", fontWeight: 900, color: 'rgb(66, 86, 103)', textAlign: 'center' }}>Building Type</div>
            </div>
          )}

          {/* Rows */}
          {!loading && !error && visible.length > 0 && (
            <div style={{ flex: 1, overflow: 'hidden' }}>
              {visible.map((project) => (
                <div
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '2fr 1.5fr 1fr' : '2fr 2fr 1.5fr',
                    gap: isMobile ? '8px' : '16px',
                    padding: isMobile ? '8px' : '12px',
                    borderBottom: '1px solid rgba(66, 86, 103, 0.1)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    alignItems: 'center'
                  }}
                  onMouseOver={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = 'rgba(50, 195, 226, 0.05)';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <div style={{ fontSize: isMobile ? '12px' : '14px', fontFamily: "'Arquitecta', sans-serif", fontWeight: '300', color: 'rgb(66, 86, 103)' }}>
                    {project.name}
                  </div>
                  <div style={{ fontSize: isMobile ? '12px' : '14px', fontFamily: "'Arquitecta', sans-serif", fontWeight: '300', color: 'rgb(66, 86, 103)' }}>
                    {project.location ?? '—'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <span style={getBuildingTypeStyle(project.buildingType)}>
                      {project.buildingType}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{
            textAlign: 'center',
            paddingTop: isMobile ? '12px' : '16px',
            borderTop: '1px solid rgba(66, 86, 103, 0.1)',
            marginTop: 'auto'
          }}>
            <button
              onClick={handleGenerateNewProject}
              style={{
                backgroundColor: 'rgb(66, 86, 103)',
                color: 'white',
                padding: isMobile ? '10px 20px' : '12px 24px',
                borderRadius: '6px',
                border: 'none',
                fontSize: isMobile ? '12px' : '14px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '300',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                margin: '0 auto',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(66, 86, 103, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(50, 195, 226)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(50, 195, 226, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(66, 86, 103)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(66, 86, 103, 0.3)';
              }}
            >
              Generate New Project +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewExistingProjects;
