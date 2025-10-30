import type { ReactElement } from "react";
import CheckoutProgress from "../components/CheckoutProgress";
import { useBasket } from "../context/BasketContext";

export default function Basket(): ReactElement {
  const { basketItems, updateQuantity, removeFromBasket, getTotalAmount } = useBasket();
  
  const totalAmount = getTotalAmount();

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    removeFromBasket(productId);
  };

  return (
    <div className="container mt-4">
      <CheckoutProgress step={1} />
      <h1 className="mb-4">Varukorg</h1>
      
      {basketItems.length === 0 ? (
        <div className="text-center py-5">
          <h3>Din varukorg är tom</h3>
          <p className="text-muted">Lägg till produkter för att fortsätta med din beställning.</p>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Dina produkter</h5>
                
                {basketItems.map((item) => (
                  <div key={item.id} className="row align-items-center border-bottom py-3">
                    <div className="col-2">
                      <img src={item.imageUrl} alt={item.title} className="img-fluid rounded" style={{maxHeight: '80px', objectFit: 'cover'}} />
                    </div>
                    <div className="col-4">
                      <h6>{item.title}</h6>
                      {item.articleNumber && <small className="text-muted">{item.articleNumber}</small>}
                    </div>
                    <div className="col-2">
                      <div className="input-group input-group-sm">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input 
                          type="text" 
                          className="form-control text-center" 
                          value={item.quantity} 
                          readOnly 
                        />
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="col-2 text-end">
                      <strong>{item.price} kr</strong>
                    </div>
                    <div className="col-2 text-end">
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        Ta bort
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Ordersammanfattning</h5>
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>{totalAmount} kr</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Frakt:</span>
                  <span>Gratis</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Moms (25%):</span>
                  <span>{Math.round(totalAmount * 0.2)} kr</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Totalt:</strong>
                  <strong>{Math.round(totalAmount * 1.2)} kr</strong>
                </div>
                
                <button className="btn btn-primary w-100">Gå till kassan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}