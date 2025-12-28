/**
 * Palace of Goodz - Input Validation
 */
exports.validateProduct = (data) => {
  const errors = [];

  if (!data.name || data.name.length < 3) errors.push("Name must be at least 3 chars.");
  if (!data.price || isNaN(data.price) || parseFloat(data.price) <= 0) {
    errors.push("Valid Pi price is required.");
  }
  if (!['Electronics', 'Apparel', 'Collectibles', 'Digital'].includes(data.category)) {
    errors.push("Invalid category.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
