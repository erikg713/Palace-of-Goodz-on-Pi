import Product from '../models/itemModel.js'; // Assuming you have a Mongoose/SQL model
import { removeFile } from '../utils/fileRemover.js';

/**
 * @desc    Create a new item (Good)
 * @route   POST /api/items
 * @access  Private (Creator/Admin)
 */
export const createItem = async (req, res) => {
  try {
    const { name, price, description, category, countInStock } = req.body;

    // The image path comes from the uploadMiddleware (Multer)
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.jpg';

    const item = await Product.create({
      user: req.user.id, // ID from protect middleware
      name,
      price,
      description,
      category,
      imageUrl,
      countInStock,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    // If DB save fails, we should delete the uploaded image to save space
    if (req.file) removeFile(req.file.path);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all items with optional filtering
 * @route   GET /api/items
 * @access  Public
 */
export const getItems = async (req, res) => {
  try {
    const keyword = req.query.keyword ? {
      name: { $regex: req.query.keyword, $options: 'i' }
    } : {};

    const items = await Product.find({ ...keyword });
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error fetching items" });
  }
};

/**
 * @desc    Get single item details
 * @route   GET /api/items/:id
 * @access  Public
 */
export const getItemById = async (req, res) => {
  try {
    const item = await Product.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Invalid Item ID" });
  }
};
