import React from "react";

const DataIngestion = () => {
  const isMobile = window.innerWidth <= 768;

  const handleDownload = () => {
    alert("Excel report download initiated (placeholder).");
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) alert(`File selected: ${file.name}`);
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
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "80px 16px" : "120px 40px",
        position: "relative",
      }}
    >
      {/* Transparent overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,0.05) 100%)",
          zIndex: 0,
        }}
      />

      {/* Glassy container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: isMobile ? "100%" : "700px",
          maxWidth: "700px",
          backgroundColor: "rgba(66, 86, 103, 0.7)", // same as ThemeRating
          borderRadius: "16px",
          padding: isMobile ? "28px 22px" : "40px 36px",
          boxShadow: "0 20px 60px rgba(66, 86, 103, 0.3)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: "900",
            fontSize: isMobile ? "22px" : "26px",
            color: "#ffffff",
            marginTop: 0,
            marginBottom: isMobile ? "20px" : "28px",
            textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          Upload Intervention Data
        </h2>

        {/* Download button */}
        <button
          onClick={handleDownload}
          style={{
            width: "100%",
            background:
              "linear-gradient(135deg, rgb(55, 190, 115) 0%, rgb(35, 145, 85) 100%)",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            padding: isMobile ? "14px 0" : "16px 0",
            fontSize: "16px",
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: "900",
            cursor: "pointer",
            marginBottom: "22px",
            boxShadow: "0 8px 24px rgba(35,145,85,0.4)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, rgb(45,170,100) 0%, rgb(30,130,75) 100%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, rgb(55,190,115) 0%, rgb(35,145,85) 100%)")
          }
        >
          Download Excel Report ⬇️
        </button>

        {/* Upload section */}
        <label
          style={{
            display: "block",
            width: "100%",
            background:
              "linear-gradient(135deg, rgb(50,60,80) 0%, rgb(40,50,70) 100%)",
            color: "#ffffff",
            borderRadius: "12px",
            padding: isMobile ? "14px 0" : "16px 0",
            fontSize: "16px",
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: "900",
            cursor: "pointer",
            marginBottom: "10px",
            boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, rgb(45,55,75) 0%, rgb(35,45,65) 100%)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              "linear-gradient(135deg, rgb(50,60,80) 0%, rgb(40,50,70) 100%)")
          }
        >
          Upload Excel ⬆️
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </label>

        {/* Note */}
        <div
          style={{
            marginTop: "10px",
            color: "rgba(255,255,255,0.85)",
            fontSize: "12px",
            fontFamily: "'Arquitecta', sans-serif",
            fontWeight: "300",
            textShadow: "0 1px 3px rgba(0, 0, 0, 0.4)",
          }}
        >
          note*: Ensure all columns follow the template format before uploading
        </div>
      </div>
    </div>
  );
};

export default DataIngestion;
