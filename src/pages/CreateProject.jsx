import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';

const CreateProject = () => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 768;

  const [formData, setFormData] = useState({
    project_name: '',
    project_type: '',
    location: '',
    building_type: '',
    levels: '',
    external_wall_area: '',
    footprint_area: '',
    opening_pct: '',
    wall_to_floor_ratio: '',
    footprint_gifa: '',
    gifa_total: '',
    external_openings_area: '',
    avg_height_per_level: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Build the base project payload
      const base = {
        name: (formData.project_name || '').trim(),
        project_type: formData.project_type || null,
        location: formData.location || 'Brisbane',
        building_type: formData.building_type || null,
      };

      // Collect numeric fields (only include those the user filled)
      const numericFields = [
        'levels',
        'external_wall_area',
        'footprint_area',
        'opening_pct',
        'wall_to_floor_ratio',
        'footprint_gifa',
        'gifa_total',
        'external_openings_area',
        'avg_height_per_level',
      ];
      const numeric = {};
      for (const f of numericFields) {
        const v = formData[f];
        if (v !== '' && v !== null && v !== undefined) {
          numeric[f] = Number(v);
        }
      }

      // 1) Create the project
      const project = await api.createProject({ ...base, ...numeric });
      const projectId = project.id;
      if (!projectId) throw new Error('Project create failed: no id returned');

      // 2) Send metrics (runs scoring pipeline)
      await api.sendBuildingMetrics(projectId, numeric);

      // 3) Navigate forward (keep your chosen destination)
      // after you get projectId
      localStorage.setItem("currentProjectId", String(projectId)); // optional fallback
      navigate("/theme-rating", { state: { projectId } });         // preferred route state

      // or: navigate('/interventions', { state: { projectId } });

    } catch (err) {
      console.error(err);
      alert(err.message || 'Failed to submit');
    }
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
      backgroundImage: `url('${process.env.PUBLIC_URL}/newdashbg.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>

      {/* Subtle overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(255, 255, 255, 0.05) 100%)',
        zIndex: 0
      }} />

      <main style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '20px 16px' : '40px 80px',
        position: 'relative',
        zIndex: 1,
        paddingTop: isMobile ? '90px' : '120px'
      }}>

        <div style={{
          width: isMobile ? '100%' : '800px',
          maxWidth: '800px',
          backgroundColor: 'rgba(66, 86, 103, 0.7)',
          borderRadius: '20px',
          padding: isMobile ? '32px 24px' : '40px 36px',
          boxShadow: '0 20px 60px rgba(66, 86, 103, 0.3)',
          backdropFilter: 'blur(30px)',
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
            {/* Basic Info */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: isMobile ? '14px' : '16px',
              marginBottom: isMobile ? '20px' : '22px'
            }}>

              {/* Project Name */}
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Project Name*:</label>
                <input
                  type="text"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Project Type*:</label>
                <select
                  name="project_type"
                  value={formData.project_type}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, appearance: 'none' }}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  style={inputStyle}
                  placeholder="Enter location"
                />
              </div>

              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Building Type:</label>
                <select
                  name="building_type"
                  value={formData.building_type}
                  onChange={handleInputChange}
                  style={{ ...inputStyle, appearance: 'none' }}
                >
                  <option value="">Select Building Type</option>
                  <option value="office">Office</option>
                  <option value="hotel">Hotel</option>
                  <option value="retail">Retail</option>
                  <option value="warehouse">Warehouse</option>
                </select>
              </div>
            </div>

            {/* Metrics */}
            <div style={{
              borderTop: '1px solid rgba(50, 195, 226, 0.3)',
              paddingTop: isMobile ? '16px' : '18px',
              marginBottom: '16px'
            }}>
              <h3 style={{
                fontSize: isMobile ? '16px' : '18px',
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: '900',
                margin: 0,
                color: '#ffffff',
                marginBottom: '12px'
              }}>
                📊 All Building Metrics
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: isMobile ? '12px' : '14px'
              }}>
                {[
                  { name: 'levels', label: 'Number of levels:' },
                  { name: 'external_wall_area', label: 'External wall area:' },
                  { name: 'footprint_area', label: 'Building footprint:' },
                  { name: 'opening_pct', label: 'Opening %:' },
                  { name: 'wall_to_floor_ratio', label: 'Wall floor ratio:' },
                  { name: 'footprint_gifa', label: 'Footprint GIFA:' },
                  { name: 'gifa_total', label: 'GIFA Total:' },
                  { name: 'external_openings_area', label: 'External openings:' },
                  { name: 'avg_height_per_level', label: 'Avg. height per level:' }
                ].map((field) => (
                  <div key={field.name} style={fieldContainerStyle}>
                    <label style={labelStyle}>{field.label}</label>
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      style={numberInputStyle}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, rgb(50, 195, 226) 0%, rgb(40, 175, 206) 100%)',
                  color: 'white',
                  padding: '14px 36px',
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '16px',
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: '900',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(50, 195, 226, 0.4)',
                  transition: 'all 0.3s ease'
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

export default CreateProject;
