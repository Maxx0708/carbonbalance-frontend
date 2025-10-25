// src/pages/InterventionSelection.jsx
import React, { useEffect, useState, useCallback } from "react";
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
  const [selected, setSelected] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [applying, setApplying] = useState(false);
  const [themeToggle, setThemeToggle] = useState(true);
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  const shapeToList = (data) => {
    const arr = Array.isArray(data?.recommendations) ? data.recommendations
              : Array.isArray(data) ? data
              : [];
    //  FIXED: Sort by theme_weighted_effectiveness (what backend actually returns)
    arr.sort(
      (a, b) =>
        (parseFloat(b.theme_weighted_effectiveness) || 0) -
        (parseFloat(a.theme_weighted_effectiveness) || 0)
    );
    return arr;
  };

  const loadRecs = useCallback(async () => {
    if (!projectId) {
      setLoadError("Missing projectId.");
      setRecs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setLoadError(null);
    try {
      const data = await api.getRecommendations(projectId);
      const list = shapeToList(data);
      setRecs(list);
      setSelected(new Set());
    } catch (err) {
      setLoadError(err?.message || "Failed to load recommendations.");
      setRecs([]);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await loadRecs();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [loadRecs]);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (selected.size === 0) {
      alert("Please select at least one intervention.");
      return;
    }
    try {
      setApplying(true);
      const ids = Array.from(selected);
      const response = await api.applyInterventionsBatch(projectId, ids);

      //  Use next_recommendations from backend response
      if (response.next_recommendations) {
        setRecs(shapeToList({ recommendations: response.next_recommendations }));
        setSelected(new Set());

        if (response.applied_count > 0) {
          alert(`Successfully applied ${response.applied_count} intervention${response.applied_count > 1 ? 's' : ''}!`);
        }

        //  Auto-redirect if no more recommendations
        if (!response.has_more || response.next_recommendations.length === 0) {
          setTimeout(() => {
            alert("All interventions applied! Redirecting to report...");
            navigate("/results", { state: { projectId } });
          }, 1000);
        }
      } else {
        // Fallback: manually reload if backend didn't return next_recommendations
        await loadRecs();
      }
    } catch (err) {
      alert(`Failed to apply interventions: ${err?.message || err}`);
    } finally {
      setApplying(false);
    }
  };

  const handleStop = () => {
    navigate("/results", { state: { projectId } });
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isMobile ? '20px' : '24px' }}>
            <h2 style={{
              fontSize: isMobile ? '22px' : '26px',
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: '900', color: '#ffffff', margin: 0,
              textShadow: '0 2px 8px rgba(0,0,0,0.5)'
            }}>
              Recommended Interventions
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

          {loadError && (
            <div style={{ color: "#ffdede", marginBottom: 12, fontFamily: "'Arquitecta', sans-serif" }}>
              {loadError}
            </div>
          )}
          {(!recs || recs.length === 0) && !loadError && (
            <div style={{ color: "#fff", marginBottom: 24, fontFamily: "'Arquitecta', sans-serif" }}>
              No more recommendations available. Click "Stop & View Report" to see your selections.
            </div>
          )}

          <form onSubmit={handleApply}>
            <div style={{ marginBottom: "8px", color: "#fff", fontFamily: "'Arquitecta', sans-serif", opacity: 0.9 }}>
              {(recs?.length || 0)} recommendation{(recs?.length || 0) === 1 ? "" : "s"} this round:
            </div>

            <div style={{ marginBottom: "24px" }}>
              {recs.map((r, idx) => {
                const id = r.intervention_id;
                const checked = selected.has(id);
                //  FIXED: Use theme_weighted_effectiveness
                const score = r.theme_weighted_effectiveness;
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
                    onClick={() => toggleSelect(id)}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)")}
                  >
                    <div
                      style={{
                        width: 18, height: 18,
                        borderRadius: 4,
                        border: "2px solid rgb(50,195,226)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 2,
                        background: checked ? "rgb(50,195,226)" : "transparent",
                        transition: "background 0.2s ease",
                      }}
                    >
                      {checked && (
                        <span style={{ color: "#fff", fontSize: 11, fontWeight: 700 }}>✓</span>
                      )}
                    </div>

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
                          {/*  FIXED: Handle number formatting safely */}
                          Score: {typeof score === 'number' ? score.toFixed(2) : score}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                type="submit"
                disabled={applying || recs.length === 0 || selected.size === 0}
                style={{
                  background: "linear-gradient(135deg, rgb(50,195,226) 0%, rgb(40,175,206) 100%)",
                  color: "white",
                  padding: isMobile ? "14px 28px" : "16px 36px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "16px",
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: "900",
                  cursor: (applying || recs.length === 0 || selected.size === 0) ? "not-allowed" : "pointer",
                  opacity: applying ? 0.8 : 1,
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 24px rgba(50,195,226,0.4)",
                  transition: "all 0.3s ease",
                }}
                title={
                  recs.length === 0 ? "No more interventions available" :
                  selected.size === 0 ? "Select at least one intervention" :
                  "Apply selected interventions"
                }
              >
                {applying ? "Applying…" : `Apply Selected ${selected.size > 0 ? `(${selected.size})` : ''}`}
              </button>

              <button
                type="button"
                onClick={handleStop}
                style={{
                  background: "#ffffff1a",
                  color: "white",
                  padding: isMobile ? "14px 28px" : "16px 36px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.4)",
                  fontSize: "16px",
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: "900",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  transition: "all 0.3s ease",
                }}
              >
                Stop & View Report
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default InterventionSelection;