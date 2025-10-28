import { Link } from "react-router-dom";
import "../assets/styles/Home.css";
import CategoryCard from "../components/CategoryCard";
import SearchBar from "../components/SearchBar";
import imgHome from '../assets/images/hero-tool.png';
import imgTool from '../assets/images/cat-tools.png';
import imgMachine from '../assets/images/cat-machines.png';
import imgAccessory from '../assets/images/cat-accessories.png';

export default function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
    <section
      className="hero "
      style={{
        backgroundImage: `url(${imgHome})`
      }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Din partner för verkstadsprodukter</h1>
          <p>Snabb beställning • Bra priser • Pålitlig leverans</p>
          <Link to="/products" className="btn btn-primary hero-btn">
            Utforska produkter
          </Link>
        </div>
      </div>
    </section>

      {/* Search Bar */}
      <SearchBar />

      {/* Categories */}
      <section className="categories">
        <h5>Kategorier</h5>
        <div className="category-grid">
          <CategoryCard
            title="Verktyg"
            description="Handverktyg, bits, tänger"
            image={imgTool}
          />
          <CategoryCard
            title="Maskiner"
            description="Borr, såg, slip"
            image={imgMachine}
          />
          <CategoryCard
            title="Tillbehör"
            description="Skruv, lim, skydd"
            image={imgAccessory}
          />
        </div>
      </section>
    </div>
  );
}
