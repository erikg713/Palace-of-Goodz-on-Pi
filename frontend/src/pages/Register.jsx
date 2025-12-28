import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../services/api';
import { User, Mail, Lock, ShieldCheck, Loader2, UserPlus } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' // Default role for Palace of Goodz users
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);
    try {
      // 2. Direct call to your backend at 50.87.138.35
      const { data } = await authApi.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // 3. Auto-login on success
      localStorage.setItem('access_token', data.token);
      localStorage.setItem('user_role', data.role);
      
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Palace server is unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white p-10 rounded-[2rem] shadow-2xl border border-gray-100">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand/10 rounded-2xl mb-4">
            <UserPlus className="text-brand" size={32} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Join the Palace</h1>
          <p className="text-gray-500 mt-2 font-medium">Create your unique Goodz profile</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Username */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" name="username" required onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand focus:bg-white transition-all outline-none"
                  placeholder="Pioneer123"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">User Type</label>
              <select 
                name="role" 
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none"
              >
                <option value="buyer">Buyer</option>
                <option value="creator">Creator</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" name="email" required onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none"
                placeholder="palace@example.com"
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" name="password" required onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Confirm</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" name="confirmPassword" required onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-brand text-white py-4 rounded-xl font-black text-lg hover:bg-brand-dark transition-all shadow-xl shadow-brand/20 disabled:bg-gray-400 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Enter the Palace'}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 font-medium">
          Already a resident?{' '}
          <Link to="/login" className="text-brand hover:underline font-bold">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
