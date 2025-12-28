import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  LayoutDashboard, 
  PlusSquare, 
  LogOut,
  Store
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mock authentication check - replace with your actual Auth logic/context
  const token = localStorage.getItem('access_token');
  const userRole = localStorage.getItem('user_role'); // 'buyer' or 'creator'

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const navLinks = [
    { name: 'Marketplace', path: '/inventory', icon: <Store size={18} /> },
  ];

  // Protected links based on role
  if (token) {
    navLinks.push({ name: 'My Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> });
    if (userRole === 'creator') {
      navLinks.push({ name: 'List Item', path: '/create-item', icon: <PlusSquare size={18} /> });
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* 1. Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center shadow-lg shadow-brand/30">
              <ShoppingBag className="text-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900">
              PALACE OF <span className="text-brand">GOODZ</span>
            </span>
          </Link>

          {/* 2. Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 font-bold text-sm transition-colors ${
                  location.pathname === link.path ? 'text-brand' : 'text-gray-600 hover:text-brand'
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            {token ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-red-500 font-bold text-sm transition-all"
              >
                <LogOut size={18} />
                Exit
              </button>
            ) : (
              <Link to="/login" className="btn-primary py-2 px-6">
                Join
              </Link>
            )}
          </div>

          {/* 3. Mobile Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 font-bold text-gray-900"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
            {!token && (
              <Link 
                to="/login" 
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand text-white py-4 rounded-2xl font-black"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
