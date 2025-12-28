export const ItemModel = {
  createTable: `
    CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      creator_id INTEGER REFERENCES users(id),
      name TEXT,
      description TEXT,
      price_pi INTEGER,
      file_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `,
};
import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;

// backend/models/itemModel.js
import db from '../config.js';

export const getAllItems = async () => {
  const result = await db.query('SELECT * FROM items ORDER BY created_at DESC');
  return result.rows;
};

export const getItemById = async (id) => {
  const result = await db.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
};

export const createItem = async (item) => {
  const { name, description, price, image_url, creator_id } = item;
  const result = await db.query(
    `INSERT INTO items (name, description, price, image_url, creator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, description, price, image_url, creator_id]
  );
  return result.rows[0];
};
import mongoose from 'mongoose';

const itemSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, default: 0 }, // Price in Pi
  countInStock: { type: Number, required: true, default: 0 },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
export default Item;
