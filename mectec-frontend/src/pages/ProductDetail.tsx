import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../data/products";
import { useBasket } from "../context/BasketContext";
import "../assets/styles/productdetails.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { addToBasket } = useBasket();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const urls = [
          "http://localhost:5044/api/products",
          "https://localhost:7051/api/products"
        ];

        for (const url of urls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              const apiProducts = await response.json();
              const foundProduct = apiProducts.find((p: Product) => p.id === Number(id));
              setProduct(foundProduct || null);
              setLoading(false);
              return; 
            }
          } catch (error) {
            console.log(`Failed to fetch from ${url}:`, error);
          }
        }

        const savedProducts = localStorage.getItem('createdProducts');
        if (savedProducts) {
          const parsedProducts: Product[] = JSON.parse(savedProducts);
          const foundProduct = parsedProducts.find(p => p.id === Number(id));
          setProduct(foundProduct || null);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error loading product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Laddar...</span>
            </div>
            <p className="text-muted">Laddar produkt...</p>
          </div>
        </div>
      </div>
    );
  }

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

    for (let i = 0; i < quantity; i++) {
      addToBasket(product);
    }
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
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
                    src={product.imageUrl} 
                    className="img-fluid product-detail-image" 
                    alt={product.title} 
                  />
                </div>
                
                <div className="product-summary">
                  <h1 className="product-title">{product.title}
                  {product.articleNumber && <span className="product-size mb-4 fs-5"> {product.articleNumber}</span>}</h1>
                  
                  <div className="price-section mb-3">
                    <span className="current-price">{product.price} kr</span>
                    <span className="price-note text-muted ms-2">inkl. moms</span>
                  </div>

                  <div className="stock-status mb-3">
                    {product.stock && product.stock > 0 ? (
                      <div className="stock-item in-stock">
                        <span className="stock-dot green-dot"></span>
                        <span className="stock-text">I lager ({product.stock} st)</span>
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
                      <div className="input-group" style={{maxWidth: '160px'}}>
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={decreaseQuantity}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          className="form-control text-center" 
                          id="quantity" 
                          value={quantity} 
                          min="1" 
                          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
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
      </div>
    </div>
  );
}
