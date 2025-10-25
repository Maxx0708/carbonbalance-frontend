// src/pages/ResultMatrix.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api";

const ResultsMatrix = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Prefer router state; fallback to localStorage
  const projectId =
    location.state?.projectId ||
    window.localStorage.getItem("currentProjectId") ||
    null;

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [items, setItems] = useState([]); // [{intervention_id, name, score}]
  const isMobile = useMemo(() => window.innerWidth <= 768, []);

  // Build base URL for server-rendered assets
  const API_BASE = process.env.REACT_APP_API_BASE || "/api";
  const graphSrc = projectId ? `${API_BASE}/projects/${projectId}/graph.svg` : "";
  const htmlHref = projectId ? `${API_BASE}/projects/${projectId}/report.html` : "#";
  const pdfHref  = projectId ? `${API_BASE}/projects/${projectId}/report.pdf`  : "#";

  // Normalize any backend response shape into a clean array
  const normalizeImplemented = (resp) => {
    // resp may be:
    //  - an array
    //  - { implemented_interventions: [...] }
    //  - { interventions: [...] }
    const arr = Array.isArray(resp)
      ? resp
      : Array.isArray(resp?.implemented_interventions)
      ? resp.implemented_interventions
      : Array.isArray(resp?.interventions)
      ? resp.interventions
      : [];

    // Make sure score is a number (or null)
    return arr.map((x) => ({
      intervention_id: x.intervention_id,
      name: x.name,
      score:
        x.score == null || Number.isNaN(Number.parseFloat(x.score))
          ? null
          : Number.parseFloat(x.score),
    }));
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!projectId) {
        setErr("No project selected.");
        setLoading(false);
        return;
      }
      try {
        setErr("");
        setLoading(true);
        const resp = await api.getImplementedInterventions(projectId);
        const list = normalizeImplemented(resp);

        // Sort desc by score (nulls at the end)
        list.sort(
          (a, b) =>
            (Number.isFinite(b.score) ? b.score : -Infinity) -
            (Number.isFinite(a.score) ? a.score : -Infinity)
        );

        if (!cancelled) setItems(list);
      } catch (e) {
        if (!cancelled) setErr(e?.message || "Failed to load implemented interventions.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [projectId]);

  const handleBackToProject = () => {
    navigate("/dashboard");
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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.05) 50%, rgba(255, 255, 255, 0.05) 100%)",
          zIndex: 0,
        }}
      />

      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "10px 16px" : "20px 40px",
          position: "relative",
          zIndex: 1,
          paddingTop: isMobile ? "80px" : "90px",
        }}
      >
        <div
          style={{
            width: isMobile ? "100%" : "750px",
            maxWidth: "750px",
            height: isMobile ? "calc(100vh - 180px)" : "calc(100vh - 200px)",
            backgroundColor: "rgba(66, 86, 103, 0.7)",
            borderRadius: "16px",
            padding: isMobile ? "20px 16px" : "24px 28px",
            boxShadow: "0 20px 60px rgba(66, 86, 103, 0.3)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <h2
            style={{
              fontSize: isMobile ? "20px" : "24px",
              fontFamily: "'Arquitecta', sans-serif",
              fontWeight: "900",
              marginBottom: "16px",
              color: "#ffffff",
              textAlign: "center",
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
              flexShrink: 0,
            }}
          >
            Report
          </h2>

          {/* Status / errors */}
          {loading && (
            <div
              style={{
                color: "#fff",
                textAlign: "center",
                padding: 16,
                fontFamily: "'Arquitecta', sans-serif",
              }}
            >
              Loading…
            </div>
          )}
          {err && !loading && (
            <div
              style={{
                background: "rgba(255, 92, 92, 0.2)",
                border: "1px solid rgba(255, 92, 92, 0.5)",
                color: "#fff",
                padding: "10px 12px",
                borderRadius: 8,
                marginBottom: 12,
                fontSize: 14,
                fontFamily: "'Arquitecta', sans-serif",
              }}
            >
              {err}
            </div>
          )}

          {/* Scrollable content */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: "8px",
              marginRight: "-8px",
            }}
          >
            {/* Graph */}
            {projectId && (
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    color: "#fff",
                    fontFamily: "'Arquitecta', sans-serif",
                    fontWeight: 900,
                    fontSize: 14,
                    marginBottom: 8,
                  }}
                >
                  Intervention Graph
                </div>
                <div
                  style={{
                    width: "100%",
                    overflowX: "auto",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 6,
                    padding: 8,
                  }}
                >
                  {/* SVG served by backend */}
                  <img
                    src={graphSrc}
                    alt="Intervention Graph"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    onError={(e) => {
                      // Helpful fallback if Graphviz isn't available server-side
                      e.currentTarget.style.display = "none";
                      const m = document.createElement("div");
                      m.style.color = "#fff";
                      m.style.opacity = "0.9";
                      m.style.fontFamily = "'Arquitecta', sans-serif";
                      m.style.fontSize = "14px";
                      m.innerText = "Graph unavailable (check Graphviz 'dot' on server).";
                      e.currentTarget.parentNode.appendChild(m);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Implemented interventions */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "16px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
            >
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "900",
                  marginBottom: "12px",
                  color: "#ffffff",
                  fontFamily: "'Arquitecta', sans-serif",
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.5)",
                }}
              >
                Selected (Implemented) Interventions
              </h3>

              {(!items || items.length === 0) ? (
                <div
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "'Arquitecta', sans-serif",
                    fontSize: 14,
                  }}
                >
                  No interventions have been applied yet.
                </div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {items.map((it) => (
                    <div
                      key={it.intervention_id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 12px",
                        background: "rgba(255,255,255,0.08)",
                        borderRadius: 8,
                      }}
                    >
                      <div
                        style={{
                          color: "#fff",
                          fontFamily: "'Arquitecta', sans-serif",
                          fontSize: 14,
                          lineHeight: 1.4,
                          paddingRight: 8,
                        }}
                      >
                        {it.name || `Intervention #${it.intervention_id}`}
                      </div>
                      <div
                        style={{
                          color: "rgba(255,255,255,0.85)",
                          fontFamily: "'Arquitecta', sans-serif",
                          fontSize: 12,
                        }}
                      >
                        {Number.isFinite(it.score)
                          ? `Score: ${it.score.toFixed(2)}`
                          : "Score: —"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
              paddingTop: "12px",
              borderTop: "1px solid rgba(255, 255, 255, 0.2)",
              flexShrink: 0,
              marginTop: "auto",
            }}
          >
            <a
              href={htmlHref}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
                color: "white",
                padding: isMobile ? "12px 20px" : "14px 28px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                minWidth: "160px",
                fontFamily: "'Arquitecta', sans-serif",
                letterSpacing: "0.5px",
                textDecoration: "none",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
              }}
            >
              VIEW HTML REPORT
            </a>

            <a
              href={pdfHref}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "linear-gradient(135deg, #50aef5 0%, #2f86d6 100%)",
                color: "white",
                padding: isMobile ? "12px 20px" : "14px 28px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                minWidth: "160px",
                fontFamily: "'Arquitecta', sans-serif",
                letterSpacing: "0.5px",
                textDecoration: "none",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(80, 174, 245, 0.3)",
              }}
            >
              DOWNLOAD PDF
            </a>

            <button
              onClick={handleBackToProject}
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#ffffff",
                padding: isMobile ? "12px 20px" : "14px 28px",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                minWidth: "160px",
                fontFamily: "'Arquitecta', sans-serif",
                letterSpacing: "0.5px",
                backdropFilter: "blur(10px)",
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
