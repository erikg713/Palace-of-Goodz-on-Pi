import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Inventory from './pages/Inventory';
import Login from './pages/Login';

/**
 * Palace of Goodz - Main Application Shell
 * Manages the high-level routing and layout.
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          
          {/* Fallback for 404 - Not Found */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold text-gray-800">404</h1>
              <p className="text-gray-600">This Good is gone!</p>
            </div>
          } />
        </Routes>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

export default App;
