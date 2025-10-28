import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Support from './pages/Support';
import Basket from './pages/Basket';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Navbar />
      <div >
        <Routes>  
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/support" element={<Support />} />
          <Route path="/login" element={<Login />} />
          <Route path="/basket" element={<Basket />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
