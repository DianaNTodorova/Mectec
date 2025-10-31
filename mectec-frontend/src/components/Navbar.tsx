import { Link, NavLink } from "react-router-dom";
import "../assets/styles/nav.css";
import imgLogo from "../assets/images/mectec-logo.png";
import { useBasket } from "../context/BasketContext";

export default function Navbar() {
  const { getTotalItems } = useBasket();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand" to="/">
          <img src={imgLogo} alt="Mectec" className="navbar-logo" style={{ height: '80px' }} />
        </Link>

        {/* Mobile toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Hem
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                Produkter
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/support">
                Support
              </NavLink>
            </li>

            {/* Logga in */}
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Logga in
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item position-relative">
              <Link className="nav-link cart-link" to="/basket">
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>
              </Link>
              {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
