import db from '../config/db.js';

/**
 * Palace of Goodz - Item Model (PostgreSQL)
 */

// 1. Fetch all items with Creator details
export const getAllItems = async () => {
  const query = `
    SELECT 
      items.*, 
      users.username AS creator_name 
    FROM items 
    JOIN users ON items.creator_id = users.id 
    ORDER BY items.created_at DESC
  `;
  const result = await db.query(query);
  return result.rows;
};

// 2. Fetch a single item by ID
export const getItemById = async (id) => {
  const query = `
    SELECT 
      items.*, 
      users.username AS creator_name 
    FROM items 
    JOIN users ON items.creator_id = users.id 
    WHERE items.id = $1
  `;
  const result = await db.query(query, [id]);
  return result.rows[0];
};

// 3. Create a new "Good" in the Palace
export const createItem = async (itemData) => {
  const { 
    creator_id, 
    name, 
    description, 
    category, 
    price_pi, 
    image_url, 
    stock_count 
  } = itemData;

  const query = `
    INSERT INTO items (
      creator_id, 
      name, 
      description, 
      category, 
      price_pi, 
      image_url, 
      stock_count
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7) 
    RETURNING *;
  `;
  
  const values = [creator_id, name, description, category, price_pi, image_url, stock_count];
  const result = await db.query(query, values);
  return result.rows[0];
};

// 4. Update an existing item
export const updateItem = async (id, itemData) => {
  const { name, description, category, price_pi, image_url, stock_count } = itemData;
  const query = `
    UPDATE items 
    SET name = $1, description = $2, category = $3, price_pi = $4, image_url = $5, stock_count = $6
    WHERE id = $7
    RETURNING *;
  `;
  const values = [name, description, category, price_pi, image_url, stock_count, id];
  const result = await db.query(query, values);
  return result.rows[0];
};
