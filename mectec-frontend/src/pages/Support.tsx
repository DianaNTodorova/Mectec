import type { ReactElement } from "react";
import "../assets/styles/support.css";

export default function Support(): ReactElement {
  return (
    <div className="support-container">
      <div className="support-header text-center mb-5">
        <h1 className="display-4 fw-bold mb-3">Support & Hjälp</h1>
        <p className="lead text-muted">Vi är här för att hjälpa dig med alla dina frågor och behov</p>
      </div>

      <div className="row mb-5">
        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center support-card">
            <div className="card-body">
              <div className="support-icon mb-3">
                <span className="material-symbols-outlined">phone</span>
              </div>
              <h5 className="card-title">Ring oss</h5>
              <p className="card-text text-muted">Snabb hjälp per telefon</p>
              <h6 className="fw-bold">+46 123 456 789</h6>
              <small className="text-muted">Mån-Fre 08:00-17:00</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center support-card">
            <div className="card-body">
              <div className="support-icon mb-3">
                <span className="material-symbols-outlined">email</span>
              </div>
              <h5 className="card-title">E-post</h5>
              <p className="card-text text-muted">Skicka oss ett meddelande</p>
              <h6 className="fw-bold">support@mectec.se</h6>
              <small className="text-muted">Svar inom 24 timmar</small>
            </div>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <div className="card h-100 text-center support-card">
            <div className="card-body">
              <div className="support-icon mb-3">
                <span className="material-symbols-outlined">help</span>
              </div>
              <h5 className="card-title">Vanliga frågor</h5>
              <p className="card-text text-muted">Snabba svar på vanliga frågor</p>
              <button className="btn btn-outline-primary btn-sm">Läs FAQ</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card support-form-card">
            <div className="card-header bg-primary text-white">
              <h5 className="text-primary mb-0">
                Skicka en förfrågan
              </h5>
            </div>
            <div className="card-body">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">
                      <span className="material-symbols-outlined me-1">person</span>
                      Namn *
                    </label>
                    <input type="text" className="form-control" id="name" required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label">
                      <span className="material-symbols-outlined me-1">email</span>
                      E-postadress *
                    </label>
                    <input type="email" className="form-control" id="email" required />
                  </div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    <span className="material-symbols-outlined me-1">subject</span>
                    Ämne *
                  </label>
                  <select className="form-select" id="subject" required>
                    <option value="">Välj ämne...</option>
                    <option value="product">Produktfråga</option>
                    <option value="order">Beställning</option>
                    <option value="technical">Teknisk support</option>
                    <option value="billing">Fakturering</option>
                    <option value="other">Övrigt</option>
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="message" className="form-label">
                    <span className="material-symbols-outlined me-1">message</span>
                    Meddelande *
                  </label>
                  <textarea 
                    className="form-control" 
                    id="message" 
                    rows={6} 
                    placeholder="Beskriv ditt ärende så detaljerat som möjligt..."
                    required
                  ></textarea>
                </div>
                
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Skicka meddelande
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>


        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <span className="material-symbols-outlined me-2">schedule</span>
                Öppettider
              </h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Måndag - Fredag:</span>
                <strong>08:00 - 17:00</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Lördag:</span>
                <strong>09:00 - 14:00</strong>
              </div>
              <div className="d-flex justify-content-between">
                <span>Söndag:</span>
                <strong>Stängt</strong>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <span className="material-symbols-outlined me-2">link</span>
                Snabblänkar
              </h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-secondary btn-sm text-start">
                  <span className="material-symbols-outlined me-2">download</span>
                  Ladda ner kataloger
                </button>
                <button className="btn btn-outline-secondary btn-sm text-start">
                  <span className="material-symbols-outlined me-2">receipt</span>
                  Spåra beställning
                </button>
                <button className="btn btn-outline-secondary btn-sm text-start">
                  <span className="material-symbols-outlined me-2">policy</span>
                  Användarvillkor
                </button>
                <button className="btn btn-outline-secondary btn-sm text-start">
                  <span className="material-symbols-outlined me-2">local_shipping</span>
                  Leveransinformation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}