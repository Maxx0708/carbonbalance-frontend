import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api";

const InterventionSelection = () => {
  const navigate = useNavigate();
  const { state, search } = useLocation();
  const params = new URLSearchParams(search);
  const qsProjectId = params.get("project_id");

  const projectId =
    state?.projectId ||
    qsProjectId ||
    window.localStorage.getItem("currentProjectId") ||
    null;

  useEffect(() => {
    if (projectId) window.localStorage.setItem("currentProjectId", projectId);
  }, [projectId]);

  const [recs, setRecs] = useState([]);                
  const [selectedId, setSelectedId] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [themeToggle, setThemeToggle] = useState(true);
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      setLoadError("Missing projectId.");
      return;
    }
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const res = await api.getRecommendations(projectId);
        const list = Array.isArray(res?.recommendations) ? res.recommendations
                    : Array.isArray(res) ? res
                    : [];


        list.sort((a, b) => (parseFloat(b.adjusted_base_effectiveness) || 0) - (parseFloat(a.adjusted_base_effectiveness) || 0));

        if (!cancelled) {
          setRecs(list);
          setSelectedId(list.length ? list[0].intervention_id : null); 
        }
      } catch (err) {
        if (!cancelled) setLoadError(err?.message || "Failed to load recommendations.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [projectId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedId) {
      alert("Please choose an intervention.");
      return;
    }
    const chosen = recs.find(r => r.intervention_id === selectedId) || null;

    navigate("/results", {
      state: {
        projectId,
        selectedId, 
        selectedItem: chosen, 
      },
    });
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
        <div style={{ color: "#fff", fontFamily: "'Arquitecta', sans-serif" }}>
          Loading recommendations…
        </div>
      </div>
    );
  }

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
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.05) 100%)',
        zIndex: 0
      }} />

      <main style={{
        flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: isMobile ? '20px 16px' : '40px 80px',
        position: 'relative', zIndex: 1,
        paddingTop: isMobile ? '90px' : '120px'
      }}>
        <div style={{
          width: isMobile ? '100%' : '700px', maxWidth: '700px',
          backgroundColor: 'rgba(66, 86, 103, 0.7)',
          borderRadius: '16px',
          padding: isMobile ? '24px 20px' : '28px 32px',
          boxShadow: '0 20px 60px rgba(66, 86, 103, 0.3)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.2)',
          margin: '0 auto'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? '20px' : '24px' }}>
            <h2 style={{
              fontSize: isMobile ? '22px' : '26px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900', color: '#ffffff', margin: 0,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              Choose a Recommended Intervention
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  onClick={() => setThemeToggle(!themeToggle)}
                  title="UI accent toggle (visual only)"
                  style={{
                    width: '48px', height: '24px',
                    backgroundColor: themeToggle ? '#FF7F00' : '#ccc',
                    borderRadius: '12px', position: 'relative', cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                >
                  <div style={{
                    width: '20px', height: '20px', backgroundColor: 'white', borderRadius: '50%',
                    position: 'absolute', top: '2px', left: themeToggle ? '26px' : '2px',
                    transition: 'left 0.3s ease', boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                  }} />
                </div>
              </div>
              <div title="Need help?" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: '24px', height: '24px', backgroundColor: 'rgb(50, 195, 226)',
                borderRadius: '50%', color: 'white', fontSize: '14px',
                fontFamily: "'Arquitecta', sans-serif", fontWeight: '900', cursor: 'help'
              }}>?</div>
            </div>
          </div>

          {/* Errors / empty state */}
          {loadError && (
            <div style={{ color: "#ffdede", marginBottom: 12, fontFamily: "'Arquitecta', sans-serif" }}>
              {loadError}
            </div>
          )}
          {(!recs || recs.length === 0) && !loadError && (
            <div style={{ color: "#fff", marginBottom: 24, fontFamily: "'Arquitecta', sans-serif" }}>
              No recommendations available.
            </div>
          )}

          {/* List (single-select radio) */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "8px", color: "#fff", fontFamily: "'Arquitecta', sans-serif", opacity: 0.9 }}>
              {recs?.length || 0} recommendation{(recs?.length || 0) === 1 ? "" : "s"}:
            </div>

            <div style={{ marginBottom: "24px" }}>
              {recs.map((r, idx) => {
                const id = r.intervention_id;
                const checked = selectedId === id;
                const score = r.adjusted_base_effectiveness;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginBottom: idx < recs.length - 1 ? "12px" : 0,
                      padding: "10px 12px",
                      backgroundColor: "rgba(255,255,255,0.08)",
                      borderRadius: 8,
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onClick={() => setSelectedId(id)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                  >
                    {/* Radio */}
                    <div
                      style={{
                        width: 18, height: 18, borderRadius: "50%",
                        border: "2px solid rgb(50,195,226)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        flexShrink: 0, marginTop: 2,
                      }}
                    >
                      <div
                        style={{
                          width: 10, height: 10, borderRadius: "50%",
                          background: checked ? "rgb(50,195,226)" : "transparent",
                          transition: "background 0.2s ease",
                        }}
                      />
                    </div>

                    {/* Label + score */}
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          color: "#fff",
                          fontFamily: "'Arquitecta', sans-serif",
                          fontSize: isMobile ? 13 : 14,
                          lineHeight: 1.4,
                        }}
                      >
                        {r.name || `Intervention #${id}`}
                      </div>
                      {score != null && (
                        <div
                          style={{
                            color: "rgba(255,255,255,0.85)",
                            fontFamily: "'Arquitecta', sans-serif",
                            fontSize: 12,
                            marginTop: 2,
                          }}
                        >
                          Score: {score}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Submit */}
            <div style={{ textAlign: "center" }}>
              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, rgb(50,195,226) 0%, rgb(40,175,206) 100%)",
                  color: "white",
                  padding: isMobile ? "14px 40px" : "16px 48px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "16px",
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: "900",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 24px rgba(50, 195, 226, 0.4)",
                  transition: "all 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(50,195,226,0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(50,195,226,0.4)";
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
