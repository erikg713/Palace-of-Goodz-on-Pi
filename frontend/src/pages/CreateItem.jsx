import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';

const CreateItem = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Electronics'
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare Multipart Form Data
    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('description', formData.description);
    data.append('category', formData.category);
    if (image) data.append('image', image);

    try {
      await productApi.addGood(data);
      alert('Item listed successfully in the Palace!');
      navigate('/inventory');
    } catch (err) {
      console.error("Submission failed", err);
      alert('Failed to list item. Check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">List New Goodz</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input 
            type="text" name="name" required onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-accent focus:border-accent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (USD)</label>
            <input 
              type="number" name="price" required onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
              <option>Electronics</option>
              <option>Collectibles</option>
              <option>Apparel</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea 
            name="description" rows="4" onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Image</label>
          <input type="file" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-teal-700" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-brand text-white py-3 rounded-lg font-bold hover:bg-brand-dark transition-colors disabled:bg-gray-400"
        >
          {loading ? 'Listing...' : 'List Item'}
        </button>
      </form>
    </div>
  );
};

export default CreateItem;
