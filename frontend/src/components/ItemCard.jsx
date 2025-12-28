import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Tag } from 'lucide-react';

/**
 * Palace of Goodz - Reusable Product Card
 * Used in Home, Inventory, and Marketplace pages.
 */
const ItemCard = ({ item }) => {
  // Destructure with fallbacks to prevent "fuckups" if data is missing
  const {
    id = '0',
    name = 'Unnamed Good',
    price = '0.00',
    category = 'General',
    image_url = 'https://via.placeholder.com/400x400?text=No+Image',
    description = ''
  } = item;

  return (
    <div className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
      {/* 1. Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={image_url} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        
        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-brand border border-brand/10 shadow-sm">
            {category}
          </span>
        </div>

        {/* Hover Action Bar */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link 
            to={`/product/${id}`}
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-brand hover:text-white transition-colors shadow-xl"
            title="View Details"
          >
            <Eye size={20} />
          </Link>
          <button 
            className="p-3 bg-white text-gray-900 rounded-full hover:bg-brand hover:text-white transition-colors shadow-xl"
            title="Add to Cart"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand transition-colors truncate pr-2">
            {name}
          </h3>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[40px] leading-relaxed">
          {description || "A premium item curated for the Palace of Goodz community."}
        </p>

        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Price</p>
            <p className="text-2xl font-black text-brand flex items-baseline gap-1">
              {price} <span className="text-sm font-bold">π</span>
            </p>
          </div>
          
          <Link 
            to={`/product/${id}`}
            className="text-xs font-black text-gray-400 hover:text-brand flex items-center gap-1 transition-colors uppercase tracking-widest"
          >
            Details <Tag size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
