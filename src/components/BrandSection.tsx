export default function BrandSection() {
  return (
    <section
      style={{
        backgroundColor: "#EBD2B3",
        padding: "96px 48px",
        overflow: "hidden",
      }}
      className="brand-section"
    >
      <div style={{ maxWidth: 1440, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="brand-grid"
        >
          {/* Left: Imagery grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridTemplateRows: "auto auto",
              gap: 8,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1781195480848-d8344ffc94dc?w=700&h=500&fit=crop&auto=format"
              alt="Outdoor dining — relaxed Australian setting"
              style={{
                gridColumn: "span 2",
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 10,
                display: "block",
                backgroundColor: "#CEC0A4",
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1656945843375-207bb6e47750?w=400&h=350&fit=crop&auto=format"
              alt="Kitchen preparation — fresh ingredients"
              style={{
                width: "100%",
                height: 220,
                objectFit: "cover",
                borderRadius: 10,
                display: "block",
                backgroundColor: "#CEC0A4",
              }}
            />
            {/* Logo tile */}
            <div
              style={{
                backgroundColor: "#003F58",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 220,
                padding: 24,
              }}
            >
              <img
                src="/src/imports/Logo_The_Outback_F_B_Service_2.png"
                alt="The Outback F&B Service mascot"
                style={{ width: "100%", maxWidth: 160, height: "auto" }}
              />
            </div>
          </div>

          {/* Right: Copy */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.12em",
                color: "#627A5B",
                marginBottom: 16,
              }}
            >
              OUR STORY
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 4vw, 60px)",
                lineHeight: 0.95,
                color: "#003F58",
                margin: "0 0 24px",
                letterSpacing: "-0.02em",
              }}
            >
              MADE HERE.
              <br />
              <span style={{ color: "#C4601A" }}>INSPIRED</span>
              <br />
              BY THERE.
            </h2>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.7,
                color: "#2A2A2A",
                marginBottom: 20,
              }}
            >
              Fresh, flavour-packed food made for our local community. We take
              the bold flavours of Vietnamese cooking and serve them with the
              easy-going spirit of Australian hospitality.
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 17,
                lineHeight: 1.7,
                color: "#2A2A2A",
                marginBottom: 32,
              }}
            >
              Every dish is made fresh, every day — from our slow-simmered pho
              broth to the crunch of our pork banh mi. Good food, no fuss,
              every time.
            </p>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
              {[
                { number: "100%", label: "Fresh daily" },
                { number: "6+", label: "Years serving" },
                { number: "★ 4.8", label: "Customer rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: 32,
                      color: "#003F58",
                      lineHeight: 1,
                    }}
                  >
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "#627A5B",
                      marginTop: 4,
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .brand-section { padding: 64px 24px !important; }
          .brand-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
