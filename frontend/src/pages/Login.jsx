import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('Initializing Pi SDK...');

  useEffect(() => {
    // 1. Check if the Pi SDK is available (must be opened in Pi Browser)
    if (window.Pi) {
      setStatus('Authenticating with Pi Network...');
      
      try {
        window.Pi.authenticate(['username', 'payments'], function (auth) {
          console.log('Pi Auth Success:', auth.user);
          
          // 2. Store the Pi User data
          localStorage.setItem('pi_user', JSON.stringify(auth.user));
          localStorage.setItem('access_token', auth.accessToken);
          
          // 3. Redirect to the marketplace dashboard
          navigate('/dashboard');
        }, function (error) {
          console.error('Pi Auth Error:', error);
          setStatus('Authentication failed. Please try again.');
        });
      } catch (err) {
        setStatus('Error connecting to Pi Network.');
      }
    } else {
      // 4. Fallback for standard browsers
      setStatus('Pi SDK not detected. Please open this app inside the Pi Browser.');
    }
  }, [navigate]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm text-center space-y-6 p-10 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="flex justify-center">
          <div className="p-4 bg-accent/10 rounded-full">
            <Loader2 className="animate-spin text-accent" size={40} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Palace Authentication</h1>
        <p className="text-gray-600 leading-relaxed">
          {status}
        </p>
        {!window.Pi && (
          <button 
            onClick={() => window.location.reload()}
            className="w-full bg-brand text-white py-3 rounded-xl font-bold hover:bg-brand-dark transition-all"
          >
            Retry Connection
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
