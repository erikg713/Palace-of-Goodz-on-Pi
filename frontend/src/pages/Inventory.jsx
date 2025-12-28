import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../services/api';
import { Search, Filter, SlidersHorizontal, PackageSearch, Tag } from 'lucide-react';

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Apparel', 'Collectibles', 'Digital'];

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const { data } = await productApi.fetchInventory();
        setItems(data);
        setFilteredItems(data);
      } catch (err) {
        console.error("Palace inventory fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // Handle Filtering and Searching
  useEffect(() => {
    let result = items;
    if (activeCategory !== 'All') {
      result = result.filter(item => item.category === activeCategory);
    }
    if (search) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredItems(result);
  }, [search, activeCategory, items]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 1. Page Header */}
      <div className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Palace Inventory</h1>
        <p className="text-gray-500 mt-2 text-lg">Browse the finest selection of Goodz curated for the community.</p>
      </div>

      {/* 2. Controls: Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Search by name or description..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? 'bg-brand text-white shadow-lg shadow-brand/20' 
                : 'bg-white text-gray-600 border border-gray-100 hover:border-brand'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-4 border border-gray-100 space-y-4">
              <div className="aspect-square bg-gray-100 animate-pulse rounded-2xl" />
              <div className="h-4 bg-gray-100 animate-pulse w-3/4 rounded" />
              <div className="h-4 bg-gray-100 animate-pulse w-1/2 rounded" />
            </div>
          ))}
        </div>
      ) : filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredItems.map(item => (
            <Link 
              to={`/product/${item.id}`} 
              key={item.id}
              className="group bg-white rounded-3xl border border-gray-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square relative overflow-hidden bg-gray-50">
                <img 
                  src={item.image_url || 'https://via.placeholder.com/400'} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-brand border border-brand/10">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 truncate">{item.name}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-black text-brand">{item.price} <span className="text-sm">π</span></p>
                  <span className="text-xs font-medium text-gray-400 flex items-center gap-1">
                    <Tag size={12} /> ID: {item.id.toString().slice(0, 5)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <PackageSearch size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900">No Goodz Found</h3>
          <p className="text-gray-500">Try adjusting your search or category filters.</p>
        </div>
      )}
    </div>
  );
};

export default Inventory;
