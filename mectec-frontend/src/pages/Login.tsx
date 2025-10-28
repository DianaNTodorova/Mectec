import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ReactElement } from "react";
import imgLogo from '../assets/images/mectec-logo-2.png';

export default function Login(): ReactElement {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {
      email: '',
      password: ''
    };

    if (!formData.email) {
      newErrors.email = 'E-postadress krävs';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ogiltig e-postadress';
    }

    if (!formData.password) {
      newErrors.password = 'Lösenord krävs';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Lösenord måste vara minst 6 tecken';
    }

    setErrors(newErrors);

    // If no errors, proceed with login
    if (!newErrors.email && !newErrors.password) {
      console.log('Login attempt:', formData);
      // Here you would typically call your authentication API
      alert('Inloggning lyckades! (Demo)');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <div className="text-center mb-4">
                <h2 className="fw-bold text-primary"><img src={imgLogo} alt="Mectec" className="navbar-logo" style={{ height: '120px' }} /></h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-postadress</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="din@email.com"
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Lösenord</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Ange ditt lösenord"
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Kom ihåg mig
                  </label>
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Logga in
                </button>

                <div className="text-center">
                  <Link to="/forgot-password" className="text-decoration-none">
                    Glömt lösenord?
                  </Link>
                </div>
              </form>

              <hr className="my-4" />

              <div className="text-center">
                <p className="mb-0">Har du inget konto?</p>
                <Link to="/register" className="btn btn-outline-primary mt-2">
                  Skapa konto
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-3">
            <small className="text-muted">
              Genom att logga in godkänner du våra{' '}
              <Link to="/terms" className="text-decoration-none">Användarvillkor</Link>
              {' '}och{' '}
              <Link to="/privacy" className="text-decoration-none">Integritetspolicy</Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}