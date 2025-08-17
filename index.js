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
  max: 10,
  min: 2,
  idleTimeoutMillis: 30000,

  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  min: 2,
  idleTimeoutMillis: 30000,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

// Health check endpoint for Render
app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    res.status(200).json({ 
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
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async (req, res) => {
  const itemId = req.body.updatedItemId;
  const editTitle = req.body.updatedItemTitle;
  try {
    await db.query("UPDATE items SET title=$1 WHERE id = $2",[editTitle,itemId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const itemId = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM items WHERE id = $1",[itemId]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

process.on('SIGINT', async () => {
  console.log('Shutting down gracefully...');
  await db.end();
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
