import type { ReactElement } from "react";
import "../assets/styles/SearchBar.css";

export default function SearchBar():ReactElement {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Sök produkter..." />
      <button className="btn btn-primary">Sök</button>
    </div>
  );
}
