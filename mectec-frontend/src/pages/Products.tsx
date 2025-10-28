import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function Products() {
  return (
    <div className="products-container">
      <h2 className="m-4">Produkter</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            <div className="card h-100">
              <div className="product-image-container">
                <img src={product.image} className="card-img-top product-image" alt={product.name} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text fw-bold">{product.price} kr</p>
                <div className="mt-auto">
                  <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm me-2">
                    Läs mer
                  </Link>
                  <Link to={`/basket`} className="btn btn-outline-primary btn-sm">
                    <span className="material-symbols-outlined add-shopping-cart">
                      add_shopping_cart
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
