import Link from "next/link";

interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  image: string;
  isLarge?: boolean;
}

const categories: CategoryItem[] = [
  {
    id: "bois-de-chauffage",
    title: "Brennholz",
    slug: "/bois-de-chauffage",
    icon: "fa-fire",
    image: "/img/cat-bois.jpg",
    isLarge: true,
  },
  {
    id: "granules",
    title: "Holzpellets",
    slug: "/granules",
    icon: "fa-seedling",
    image: "/img/cat-granules.jpg",
  },
  {
    id: "briquettes",
    title: "Holzbriketts",
    slug: "/briquettes",
    icon: "fa-cubes",
    image: "/img/cat-briquettes.jpg",
  },
  {
    id: "bois-presse",
    title: "Pressholz",
    slug: "/bois-presse",
    icon: "fa-layer-group",
    image: "/img/cat-presse.jpg",
  },
  {
    id: "fours",
    title: "Kaminöfen",
    slug: "/fours",
    icon: "fa-dumpster-fire",
    image: "/img/cat-fours.jpg",
  },
];

export default function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="categories-container">
        {/* En-tête de section */}
        <div className="categories-header">
          <h2 className="categories-title">Unsere Kategorien</h2>
          <p className="categories-subtitle">
            Alles für ein gemütliches Zuhause – in Schweizer Qualität.
          </p>
          <div className="categories-line"></div>
        </div>

        {/* Grille des catégories */}
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={"#"}
              className={`category-card ${cat.isLarge ? "large-card" : ""}`}
              style={{ backgroundImage: `url(${cat.image})` }}
            >
              <div className="card-overlay"></div>

              <div className="card-content">
                <div className="card-icon-badge">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
                <h3 className="card-title">{cat.title}</h3>

                {/* <div className="card-btn-hover">
                  <span>Anzeigen</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </div> */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}