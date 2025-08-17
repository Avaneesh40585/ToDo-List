import express from "express";
import pg from "pg";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const db = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  min: 2,
  idleTimeoutMillis: 30000,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// DIRECTLY create table
async function createTable() {
  try {
    console.log("Creating items table...");
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Items table created successfully");
    
    await db.query(`
      INSERT INTO items (title) 
      SELECT unnest(ARRAY['Buy milk', 'Finish homework', 'Deploy to Render'])
      WHERE NOT EXISTS (SELECT 1 FROM items LIMIT 1)
    `);
    console.log("Sample data added");
    
  } catch (err) {
    console.error("Error creating table:", err);
    throw err;
  }
}

app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.json({ 
      status: "healthy", 
      timestamp: new Date().toISOString(),
      database: "connected"
    });
  } catch (error) {
    res.status(500).json({ 
      status: "unhealthy", 
      error: error.message 
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");
    let items = result.rows;
    res.render("index.ejs", {
      listTitle: "ToDo-List",
      listItems: items,
    });
  } catch (err) {
    console.log("Error fetching items:", err);
    res.status(500).send("Error loading todo items.");
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.log("Error adding item:", err);
    res.status(500).send("Error adding item.");
  }
});

app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId;
  const editTitle = req.body.updatedItemTitle;
  try {
    await db.query("UPDATE items SET title=$1 WHERE id = $2", [editTitle, itemId]);
    res.redirect("/");
  } catch (err) {
    console.log("Error updating item:", err);
    res.status(500).send("Error updating item.");
  }
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1", [itemId]);
    res.redirect("/");
  } catch (err) {
    console.log("Error deleting item:", err);
    res.status(500).send("Error deleting item.");
  }
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await db.end();
  process.exit(0);
});

// Create table and start server
console.log("Starting application...");
createTable()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to create table:", err);
    process.exit(1);
  });
