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
  const [selectedId, setSelectedId] = useState(null); // single choice
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [themeToggle, setThemeToggle] = useState(true);
  const isMobile = typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  const shapeToList = (data) => {
    const arr = Array.isArray(data?.recommendations) ? data.recommendations
              : Array.isArray(data) ? data
              : [];
    arr.sort(
      (a, b) =>
        (parseFloat(b.theme_weighted_effectiveness) || 0) -
        (parseFloat(a.theme_weighted_effectiveness) || 0)
    );
    return arr;
  };

  const loadRecs = useCallback(async () => {
    if (!projectId) {
      setError("Missing projectId.");
      setRecs([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    setStatus("");
    try {
      const data = await api.getRecommendations(projectId);
      const list = shapeToList(data);
      setRecs(list);
      setSelectedId(list.length ? list[0].intervention_id : null);
    } catch (err) {
      setError(err?.message || "Failed to load recommendations.");
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
    return () => { cancelled = true; };
  }, [loadRecs]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedId) return;
    setApplying(true);
    setStatus("");
    setError("");

    try {
      // Use BATCH endpoint with a single id – returns next_recommendations
      const resp = await api.applyInterventionsBatch(projectId, [selectedId]);

      if (resp?.applied_count > 0) {
        const next = shapeToList({ recommendations: resp.next_recommendations || [] });
        setRecs(next);
        setSelectedId(next.length ? next[0].intervention_id : null);
        setStatus(next.length ? "Applied. Showing next best 3…" : "Applied. No more recommendations.");
        if (!next.length) {
          navigate("/results", { state: { projectId } });
        }
      } else {
        setError("Nothing was applied. Please try another option.");
      }
    } catch (err) {
      setError(err?.message || "Failed to apply intervention.");
    } finally {
      setApplying(false);
    }
  };

  const handleStop = () => navigate("/results", { state: { projectId } });

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

          {/* Messages */}
          {error && (
            <div style={{
              background: "rgba(255, 92, 92, 0.2)",
              border: "1px solid rgba(255, 92, 92, 0.5)",
              color: "#fff",
              padding: "10px 12px",
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 14,
              fontFamily: "'Arquitecta', sans-serif",
            }}>
              {error}
            </div>
          )}
          {status && (
            <div style={{
              background: "rgba(50,195,226,0.18)",
              border: "1px solid rgba(50,195,226,0.45)",
              color: "#fff",
              padding: "8px 10px",
              borderRadius: 8,
              marginBottom: 12,
              fontSize: 13,
              fontFamily: "'Arquitecta', sans-serif",
            }}>
              {status}
            </div>
          )}
          {(!recs || recs.length === 0) && !error && (
            <div style={{ color: "#fff", marginBottom: 24, fontFamily: "'Arquitecta', sans-serif" }}>
              No more recommendations available. Click “Stop & View Report” to see your selections.
            </div>
          )}

          <form onSubmit={handleApply}>
            <div style={{ marginBottom: "8px", color: "#fff", fontFamily: "'Arquitecta', sans-serif", opacity: 0.9 }}>
              {(recs?.length || 0)} recommendation{(recs?.length || 0) === 1 ? "" : "s"} this round:
            </div>

            <div style={{ marginBottom: "24px" }}>
              {recs.map((r, idx) => {
                const id = r.intervention_id;
                const checked = selectedId === id;
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
                          Score: {Number.isFinite(+score) ? (+score).toFixed(2) : score}
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
                disabled={applying || recs.length === 0 || !selectedId}
                style={{
                  background: "linear-gradient(135deg, rgb(50,195,226) 0%, rgb(40,175,206) 100%)",
                  color: "white",
                  padding: isMobile ? "14px 40px" : "16px 48px",
                  borderRadius: "12px",
                  border: "none",
                  fontSize: "16px",
                  fontFamily: "'Arquitecta', sans-serif",
                  fontWeight: "900",
                  cursor: (applying || recs.length === 0 || !selectedId) ? "not-allowed" : "pointer",
                  opacity: applying ? 0.8 : 1,
                  letterSpacing: "0.5px",
                  boxShadow: "0 8px 24px rgba(50,195,226,0.4)",
                  transition: "all 0.3s ease",
                }}
                title={
                  recs.length === 0 ? "No more interventions available" :
                  !selectedId ? "Select one intervention" :
                  "Apply selected intervention"
                }
              >
                {applying ? "Applying…" : "Apply Selected"}
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
