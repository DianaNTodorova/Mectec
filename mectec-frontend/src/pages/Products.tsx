import { Link } from "react-router-dom";
import { products } from "../data/products";
import SearchBar from "../components/SearchBar";
import { useBasket } from "../context/BasketContext";

export default function Products() {
  const { addToBasket } = useBasket();

  const handleAddToBasket = (product: typeof products[0]) => {
    addToBasket(product);
  };

  return (
    <div className="products-container">
      <SearchBar />
      <h2 className="m-4">Produkter</h2>
      <div className="row">
        {products.map(product => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            <div className="card h-100">
              <div className="product-image-container">
                <img src={product.image} className="card-img-top product-image" alt={product.name} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {product.name}
                  {product.storlek && <span className="product-size"> {product.storlek}</span>}
                </h5>
                <div className="stock-info mb-2">
                  {product.saldo && product.saldo > 0 ? (
                    <span className="stock-status in-stock">
                      <span className="stock-dot green-dot"></span>
                      <small>I lager ({product.saldo} st)</small>
                    </span>
                  ) : (
                    <span className="stock-status out-of-stock">
                      <span className="stock-dot red-dot"></span>
                      <small>Ej i lager</small>
                    </span>
                  )}
                </div>
                <p className="card-text fw-bold">{product.price} kr</p>
                <div className="mt-auto d-flex gap-2">
                  <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm flex-fill">
                    Läs mer
                  </Link>
                  <button 
                    onClick={() => handleAddToBasket(product)}
                    className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center" 
                    style={{minWidth: '40px'}}
                  >
                    <span className="material-symbols-outlined add-shopping-cart">
                      add_shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
