import type { ReactElement } from "react";

export default function Basket(): ReactElement {
  // Mock basket items - in a real app, this would come from state management
  const basketItems = [
    {
      id: 1,
      name: "Precision Tool A",
      price: 1250,
      quantity: 2,
      image: "https://via.placeholder.com/80x80"
    },
    {
      id: 2,
      name: "Industrial Component B",
      price: 850,
      quantity: 1,
      image: "https://via.placeholder.com/80x80"
    }
  ];

  const totalAmount = basketItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container mt-4">
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
                      <img src={item.image} alt={item.name} className="img-fluid rounded" />
                    </div>
                    <div className="col-4">
                      <h6>{item.name}</h6>
                    </div>
                    <div className="col-2">
                      <div className="input-group input-group-sm">
                        <button className="btn btn-outline-secondary" type="button">-</button>
                        <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                        <button className="btn btn-outline-secondary" type="button">+</button>
                      </div>
                    </div>
                    <div className="col-2 text-end">
                      <strong>{item.price} kr</strong>
                    </div>
                    <div className="col-2 text-end">
                      <button className="btn btn-sm btn-outline-danger">Ta bort</button>
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
                
                <button className="btn btn-primary w-100 mb-2">Gå till kassan</button>
                <button className="btn btn-outline-secondary w-100">Fortsätt handla</button>
              </div>
            </div>
            
            <div className="card mt-3">
              <div className="card-body">
                <h6 className="card-title">Kundservice</h6>
                <p className="card-text small">
                  Behöver du hjälp med din beställning?<br />
                  <strong>Telefon:</strong> +46 123 456 789<br />
                  <strong>Email:</strong> order@mectec.se
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}