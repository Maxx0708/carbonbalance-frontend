// src/pages/ThemeRating.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api";

const ThemeRating = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get projectId (preferred from route state, else from localStorage)
  const params = new URLSearchParams(location.search);
  const qsProjectId = params.get("project_id");

  const projectId =
    location.state?.projectId ||
    qsProjectId ||
    window.localStorage.getItem("currentProjectId");

  useEffect(() => {
    if (projectId) window.localStorage.setItem("currentProjectId", projectId);
  }, [projectId]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // [{ id, name, raw_weight, normalized_weight }]
  const [themes, setThemes] = useState([]);

  // id -> slider value (0..100 by default)
  const [sliders, setSliders] = useState({});

  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  // Alternate brand colors (Blue / Orange …)
  const colorForIndex = (idx) =>
    idx % 2 === 0 ? "rgb(50, 195, 226)" : "#FF7F00";

  // Load themes + existing weights
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setError("");
        setLoading(true);

        // 1) list themes
        const themeList = await api.listThemes();

        // 2) fetch existing theme-scores (if we have a projectId)
        let existing = {};
        if (projectId) {
          const sResp = await api.getProjectThemeScores(projectId); // { project_id, themes: [...] }
          // sResp.themes: [{ id, name, raw_weight, normalized_weight }]
          for (const row of sResp?.themes ?? []) {
            existing[row.id] =
              row.raw_weight != null ? Number(row.raw_weight) : null;
          }
        }

        // Prepare slider defaults (use stored raw_weight or 50)
        const sliderInit = {};
        themeList.forEach((t) => {
          const preset =
            existing[t.id] != null ? Math.round(existing[t.id]) : 50;
          sliderInit[t.id] = preset;
        });

        if (!cancelled) {
          setThemes(themeList);
          setSliders(sliderInit);
        }
      } catch (e) {
        if (!cancelled) {
          setError("Failed to load themes. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  const handleSliderChange = (themeId, value) => {
    setSliders((prev) => ({ ...prev, [themeId]: parseInt(value, 10) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!projectId) {
      setError(
        "No project selected. Please create or open a project before saving theme ratings."
      );
      return;
    }

    try {
      setSaving(true);
      // Backend accepts { weights: { "<theme_id>": number } } and normalizes
      await api.saveProjectThemes(projectId, sliders);
      navigate("/intervention-selection", { state: { projectId } });
    } catch (e) {
      setError("Failed to save theme ratings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url('${process.env.PUBLIC_URL}/newdashbg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Subtle overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.05) 100%)",
          zIndex: 0,
        }}
      />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "20px 16px" : "40px 80px",
          position: "relative",
          zIndex: 1,
          paddingTop: isMobile ? "90px" : "120px",
        }}
      >
        <div
          style={{
            width: isMobile ? "100%" : "700px",
            maxWidth: "700px",
            backgroundColor: "rgba(66, 86, 103, 0.7)",
            borderRadius: "16px",
            padding: isMobile ? "24px 20px" : "28px 32px",
            boxShadow: "0 20px 60px rgba(66, 86, 103, 0.3)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              marginBottom: isMobile ? "20px" : "24px",
              textAlign: "center",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "22px" : "26px",
                fontFamily: "'Arquitecta', sans-serif",
                fontWeight: "900",
                color: "#ffffff",
                margin: 0,
                textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              Sustainability Themes
            </h2>
            {projectId && (
              <div
                style={{
                  marginTop: 6,
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 12,
                }}
              >
                Project #{projectId}
              </div>
            )}
          </div>

          {error && (
            <div
              style={{
                background: "rgba(255, 92, 92, 0.2)",
                border: "1px solid rgba(255, 92, 92, 0.5)",
                color: "#fff",
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 16,
                fontSize: 14,
              }}
            >
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ color: "#fff", textAlign: "center", padding: 24 }}>
              Loading themes…
            </div>
          ) : themes.length === 0 ? (
            <div style={{ color: "#fff", textAlign: "center", padding: 24 }}>
              No themes found.
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Table headers */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 250px",
                  gap: isMobile ? "16px" : "30px",
                  marginBottom: "20px",
                  paddingBottom: "12px",
                  borderBottom: "2px solid rgba(50, 195, 226, 0.5)",
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "14px" : "16px",
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: "900",
                    color: "#ffffff",
                    textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  Theme Name
                </div>
                {!isMobile && (
                  <div
                    style={{
                      fontSize: "16px",
                      fontFamily: "'Arquitecta', sans-serif",
                      fontWeight: "900",
                      color: "#ffffff",
                      textAlign: "center",
                      textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    Rating Bar
                  </div>
                )}
              </div>

              {/* Theme sliders */}
              <div style={{ marginBottom: "32px" }}>
                {themes.map((t, i) => {
                  const color = colorForIndex(i);
                  const val = sliders[t.id] ?? 50;
                  return (
                    <div
                      key={t.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "1fr 250px",
                        gap: isMobile ? "12px" : "30px",
                        alignItems: "center",
                        marginBottom: isMobile ? "16px" : "18px",
                        padding: isMobile ? "12px" : "14px",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "8px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? "13px" : "14px",
                          color: "#ffffff",
                          fontFamily: "'Arquitecta', sans-serif",
                          fontWeight: "300",
                          textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        {t.name}
                      </div>

                      <div
                        style={{
                          width: isMobile ? "100%" : "220px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: isMobile ? "flex-start" : "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: isMobile ? "160px" : "170px",
                            height: "8px",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              left: 0,
                              top: 0,
                              height: "100%",
                              width: `${val}%`,
                              background: color,
                              borderRadius: "4px",
                              transition: "width 0.1s ease-out",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: `${val}%`,
                              transform: "translate(-50%, -50%)",
                              width: "16px",
                              height: "16px",
                              backgroundColor: color,
                              borderRadius: "50%",
                              border: "2px solid white",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                              cursor: "pointer",
                              transition: "left 0.1s ease-out",
                              willChange: "left",
                            }}
                          />
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={val}
                            onChange={(e) =>
                              handleSliderChange(t.id, e.target.value)
                            }
                            style={{
                              position: "absolute",
                              top: "-4px",
                              left: 0,
                              width: "100%",
                              height: "16px",
                              background: "transparent",
                              outline: "none",
                              cursor: "pointer",
                              appearance: "none",
                              WebkitAppearance: "none",
                            }}
                          />
                        </div>
                        <span
                          style={{
                            fontSize: "12px",
                            fontFamily: "'Arquitecta', sans-serif",
                            fontWeight: "900",
                            color,
                            minWidth: "30px",
                            textAlign: "center",
                          }}
                        >
                          {val}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div style={{ textAlign: "center" }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    background:
                      "linear-gradient(135deg, rgb(50, 195, 226) 0%, rgb(40, 175, 206) 100%)",
                    color: "white",
                    padding: isMobile ? "14px 40px" : "16px 48px",
                    borderRadius: "12px",
                    border: "none",
                    fontSize: "16px",
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: "900",
                    cursor: saving ? "not-allowed" : "pointer",
                    opacity: saving ? 0.8 : 1,
                    letterSpacing: "0.5px",
                    boxShadow: "0 8px 24px rgba(50, 195, 226, 0.4)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {saving ? "Saving…" : "SUBMIT"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <style>
        {`
          input[type="range"]::-webkit-slider-thumb { appearance: none; width: 0; height: 0; }
          input[type="range"]::-moz-range-thumb { border: none; background: transparent; width: 0; height: 0; }
        `}
      </style>
    </div>
  );
};

export default ThemeRating;
