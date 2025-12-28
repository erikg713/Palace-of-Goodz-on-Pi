import React, { useState } from 'react';
import { Loader2, Wallet } from 'lucide-react';

/**
 * Palace of Goodz - Pi Network Payment Component
 * Handles the Pi SDK payment flow and server-side verification.
 */
const PiPayButton = ({ amount, memo, productId, onSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const startPayment = async () => {
    if (!window.Pi) {
      alert("Please open this app in the Pi Browser to complete the transaction.");
      return;
    }

    setIsProcessing(true);

    try {
      const paymentData = {
        amount: parseFloat(amount),
        memo: memo,
        metadata: { productId: productId },
      };

      const callbacks = {
        // Step 1: Pi App asks your server if this payment is valid
        onReadyForServerApproval: async (paymentId) => {
          console.log("Payment created, awaiting server approval:", paymentId);
          // You would typically hit your backend here to 'approve' the paymentId
          // axios.post('/api/payments/approve', { paymentId });
        },

        // Step 2: Transaction is signed and submitted to the blockchain
        onReadyForServerCompletion: async (paymentId, txid) => {
          console.log("Transaction submitted to blockchain. TXID:", txid);
          // Notify your backend to 'complete' the order in your database
          // await axios.post('/api/payments/complete', { paymentId, txid });
          
          setIsProcessing(false);
          if (onSuccess) onSuccess(txid);
        },

        onCancel: (paymentId) => {
          console.log("User cancelled payment:", paymentId);
          setIsProcessing(false);
        },

        onError: (error, payment) => {
          console.error("Pi Payment Error:", error);
          setIsProcessing(false);
          alert("Payment failed. Please check your Pi Wallet balance.");
        },
      };

      // Execute the SDK payment flow
      window.Pi.createPayment(paymentData, callbacks);
      
    } catch (err) {
      console.error("Internal Payment Error:", err);
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={startPayment}
      disabled={isProcessing || !amount}
      className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-lg transition-all shadow-lg 
        ${isProcessing 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-brand hover:bg-brand-dark text-white shadow-brand/20 active:scale-[0.98]'
        }`}
    >
      {isProcessing ? (
        <>
          <Loader2 className="animate-spin" size={24} />
          Confirming on Pi Chain...
        </>
      ) : (
        <>
          <Wallet size={24} />
          Pay {amount} π
        </>
      )}
    </button>
  );
};

export default PiPayButton;
