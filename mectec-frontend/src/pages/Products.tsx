import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { Product } from "../data/products";
import SearchBar from "../components/SearchBar";
import { useBasket } from "../context/BasketContext";

export default function Products() {
  const { addToBasket } = useBasket();
  const [showModal, setShowModal] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Start with empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [formData, setFormData] = useState({
    title: "",
    articleNumber: "",
    category: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load products from backend API on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Try to fetch products from API
        const urls = [
          "http://localhost:5044/api/products",
          "https://localhost:7051/api/products"
        ];

        for (const url of urls) {
          try {
            const response = await fetch(url);
            if (response.ok) {
              const apiProducts = await response.json();
              console.log('Loaded products from API:', apiProducts);
              setAllProducts(apiProducts);
              setLoading(false);
              return; // Exit if successful
            }
          } catch (error) {
            console.log(`Failed to fetch from ${url}:`, error);
          }
        }
        
        // Fallback to local storage if API fails
        console.log('API failed, using local storage...');
        const savedProducts = localStorage.getItem('createdProducts');
        if (savedProducts) {
          const parsedProducts: Product[] = JSON.parse(savedProducts);
          setAllProducts(parsedProducts);
        } else {
          setAllProducts([]); // Empty array if no products found
        }
      } catch (error) {
        console.error('Error loading products:', error);
        setAllProducts([]); // Empty array on error
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const refreshProducts = async () => {
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
            console.log('Refreshed products from API:', apiProducts);
            setAllProducts(apiProducts);
            return true; // Success - exit immediately
          }
        } catch (error) {
          console.log(`Failed to refresh from ${url}:`, error);
        }
      }
      return false; // Failed
    } catch (error) {
      console.error('Error refreshing products:', error);
      return false;
    }
  };

  const handleAddToBasket = (product: Product) => {
    addToBasket(product);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const urls = [
        "http://localhost:5044/api/products",  
        "https://localhost:7051/api/products" 
      ];

      let response = null;
      let lastError = null;

      for (const url of urls) {
        try {
          console.log(`Trying to create product at ${url}...`);
          
          // Send as JSON to match backend DTO structure
          const jsonData = {
            title: formData.title,
            articleNumber: formData.articleNumber,
            category: formData.category,
            description: formData.description,
            price: parseFloat(formData.price),
            imageUrl: formData.imageUrl,
            stock: parseInt(formData.stock)
          };

          console.log('Sending JSON data:', jsonData);

          response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(jsonData)
          });

          console.log(`${url} Response status:`, response.status);
          console.log(`${url} Response headers:`, Object.fromEntries(response.headers.entries()));
          
          if (response.ok) {
            const result = await response.json();
            console.log('Success response:', result);
            alert('Produkten har skapats framgångsrikt!');
            
            const refreshed = await refreshProducts();
            if (refreshed) {
              console.log('Products list refreshed with new product');
            } else {
              console.log('Refresh failed, adding product locally');
              const newId = Math.max(...allProducts.map(p => p.id)) + 1;
              const productToAdd: Product = {
                id: newId,
                title: formData.title,
                articleNumber: formData.articleNumber,
                category: formData.category,
                description: formData.description,
                price: parseFloat(formData.price),
                imageUrl: formData.imageUrl,
                stock: parseInt(formData.stock)
              };
              setAllProducts(prev => [...prev, productToAdd]);
            }
            
            setShowModal(false);
            setFormData({
              title: "",
              articleNumber: "",
              category: "",
              description: "",
              price: "",
              imageUrl: "",
              stock: ""
            });
            setIsSubmitting(false);
            return; // Exit if successful
          } else {
            const errorText = await response.text();
            console.error(`${url} Error response:`, errorText);
            lastError = `${response.status}: ${errorText}`;
          }
          
        } catch (urlError) {
          console.error(`${url} failed:`, urlError);
          lastError = urlError instanceof Error ? urlError.message : 'Network error';
        }
      }

      // If we get here, all URLs failed
      alert(`Fel vid skapande av produkt: ${lastError || 'Alla endpoints misslyckades'}.\n\nVill du aktivera Mock Mode för utveckling?`);
      
    } catch (error) {
      console.error('Network error creating product:', error);
      alert(`Fel vid skapande av produkt: ${error instanceof Error ? error.message : 'Okänt fel'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      title: "",
      articleNumber: "",
      category: "",
      description: "",
      price: "",
      imageUrl: "",
      stock: ""
    });
  };

  const deleteProduct = async (productId: number) => {
    if (!confirm('Är du säker på att du vill ta bort denna produkt?')) {
      return;
    }

    try {
      const urls = [
        `http://localhost:5044/api/products/${productId}`,
        `https://localhost:7051/api/products/${productId}`
      ];

      for (const url of urls) {
        try {
          console.log(`Trying to delete product at ${url}...`);
          const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Accept': 'application/json'
            }
          });

          if (response.ok) {
            console.log(`Product ${productId} deleted successfully`);
            // Remove the product from local state immediately
            setAllProducts(prev => prev.filter(p => p.id !== productId));
            alert('Produkten har tagits bort!');
            return; // Exit after successful deletion
          } else {
            const errorText = await response.text();
            console.error(`Delete failed at ${url}:`, errorText);
          }
        } catch (error) {
          console.error(`Failed to delete from ${url}:`, error);
        }
      }
      
      // If all URLs failed
      alert('Kunde inte ta bort produkten från backend');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Fel vid borttagning av produkt');
    }
  };

  return (
    <div className="products-container">
      <div className="d-flex justify-content-between align-items-center mt-4 mb-4 p-3 bg-light rounded">
        <div className="flex-grow-1 me-3">
          <SearchBar fullWidth={true} />
        </div>
        <button 
          className="btn btn-primary d-flex align-items-center"
          onClick={openModal}
          style={{ whiteSpace: 'nowrap' }}
        >
          <span className="material-symbols-outlined me-2">add</span>
          Skapa ny produkt
        </button>
      </div>
      
      <div className="d-flex justify-content-between align-items-center m-4">
        <div className="d-flex align-items-center gap-3">
          <h2>Produkter</h2>
          {loading && <span className="badge bg-warning">Laddar...</span>}
        </div>
      </div>
      
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '200px'}}>
          <div className="text-center">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Laddar...</span>
            </div>
            <p className="text-muted">Laddar produkter ...</p>
          </div>
        </div>
      ) : allProducts.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '200px'}}>
          <div className="text-center">
            <span className="material-symbols-outlined mb-3" style={{fontSize: '4rem', color: '#6c757d'}}>
              inventory_2
            </span>
            <h4 className="text-muted">Inga produkter hittades</h4>
            <p className="text-muted">Skapa din första produkt genom att klicka på "Skapa ny produkt"</p>
          </div>
        </div>
      ) : (
        <div className="row">
        {allProducts.map(product => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            <div className="card h-100">
              <div className="product-image-container">
                <img src={product.imageUrl} className="card-img-top product-image" alt={product.title} />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {product.title}
                  {product.articleNumber && <span className="product-size"> {product.articleNumber}</span>}
                </h5>
                <div className="stock-info mb-2">
                  {product.stock && product.stock > 0 ? (
                    <span className="stock-status in-stock">
                      <span className="stock-dot green-dot"></span>
                      <small>I lager ({product.stock} st)</small>
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
                    title="Lägg till i varukorg"
                  >
                    <span className="material-symbols-outlined add-shopping-cart">
                      add_shopping_cart
                    </span>
                  </button>
                  <button 
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center" 
                    style={{minWidth: '40px'}}
                    title="Ta bort produkt"
                  >
                    <span className="material-symbols-outlined">
                      delete
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Create Product Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Skapa ny produkt</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="title" className="form-label">Produktnamn *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="price" className="form-label">Pris (kr) *</label>
                      <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="articleNumber" className="form-label">Artikelnummer</label>
                      <input
                        type="text"
                        className="form-control"
                        id="articleNumber"
                        name="articleNumber"
                        value={formData.articleNumber}
                        onChange={handleInputChange}
                        placeholder="t.ex. SKR-M6-40"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="category" className="form-label">Kategori *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        placeholder="t.ex. Skruvar"
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="stock" className="form-label">Lagersaldo *</label>
                      <input
                        type="number"
                        className="form-control"
                        id="stock"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="imageUrl" className="form-label">Bild URL</label>
                      <input
                        type="url"
                        className="form-control"
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Beskrivning *</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closeModal}
                    disabled={isSubmitting}
                  >
                    Avbryt
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary d-flex align-items-center pt-2 pb-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Skapar...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined me-2" style={{fontSize: '1.1rem'}}>save</span>
                        Skapa produkt
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
