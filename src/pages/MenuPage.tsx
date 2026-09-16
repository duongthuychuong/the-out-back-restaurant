import { useEffect, useRef, useState } from "react"

type MenuCategory = "Food" | "Drinks"
type MenuImage = {
  src: string
  category: MenuCategory
  page: number
  total: number
}

const byPageNumber = new Intl.Collator("en", { numeric: true })

function getMenuImages(
  images: Record<string, string>,
  category: MenuCategory,
): MenuImage[] {
  const sorted = Object.entries(images).sort(([first], [second]) =>
    byPageNumber.compare(first, second),
  )

  return sorted.map(([path, src], index) => ({
    src,
    category,
    page: Number(path.match(/\/(\d+)\.[^.]+$/)?.[1]) || index + 1,
    total: sorted.length,
  }))
}

const foodImages = getMenuImages(
  import.meta.glob<string>("../imports/Menu/food/*.{png,jpg,jpeg,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  "Food",
)

const drinkImages = getMenuImages(
  import.meta.glob<string>("../imports/Menu/drinks/*.{png,jpg,jpeg,webp}", {
    eager: true,
    query: "?url",
    import: "default",
  }),
  "Drinks",
)

const menuImages = [...foodImages, ...drinkImages]
const previewImages = [foodImages[0], drinkImages[0]].filter(
  (image): image is MenuImage => image !== undefined,
)
const menuGroups = [
  {
    id: "food-menu",
    title: "Food",
    subtitle: "Something good for every appetite.",
    pages: foodImages,
  },
  {
    id: "drinks-menu",
    title: "Drinks",
    subtitle: "Something refreshing on the side.",
    pages: drinkImages,
  },
]

export default function MenuPage() {
  const [showFullMenu, setShowFullMenu] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const visibleImages = showFullMenu ? menuImages : previewImages
  const selectedImage =
    selectedIndex === null ? null : visibleImages[selectedIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (selectedIndex !== null && !dialog.open) dialog.showModal()
    if (selectedIndex === null && dialog.open) dialog.close()
  }, [selectedIndex])

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        setSelectedIndex((index) =>
          index === null ? null : Math.max(0, index - 1),
        )
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        setSelectedIndex((index) =>
          index === null ? null : Math.min(visibleImages.length - 1, index + 1),
        )
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, visibleImages])

  return (
    <section id="menu" className="menu-section">
      <div className="menu-intro">
        <div className="menu-intro-inner">
          <p className="menu-eyebrow">FRESH FAVOURITES, MADE TO ORDER</p>
          <h2>
            THE MENU<span>.</span>
          </h2>
          <p className="menu-intro-copy">
            A taste of what we make. Browse food and drinks, then open the full
            menu to see every page.
          </p>
        </div>
        <span className="menu-intro-decoration" aria-hidden="true">
          MENU
        </span>
      </div>

      <div
        className={`menu-gallery${showFullMenu ? " menu-gallery--full" : ""}`}
      >
        {!showFullMenu ? (
          <div className="menu-preview">
            <div className="menu-preview-heading">
              <span>TAKE A LOOK</span>
              <span>FOOD + DRINKS</span>
            </div>
            <div className="menu-image-grid menu-preview-grid">
              {previewImages.map((image, index) => (
                <button
                  className="menu-image-card menu-image-card--preview"
                  type="button"
                  key={image.src}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`View ${image.category.toLowerCase()} menu preview`}
                >
                  <img
                    src={image.src}
                    alt={`${image.category} menu preview`}
                    loading="lazy"
                    decoding="async"
                    width={image.category === "Food" ? 1414 : 2121}
                    height={image.category === "Food" ? 2000 : 3000}
                  />
                  <span className="menu-image-caption">
                    <span>{image.category.toUpperCase()} MENU</span>
                    <span aria-hidden="true">VIEW LARGER ↗</span>
                  </span>
                </button>
              ))}
            </div>
            <button
              className="menu-full-button"
              type="button"
              onClick={() => setShowFullMenu(true)}
            >
              VIEW FULL MENU <span aria-hidden="true">↘</span>
            </button>
            <p className="menu-preview-note">
              All {menuImages.length} food and drinks pages in one place.
            </p>
          </div>
        ) : (
          <div className="menu-full-gallery">
            <div className="menu-full-toolbar">
              <span>FULL MENU · {menuImages.length} PAGES</span>
              <button
                type="button"
                onClick={() => {
                  setShowFullMenu(false)
                  requestAnimationFrame(() =>
                    document.getElementById("menu")?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    }),
                  )
                }}
              >
                CLOSE FULL MENU ↑
              </button>
            </div>
            <div
              className="menu-jump-links menu-jump-links--gallery"
              aria-label="Jump to menu category"
            >
              <a href="#food-menu">
                EXPLORE FOOD <span aria-hidden="true">↘</span>
              </a>
              <a href="#drinks-menu">
                EXPLORE DRINKS <span aria-hidden="true">↘</span>
              </a>
            </div>
            {menuGroups.map(({ id, title, subtitle, pages }) => (
              <div className="menu-group" id={id} key={id}>
                <div className="menu-group-heading">
                  <div>
                    <p className="menu-eyebrow">{title.toUpperCase()} MENU</p>
                    <h3>
                      {title}
                      <span>.</span>
                    </h3>
                    <p>{subtitle}</p>
                  </div>
                  <span className="menu-page-count">
                    {String(pages.length).padStart(2, "0")} PAGES
                  </span>
                </div>
                <div className="menu-image-grid">
                  {pages.map((image) => {
                    const index = menuImages.indexOf(image)
                    return (
                      <button
                        className="menu-image-card"
                        type="button"
                        key={image.src}
                        onClick={() => setSelectedIndex(index)}
                        aria-label={`View ${image.category.toLowerCase()} menu page ${image.page} of ${image.total}`}
                      >
                        <img
                          src={image.src}
                          alt={`${image.category} menu page ${image.page} of ${image.total}`}
                          loading="lazy"
                          decoding="async"
                          width={image.category === "Food" ? 1414 : 2121}
                          height={image.category === "Food" ? 2000 : 3000}
                        />
                        <span className="menu-image-caption">
                          <span>
                            {image.category.toUpperCase()}{" "}
                            <span className="menu-caption-dot">·</span> PAGE{" "}
                            {String(image.page).padStart(2, "0")}
                          </span>
                          <span aria-hidden="true">VIEW LARGER ↗</span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <dialog
        ref={dialogRef}
        className="menu-viewer"
        aria-label="Menu page viewer"
        onClose={() => setSelectedIndex(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedIndex(null)
        }}
      >
        {selectedImage && (
          <div className="menu-viewer-content">
            <div className="menu-viewer-topbar">
              <span>
                {selectedImage.category.toUpperCase()} · PAGE{" "}
                {String(selectedImage.page).padStart(2, "0")} /{" "}
                {String(selectedImage.total).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close menu viewer"
              >
                ✕
              </button>
            </div>
            <div className="menu-viewer-scroll">
              <img
                src={selectedImage.src}
                alt={`${selectedImage.category} menu page ${selectedImage.page} of ${selectedImage.total}`}
              />
            </div>
            <div className="menu-viewer-footer">
              <button
                type="button"
                disabled={selectedIndex === 0}
                onClick={() =>
                  setSelectedIndex((index) =>
                    index === null ? null : index - 1,
                  )
                }
              >
                ← PREVIOUS
              </button>
              <a
                href={selectedImage.src}
                target="_blank"
                rel="noopener noreferrer"
              >
                OPEN FULL SIZE ↗
              </a>
              <button
                type="button"
                disabled={selectedIndex === visibleImages.length - 1}
                onClick={() =>
                  setSelectedIndex((index) =>
                    index === null ? null : index + 1,
                  )
                }
              >
                NEXT →
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
