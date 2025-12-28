import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../services/api';
import { ArrowRight, ShoppingBag, Zap, Shield } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const { data } = await productApi.fetchInventory();
        // Just take the first 4 items for the featured section
        setFeaturedProducts(data.slice(0, 4));
      } catch (err) {
        console.error("Palace inventory sync failed:", err);
      } finally {
        setLoading(false);
      }
    };
    loadFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gray-900 rounded-3xl overflow-hidden text-white py-24 px-8 md:px-16">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            The Palace of <span className="text-accent">Goodz</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
            Discover a curated collection of rare electronics, apparel, and digital collectibles. 
            Secure transactions, verified creators, and premium logistics.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/inventory" className="btn-primary flex items-center gap-2 text-lg px-8 py-4">
              Enter the Palace <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-lg font-medium transition-all">
              Join the Collective
            </Link>
          </div>
        </div>
        {/* Decorative Background Element */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent/20 to-transparent pointer-events-none" />
      </section>

      {/* 2. FEATURES BANNER */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureItem 
          icon={<Zap className="text-yellow-500" />} 
          title="Fast Delivery" 
          desc="Global shipping with real-time tracking from our secure hubs." 
        />
        <FeatureItem 
          icon={<Shield className="text-blue-500" />} 
          title="Verified Auth" 
          desc="Every item in the Palace undergoes a multi-step authenticity check." 
        />
        <FeatureItem 
          icon={<ShoppingBag className="text-purple-500" />} 
          title="Secure Payments" 
          desc="Encrypted transactions powered by the Unified Layer infrastructure." 
        />
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Goodz</h2>
            <p className="text-gray-500 mt-2">The most sought-after items this week.</p>
          </div>
          <Link to="/inventory" className="text-accent font-semibold flex items-center gap-1 hover:underline">
            See All <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden mb-4">
                  <img 
                    src={product.image_url || 'https://via.placeholder.com/400'} 
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-bold text-gray-800">{product.name}</h3>
                <p className="text-accent font-bold mt-1">${product.price}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

// Helper Component
const FeatureItem = ({ icon, title, desc }) => (
  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
    <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
    <div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500 mt-1">{desc}</p>
    </div>
  </div>
);

export default Home;
