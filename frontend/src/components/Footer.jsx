import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Twitter, Github, Mail, ShieldCheck, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* 1. Brand Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center shadow-md">
                <ShoppingBag className="text-white" size={18} />
              </div>
              <span className="text-lg font-black tracking-tighter text-gray-900">
                PALACE OF <span className="text-brand">GOODZ</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              The premier standalone marketplace for the Pi Network community. 
              Secure, verified, and community-driven commerce.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Github size={18} />} href="#" />
              <SocialIcon icon={<Mail size={18} />} href="#" />
            </div>
          </div>

          {/* 2. Marketplace Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Marketplace</h4>
            <ul className="space-y-4">
              <FooterLink to="/inventory">All Goodz</FooterLink>
              <FooterLink to="/inventory?cat=Electronics">Electronics</FooterLink>
              <FooterLink to="/inventory?cat=Apparel">Apparel</FooterLink>
              <FooterLink to="/inventory?cat=Collectibles">Collectibles</FooterLink>
            </ul>
          </div>

          {/* 3. Support & Trust */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Resources</h4>
            <ul className="space-y-4">
              <FooterLink to="/help">Help Center</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/shipping">Shipping Info</FooterLink>
            </ul>
          </div>

          {/* 4. Infrastructure Status */}
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-brand" size={20} /> Palace Security
            </h4>
            <div className="space-y-3">
              <StatusItem label="Blockchain" status="Pi Mainnet" />
              <StatusItem label="Server" status="Secure Node" />
              <StatusItem label="Location" status="Distributed" />
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-medium">
            © {currentYear} Palace of Goodz. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Globe size={14} />
              <span>English (US)</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <ShieldCheck size={14} />
              <span>SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components for consistency
const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-gray-500 hover:text-brand text-sm font-medium transition-colors">
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ icon, href }) => (
  <a href={href} className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-brand hover:text-white transition-all">
    {icon}
  </a>
);

const StatusItem = ({ label, status }) => (
  <div className="flex justify-between items-center text-xs">
    <span className="text-gray-400 font-medium">{label}</span>
    <span className="text-gray-900 font-bold">{status}</span>
  </div>
);

export default Footer;
