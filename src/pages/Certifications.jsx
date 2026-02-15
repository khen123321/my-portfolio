import React from "react";

const certs = [
  {
    title: "IT Support Specialist",
    issuer: "Cisco",
    date: "2025",
    image: "/cisco-badge.png",
    link: "https://www.credly.com/badges/d3f73794-d8db-4548-ab4f-cf0e58a31e67",
  },
];

export default function Certifications() {
  return (
    <>
      <style>{`
        .cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 24px;
        }
        .cert-card {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 36px 28px;
          background: #fff;
          border: 1px solid #e5e7eb;
          border-radius: 16px;
          transition: border-color 0.25s, box-shadow 0.25s, transform 0.25s;
        }
        .cert-card:hover {
          border-color: #2563eb;
          box-shadow: 0 8px 30px rgba(37,99,235,0.1);
          transform: translateY(-4px);
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-up { opacity: 0; animation: fadeUp 0.7s ease-out forwards; }
      `}</style>

      <section className="section-padding">
        <div style={{ maxWidth: "1160px", margin: "0 auto", padding: "0 40px" }}>

          <div className="animate-up" style={{ marginBottom: "16px", animationDelay: "0ms" }}>
            <span style={{ color: "#2563eb", fontWeight: "700", fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>
              03. Certifications
            </span>
          </div>

          <h2
            className="animate-up"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              fontWeight: "800",
              letterSpacing: "-0.03em",
              color: "#111827",
              marginBottom: "48px",
              animationDelay: "100ms",
            }}
          >
            Credentials & Awards
          </h2>

          <div className="cert-grid">
            {certs.map((cert, i) => (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card animate-up"
                style={{ animationDelay: `${i * 120 + 200}ms` }}
              >
                <div style={{ width: "100px", height: "100px", marginBottom: "20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={cert.image} alt={cert.title} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
                </div>
                <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: "1rem", fontWeight: "700", color: "#111827", margin: "0 0 6px 0" }}>
                  {cert.title}
                </h3>
                <span style={{ color: "#2563eb", fontSize: "0.875rem", fontWeight: "600" }}>{cert.issuer}</span>
                <span style={{ color: "#9ca3af", fontSize: "0.8rem", marginTop: "8px" }}>Issued {cert.date}</span>

                <div style={{ marginTop: "16px", padding: "6px 14px", background: "#eff6ff", borderRadius: "99px", display: "inline-flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ fontSize: "0.75rem", color: "#2563eb", fontWeight: "600" }}>View Credential ↗</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}