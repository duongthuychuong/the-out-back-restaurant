import { useState } from "react";

interface FeaturedMenuProps {
  onNavigate: (page: string) => void;
}

const DISHES = [
  {
    id: 1,
    name: "Crispy Pork Banh Mi",
    description: "Slow-roasted pork belly, house pickles, jalapeño, coriander, housemade mayo",
    price: "$14",
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1600454309261-3dc9b7597637?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 2,
    name: "Lemongrass Chicken Banh Mi",
    description: "Marinated lemongrass chicken, house pickled veg, cucumber, mint, sriracha aioli",
    price: "$13",
    badge: null,
    image: "https://images.unsplash.com/photo-1599719455360-ff0be7c4dd06?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 3,
    name: "Rice Noodle Salad",
    description: "Vermicelli, fresh herbs, crispy shallots, peanuts, fish sauce dressing",
    price: "$15",
    badge: "GF",
    image: "https://images.unsplash.com/photo-1584946425226-4361a7d5d002?w=600&h=500&fit=crop&auto=format",
  },
  {
    id: 4,
    name: "Pho",
    description: "Slow-simmered bone broth, rice noodles, fresh herbs, bean sprouts, lime",
    price: "$17",
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1597345637412-9fd611e758f3?w=600&h=500&fit=crop&auto=format",
  },
];

const PAGE_SIZE = 3;

export default function FeaturedMenu({ onNavigate }: FeaturedMenuProps) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(DISHES.length / PAGE_SIZE);
  const visible = DISHES.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section
      style={{
        backgroundColor: "#F8F1E9",
        padding: "80px 0 88px",
      }}
      className="crowd-section"
    >
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          paddingLeft: "clamp(24px, 4vw, 64px)",
          paddingRight: "clamp(24px, 4vw, 64px)",
        }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 52,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.12em",
                color: "#F08321",
                textTransform: "uppercase",
                margin: "0 0 10px",
              }}
            >
              OUR FAVOURITES
            </p>
            <h2
              style={{
                fontFamily: "'Anton', sans-serif",
                fontSize: "clamp(52px, 6.5vw, 96px)",
                lineHeight: 0.91,
                color: "#1A1813",
                margin: 0,
                letterSpacing: "0.01em",
              }}
            >
              CROWD
              <br />
              FAVOURITES
            </h2>
          </div>

          {/* Right side: copy + nav arrows */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 20,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 16,
                lineHeight: 1.65,
                color: "#1A1813",
                opacity: 0.65,
                margin: 0,
                textAlign: "right",
                maxWidth: 260,
              }}
            >
              The ones people keep coming back for.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { dir: "prev", label: "←", action: () => setPage((p) => Math.max(0, p - 1)) },
                { dir: "next", label: "→", action: () => setPage((p) => Math.min(totalPages - 1, p + 1)) },
              ].map(({ dir, label, action }) => (
                <button
                  key={dir}
                  onClick={action}
                  disabled={dir === "prev" ? page === 0 : page === totalPages - 1}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "1.5px solid #1A1813",
                    backgroundColor: "transparent",
                    color: "#1A1813",
                    fontFamily: "var(--font-body)",
                    fontSize: 18,
                    cursor: dir === "prev" ? (page === 0 ? "default" : "pointer") : (page === totalPages - 1 ? "default" : "pointer"),
                    opacity: (dir === "prev" ? page === 0 : page === totalPages - 1) ? 0.28 : 1,
                    transition: "background-color 150ms ease, opacity 150ms ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    if (!btn.disabled) btn.style.backgroundColor = "rgba(26,24,19,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dish grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="crowd-grid"
        >
          {visible.map((dish) => (
            <DishCard key={dish.id} dish={dish} onNavigate={onNavigate} />
          ))}
        </div>

        {/* View full menu link */}
        <div style={{ marginTop: 44, textAlign: "center" }}>
          <button
            onClick={() => onNavigate("menu")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "0.08em",
              color: "#F08321",
              textTransform: "uppercase",
              textDecoration: "underline",
              textDecorationColor: "rgba(240,131,33,0.4)",
              textUnderlineOffset: 4,
              padding: 0,
              transition: "color 150ms ease",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#BD5110")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.color = "#F08321")
            }
          >
            SEE FULL MENU →
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .crowd-section { padding: 56px 0 64px !important; }
          .crowd-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .crowd-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function DishCard({
  dish,
  onNavigate,
}: {
  dish: (typeof DISHES)[0];
  onNavigate: (page: string) => void;
}) {
  return (
    <div
      onClick={() => onNavigate("menu")}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        borderRadius: 8,
        backgroundColor: "#EBD2B3",
        aspectRatio: "4/3",
      }}
      onMouseEnter={(e) => {
        const img = (e.currentTarget as HTMLDivElement).querySelector("img");
        if (img) img.style.transform = "scale(1.04)";
      }}
      onMouseLeave={(e) => {
        const img = (e.currentTarget as HTMLDivElement).querySelector("img");
        if (img) img.style.transform = "scale(1)";
      }}
    >
      <img
        src={dish.image}
        alt={dish.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      {/* Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(26,24,19,0.82) 0%, rgba(26,24,19,0.15) 55%, transparent 100%)",
        }}
      />
      {/* Badge */}
      {dish.badge && (
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            backgroundColor: "#F08321",
            color: "#FFFFFF",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "0.1em",
            padding: "4px 10px",
            borderRadius: 4,
          }}
        >
          {dish.badge}
        </div>
      )}
      {/* Info */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "18px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              color: "#F8F1E9",
              margin: "0 0 4px",
              lineHeight: 1.15,
            }}
          >
            {dish.name}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "rgba(248,241,233,0.7)",
              margin: 0,
              lineHeight: 1.4,
              maxWidth: 220,
            }}
          >
            {dish.description}
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            color: "#F6A53F",
            marginLeft: 12,
            flexShrink: 0,
          }}
        >
          {dish.price}
        </span>
      </div>
    </div>
  );
}
