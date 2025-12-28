import * as ItemModel from '../models/itemModel.js';
import { removeFile } from '../utils/fileRemover.js';

/**
 * @desc    Fetch all marketplace Goodz
 * @route   GET /api/items
 * @access  Public
 */
export const getItems = async (req, res) => {
  try {
    const items = await ItemModel.getAllItems();
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to retrieve items." });
  }
};

/**
 * @desc    Fetch a single Good's details
 * @route   GET /api/items/:id
 * @access  Public
 */
export const getItemById = async (req, res) => {
  try {
    const item = await ItemModel.getItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found in the Palace." });
    }
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching item details." });
  }
};

/**
 * @desc    List a new Good (Create)
 * @route   POST /api/items
 * @access  Private (Creator/Admin)
 */
export const createItem = async (req, res) => {
  try {
    const { name, description, category, price_pi, stock_count } = req.body;
    
    // Image handling from Multer middleware
    const image_url = req.file ? `/uploads/${req.file.filename}` : '/uploads/placeholder.jpg';

    const itemData = {
      creator_id: req.user.id, // Injected by protectRoutes middleware
      name,
      description,
      category,
      price_pi,
      image_url,
      stock_count
    };

    const newItem = await ItemModel.createItem(itemData);
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    // Clean up uploaded file if DB entry fails
    if (req.file) removeFile(req.file.path);
    res.status(400).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update a Good's listing
 * @route   PUT /api/items/:id
 * @access  Private (Creator/Admin)
 */
export const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const existingItem = await ItemModel.getItemById(id);

    if (!existingItem) {
      return res.status(404).json({ success: false, message: "Item not found." });
    }

    // Authorization: Only the original creator or an admin can edit
    if (existingItem.creator_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Not authorized to edit this listing." });
    }

    const itemData = {
      name: req.body.name || existingItem.name,
      description: req.body.description || existingItem.description,
      category: req.body.category || existingItem.category,
      price_pi: req.body.price_pi || existingItem.price_pi,
      image_url: req.file ? `/uploads/${req.file.filename}` : existingItem.image_url,
      stock_count: req.body.stock_count || existingItem.stock_count
    };

    const updatedItem = await ItemModel.updateItem(id, itemData);
    res.json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
