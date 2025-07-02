import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "dsa tracker backend is running 🚀" });
});

// ✅ Problems route
app.get("/problems", async (req, res) => {
  try {
    const rows = await sql`
      SELECT 
        problems.id,
        problems.title,
        problems.difficulty,
        problems.link,
        topics.name AS topic,
        user_problems.status,
        user_problems.notes
      FROM problems
      LEFT JOIN topics ON problems.topic_id = topics.id
      LEFT JOIN user_problems ON problems.id = user_problems.problem_id
      ORDER BY problems.id
    `;
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching problems:", err);
    res.status(500).json({ error: "Failed to fetch problems" });
  }
});



app.post("/problems", async (req, res) => {
  const { title, difficulty, topic, link } = req.body;

  if (!title || !difficulty || !topic || !link) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1. Check if topic exists
    const existingTopic = await sql`
      SELECT * FROM topics WHERE name = ${topic}
    `;

    let topicId;

    if (existingTopic.length === 0) {
      // 2. Insert new topic with count = 1
      const inserted = await sql`
        INSERT INTO topics (name, problem_count)
        VALUES (${topic}, 1)
        RETURNING id
      `;
      topicId = inserted[0].id;
    } else {
      // 3. Use existing topic id and increment count
      topicId = existingTopic[0].id;
      await sql`
        UPDATE topics SET problem_count = problem_count + 1 WHERE id = ${topicId}
      `;
    }

    // 4. Insert new problem
    const insertedProblem = await sql`
      INSERT INTO problems (title, difficulty, topic_id, link)
      VALUES (${title}, ${difficulty}, ${topicId}, ${link})
      RETURNING *
    `;

    res.status(201).json({
      message: "Problem added successfully",
      problem: insertedProblem[0]
    });

  } catch (err) {
    console.error("❌ Error adding problem:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.put("/problems/:id/notes", async (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  try {
    await sql`
      UPDATE user_problems SET notes = ${notes}
      WHERE problem_id = ${id}
    `;
    res.status(200).json({ message: "Notes updated successfully" });
  } catch (err) {
    console.error("❌ Failed to update notes:", err);
    res.status(500).json({ error: "Failed to update notes" });
  }
});

// DB Test
async function initDB() {
  try {
    await sql`SELECT 1`; // simple check
    console.log("✅ Database initialized");
  } catch (error) {
    console.error("❌ Error initializing DB:", error);
  }
}

initDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
