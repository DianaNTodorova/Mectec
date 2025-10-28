import type { ReactElement } from "react";
import "../assets/styles/categorycard.css";

interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
}

export default function CategoryCard({ title, description, image }: CategoryCardProps):ReactElement {
  return (
    <div className="category-card">
      <img src={image} alt={title} />
      <div className="category-content">
        <h6>{title}</h6>
        <p>{description}</p>
      </div>
    </div>
  );
}
