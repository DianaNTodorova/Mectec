import type { ReactElement } from "react";

export default function Support(): ReactElement {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <h1 className="mb-6">Support</h1>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Kontakta oss</h5>
                  <p className="card-text">
                    <strong>Telefon:</strong> +46 123 456 789<br />
                    <strong>Email:</strong> support@mectec.se<br />
                    <strong>Öppettider:</strong> Mån-Fre 08:00-17:00
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Vanliga frågor</h5>
                  <p className="card-text">
                    Hitta svar på de vanligaste frågorna om våra produkter och tjänster.
                  </p>
                  <button className="btn btn-primary">Läs FAQ</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Skicka en förfrågan</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Namn</label>
                  <input type="text" className="form-control" id="name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Ämne</label>
                  <input type="text" className="form-control" id="subject" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Meddelande</label>
                  <textarea className="form-control" id="message" rows={5} required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Skicka</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}