const axios = require('axios');
const { pi: piConfig } = require('../config');

const piClient = axios.create({
  baseURL: 'https://api.minepi.com/v2',
  headers: {
    'Authorization': `Key ${piConfig.apiKey}`
  }
});

/**
 * Verifies a payment with the Pi Network Platform
 */
exports.getPiPayment = async (paymentId) => {
  try {
    const response = await piClient.get(`/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error('Pi API Error:', error.response?.data || error.message);
    throw new Error('Failed to fetch payment from Pi Network');
  }
};
