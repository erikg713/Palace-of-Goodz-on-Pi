import React, { useState, useRef } from 'react';
import { productApi } from '../services/api';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';

const UploadForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Electronics',
    description: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB Limit
        alert("File is too large. Max 5MB.");
        return;
      }
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (imageFile) data.append('image', imageFile);

    try {
      await productApi.addGood(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      // Reset Form
      setFormData({ name: '', price: '', category: 'Electronics', description: '' });
      removeImage();
    } catch (err) {
      console.error("Palace Upload Error:", err);
      alert("Upload failed. Verify server connection at 50.87.138.35");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <Upload className="text-brand" /> List New Goodz
      </h2>

      <div className="space-y-6">
        {/* Image Upload Area */}
        <div className="relative">
          {!preview ? (
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center cursor-pointer hover:border-brand hover:bg-brand/5 transition-all"
            >
              <ImageIcon className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-600 font-bold">Click to upload product image</p>
              <p className="text-gray-400 text-xs mt-1">PNG, JPG up to 5MB</p>
            </div>
          ) : (
            <div className="relative rounded-3xl overflow-hidden aspect-video bg-gray-100">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <button 
                type="button" onClick={removeImage}
                className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
        </div>

        {/* Text Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Item Name</label>
            <input name="name" value={formData.name} onChange={handleInputChange} required className="input-field" placeholder="Ex: Vintage Watch" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-bold text-gray-700">Price (π)</label>
            <input name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} required className="input-field" placeholder="0.00" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700">Category</label>
          <select name="category" value={formData.category} onChange={handleInputChange} className="input-field appearance-none">
            <option>Electronics</option>
            <option>Apparel</option>
            <option>Collectibles</option>
            <option>Digital</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-bold text-gray-700">Description</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} rows={4} className="input-field resize-none" placeholder="Describe the rarity and quality..." />
        </div>

        <button 
          type="submit" disabled={loading}
          className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2 shadow-lg
            ${success ? 'bg-green-500 text-white' : 'bg-brand text-white hover:bg-brand-dark shadow-brand/20'}
            ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? <Loader2 className="animate-spin" /> : success ? <CheckCircle2 /> : <Upload />}
          {loading ? 'Uploading to Palace...' : success ? 'Listed Successfully!' : 'Confirm Listing'}
        </button>
      </div>
    </form>
  );
};

export default UploadForm;
