import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../services/api';
import { Loader2, ShieldCheck, ArrowLeft, ShoppingCart } from 'lucide-react';

/**
 * Palace of Goodz - Product Details & Pi Payment Integration
 */
const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const { data } = await productApi.fetchById(id);
          setProduct(data);
        }
      } catch (err) {
        console.error("Palace retrieval error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handlePiPayment = async () => {
    if (!window.Pi) {
      alert("Pi SDK not detected. Please use the Pi Browser.");
      return;
    }

    setPurchasing(true);

    try {
      const paymentData = {
        amount: product.price,
        memo: `Purchase: ${product.name} from Palace of Goodz`,
        metadata: { productId: product.id },
      };

      const callbacks = {
        onReadyForServerApproval: (paymentId: string) => {
          console.log("Payment ready for approval:", paymentId);
          // Send paymentId to your backend at 50.87.138.35 for verification
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          console.log("Payment confirmed on blockchain:", txid);
          navigate('/dashboard');
        },
        onCancel: (paymentId: string) => setPurchasing(false),
        onError: (error: Error, payment?: any) => {
          console.error("Pi Payment Error:", error);
          setPurchasing(false);
        },
      };

      window.Pi.createPayment(paymentData, callbacks);
    } catch (err) {
      setPurchasing(false);
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-accent" size={48} /></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8 transition-colors">
        <ArrowLeft size={20} /> Back to Marketplace
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 aspect-square">
          <img 
            src={product.image_url || 'https://via.placeholder.com/600'} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-accent font-bold tracking-wider uppercase text-sm">{product.category}</span>
            <h1 className="text-4xl font-extrabold text-gray-900">{product.name}</h1>
            <p className="text-3xl font-black text-brand">{product.price} π</p>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            {product.description || "No description provided for this Good."}
          </p>

          <div className="pt-6 border-t border-gray-100 space-y-4">
            <button 
              onClick={handlePiPayment}
              disabled={purchasing}
              className="w-full bg-brand text-white py-4 rounded-2xl font-bold text-xl hover:bg-brand-dark transition-all flex items-center justify-center gap-3 shadow-lg shadow-brand/20 disabled:bg-gray-400"
            >
              {purchasing ? <Loader2 className="animate-spin" /> : <ShoppingCart size={24} />}
              {purchasing ? 'Initiating Transaction...' : 'Buy with Pi'}
            </button>
            
            <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
              <ShieldCheck size={18} /> Authenticity Verified by the Palace
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
