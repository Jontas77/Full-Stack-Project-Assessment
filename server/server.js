const express = require("express");
const cors = require("cors");
const ID = require("nodejs-unique-numeric-id-generator");
const url = require("url");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.connect();


// GET "/"
app.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM videos');
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// POST "/"
app.post("/", async (req, res) => {
  try {
  const newVideo = {
    id: ID.generate(new Date().toJSON()),
    ...req.body,
  };

  const { id, title, vidurl, rating } = newVideo;
 
    const myURL = new URL(vidurl);
    if (!title || title === "" || !vidurl || vidurl === "") {
      return res.status(400).json({
        result: "failure",
        message: "Video could not be saved",
      });
    }
    await pool.query('INSERT INTO videos (id, title, vidurl, rating) VALUES ($1, $2, $3, $4)', [id, title, vidurl, rating]);
    res.json({ id: `${id}`})
  } catch (error) {
    console.log(`${Date().toString()}: ${error.input} is not a valid url`);
    return res.status(400).send(`${error.input} is not a valid url`);
  }

});

// GET "/:id"
app.get("/:id", async (req, res) => {
try {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM videos WHERE id = $1', [id]);
  res.json(result.rows)
} catch (error) {
  console.error(error.message)
}
  
});

// DELETE "/:id"
app.delete("/:id", async (req, res) => {
try {
  const { id } = req.params;
  await pool.query('DELETE FROM videos WHERE id = $1', [id]);
  res.send(`Video Deleted!`)
} catch (error) {
  console.error(error.message)
}

});

// UPDATE votes
app.put("/incr/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const result = await pool.query('UPDATE videos SET rating = $1 + 1 WHERE id = $2', [rating, id]);
    res.send('Votes Updated!')
  } catch (error) {
    console.error(error.message)
  }
});

app.put("/decr/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;
    const result = await pool.query('UPDATE videos SET rating = $1 - 1 WHERE id = $2', [rating, id]);
    res.send('Votes Updated!')
  } catch (error) {
    console.error(error.message)
  }
});
// pool.end();
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));


