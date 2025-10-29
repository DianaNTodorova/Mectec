import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useBasket } from "../context/BasketContext";
import "../assets/styles/productdetails.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToBasket } = useBasket();
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning text-center">
          <h4>Produkten hittades inte</h4>
          <p>Den produkt du söker efter kunde inte hittas.</p>
        </div>
      </div>
    );
  }

  const handleAddToBasket = () => {
    addToBasket(product);
  };

  // Mock specifications data - in a real app, this would come from the product data
  const specifications = {
    "Material": "Rostfritt stål",
    "Storlek": "M6 x 20mm",
    "Vikt": "15g",
    "Finish": "Galvaniserad",
    "Ursprung": "Sverige",
    "Garanti": "2 år"
  };

  return (
    <div className="product-detail-container">
      <div className="container">

        {/* Unified Product Content */}
        <div className="row">
          <div className="col-12">
            <div className="unified-product-card">
              {/* Product Header with Image and Basic Info */}
              <div className="product-header">
                <div className="product-image-section">
                  <img 
                    src={product.image} 
                    className="img-fluid product-detail-image" 
                    alt={product.name} 
                  />
                </div>
                
                <div className="product-summary">
                  <h1 className="product-title">{product.name}</h1>
                  
                  <div className="price-section mb-3">
                    <span className="current-price">{product.price} kr</span>
                    <span className="price-note text-muted ms-2">inkl. moms</span>
                  </div>

                  <div className="stock-status mb-3">
                    {product.saldo && product.saldo > 0 ? (
                      <div className="stock-item in-stock">
                        <span className="stock-dot green-dot"></span>
                        <span className="stock-text">I lager ({product.saldo} st)</span>
                      </div>
                    ) : (
                      <div className="stock-item out-of-stock">
                        <span className="stock-dot red-dot"></span>
                        <span className="stock-text">Ej i lager</span>
                      </div>
                    )}
                  </div>

                  <div className="product-description mb-3">
                    <h5>Beskrivning</h5>
                    <p className="description-text">{product.description}</p>
                  </div>

                  <div className="action-section mb-3">
                    <div className="quantity-selector mb-3">
                      <label htmlFor="quantity" className="form-label">Antal:</label>
                      <div className="input-group" style={{maxWidth: '120px'}}>
                        <button className="btn btn-outline-secondary" type="button">-</button>
                        <input type="number" className="form-control text-center" id="quantity" value="1" min="1" />
                        <button className="btn btn-outline-secondary" type="button">+</button>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary btn-lg"
                      onClick={handleAddToBasket}
                    >
                      <span className="material-symbols-outlined me-2">add_shopping_cart</span>
                      Lägg i varukorg
                    </button>
                  </div>

                  <div className="product-features">
                    <div className="feature-item">
                      <span className="material-symbols-outlined text-success">verified</span>
                      <span>Kvalitetsgaranti</span>
                    </div>
                    <div className="feature-item">
                      <span className="material-symbols-outlined text-primary">local_shipping</span>
                      <span>Snabb leverans</span>
                    </div>
                    <div className="feature-item">
                      <span className="material-symbols-outlined text-info">support_agent</span>
                      <span>Teknisk support</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications and Additional Info */}
        <div className="row mt-5">
          <div className="col-12">

            <div className="tab-content" id="productTabsContent">
              {/* Specifications Tab */}
              <div className="tab-pane fade show active" id="specifications" role="tabpanel">
                <div className="card border-0">
                  <div className="card-body">
                    <h5 className="card-title">Tekniska specifikationer</h5>
                    <div className="specifications-grid">
                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className="spec-row">
                          <div className="spec-label">{key}:</div>
                          <div className="spec-value">{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
