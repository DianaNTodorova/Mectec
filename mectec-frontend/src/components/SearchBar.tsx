import type { ReactElement } from "react";
import "../assets/styles/SearchBar.css";

interface SearchBarProps {
  fullWidth?: boolean;
}

export default function SearchBar({ fullWidth = false }: SearchBarProps): ReactElement {
  const containerStyle = fullWidth 
    ? { margin: 0, maxWidth: 'none' }
    : { margin: '40px auto', maxWidth: '900px' };

  return (
    <div className="search-bar" style={containerStyle}>
      <input type="text" placeholder="Sök produkter..." />
      <button className="btn btn-primary">Sök</button>
    </div>
  );
}
