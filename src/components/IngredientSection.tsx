export default function IngredientSection() {
  return (
    <section
      style={{
        backgroundColor: "#003F58",
        padding: "0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top band with headline */}
      <div
        style={{
          padding: "72px 48px 56px",
          position: "relative",
          zIndex: 2,
        }}
        className="ingredient-pad"
      >
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "#F08321",
              marginBottom: 16,
            }}
          >
            HOW WE DO IT
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 100px)",
              lineHeight: 0.92,
              color: "#FAF6EF",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            FRESH IN.
            <br />
            <span style={{ color: "#E07828" }}>GOOD FOOD</span> OUT.
          </h2>
        </div>
      </div>

      {/* Full-bleed image strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 3,
        }}
        className="ingredient-grid"
      >
        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1472141341085-dab5ea0df9a2?w=800&h=500&fit=crop&auto=format"
            alt="Fresh herbs and produce"
            style={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              display: "block",
              backgroundColor: "#2A3F2E",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,63,88,0.6) 0%, transparent 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              fontFamily: "var(--font-display)",
              fontSize: 22,
              color: "#FAF6EF",
              letterSpacing: "0.02em",
            }}
          >
            FRESH HERBS
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1684713594570-ee1691f352c1?w=500&h=500&fit=crop&auto=format"
            alt="Sliced limes and fresh citrus"
            style={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              display: "block",
              backgroundColor: "#2A3F2E",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,63,88,0.6) 0%, transparent 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              fontFamily: "var(--font-display)",
              fontSize: 22,
              color: "#FAF6EF",
            }}
          >
            CITRUS
          </div>
        </div>

        <div style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1597345637412-9fd611e758f3?w=500&h=500&fit=crop&auto=format"
            alt="Slow-cooked broth — pho base"
            style={{
              width: "100%",
              height: 400,
              objectFit: "cover",
              display: "block",
              backgroundColor: "#2A3F2E",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,63,88,0.6) 0%, transparent 60%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              fontFamily: "var(--font-display)",
              fontSize: 22,
              color: "#FAF6EF",
            }}
          >
            SLOW BROTH
          </div>
        </div>
      </div>

      {/* Bottom tagline */}
      <div
        className="ingredient-tagline"
        style={{
          padding: "40px 48px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 48,
          flexWrap: "wrap",
        }}
      >
        {["No shortcuts", "Fresh daily", "Bold flavour", "Made with care"].map((item, i) => (
          <div key={item} style={{ display: "flex", alignItems: "center", gap: i > 0 ? 48 : 0 }}>
            {i > 0 && (
              <div
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  backgroundColor: "#E07828",
                  marginRight: -24,
                }}
              />
            )}
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 14,
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.65)",
                textTransform: "uppercase",
              }}
            >
              {item}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ingredient-pad { padding: 56px 24px 40px !important; }
          .ingredient-grid { grid-template-columns: 1fr !important; }
          .ingredient-grid > div img { height: 260px !important; }
          .ingredient-tagline { padding: 32px 24px !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
