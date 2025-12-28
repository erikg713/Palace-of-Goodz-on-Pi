import React, { useEffect, useState } from 'react';
import { productApi } from '../services/api';
import { Search, Filter, ShoppingCart, Tag } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
  description: string;
}

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Collectibles', 'Apparel', 'Digital'];

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const { data } = await productApi.fetchInventory();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Failed to sync with Palace inventory", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGoods();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(result);
  }, [searchTerm, activeCategory, products]);

  return (
    <div className="space-y-8">
      {/* 1. Header & Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">The Grand Marketplace</h1>
          <p className="text-gray-500">Discover authentic goods within the Pi ecosystem.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search the Palace..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent outline-none shadow-sm transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Category Filter Chips */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              activeCategory === cat 
              ? 'bg-brand text-white shadow-md' 
              : 'bg-white text-gray-600 border border-gray-200 hover:border-accent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="aspect-square relative overflow-hidden bg-gray-50">
                <img 
                  src={product.image_url || 'https://via.placeholder.com/400'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-700 flex items-center gap-1 shadow-sm">
                    <Tag size={12} className="text-accent" /> {product.category}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-bold text-gray-900 group-hover:text-accent transition-colors">{product.name}</h3>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-xl font-black text-brand">{product.price} <span className="text-sm font-medium">π</span></p>
                  <button className="p-2 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white transition-colors">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No goods found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
