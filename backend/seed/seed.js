import { sql } from "../config/db.js";

const SAMPLE_TOPICS = [
  "Arrays",
  "Trees",
  "Linked Lists",
  "Dynamic Programming",
  "Stacks",
];

const SAMPLE_PROBLEMS = [
  {
    title: "Two Sum",
    difficulty: "Easy",
    topic: "Arrays",
    link: "https://leetcode.com/problems/two-sum/",
    status: "solved",
    notes: "Solved using hashmap."
  },
  {
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    topic: "Trees",
    link: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
    status: "solved",
    notes: "BFS using queue."
  },
  {
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    topic: "Linked Lists",
    link: "https://leetcode.com/problems/merge-k-sorted-lists/",
    status: "revision",
    notes: "Need to practice with min-heap."
  },
  {
    title: "Maximum Subarray",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    link: "https://leetcode.com/problems/maximum-subarray/",
    status: "revision",
    notes: "Use Kadane’s algorithm."
  },
  {
    title: "Valid Parentheses",
    difficulty: "Easy",
    topic: "Stacks",
    link: "https://leetcode.com/problems/valid-parentheses/",
    status: "solved",
    notes: "Simple stack implementation."
  },
];

async function seedDatabase() {
  try {
    // Clear existing data
    await sql`TRUNCATE TABLE user_problems, problems, topics RESTART IDENTITY CASCADE`;

    // Insert topics
    const topicMap = {};
    for (const topicName of SAMPLE_TOPICS) {
      const inserted = await sql`
        INSERT INTO topics (name, problem_count)
        VALUES (${topicName}, 0)
        RETURNING id
      `;
      topicMap[topicName] = inserted[0].id;
    }

    // Insert problems + user_problems
    for (const problem of SAMPLE_PROBLEMS) {
      const topicId = topicMap[problem.topic];

      const insertedProblem = await sql`
        INSERT INTO problems (title, difficulty, topic_id, link)
        VALUES (${problem.title}, ${problem.difficulty}, ${topicId}, ${problem.link})
        RETURNING id
      `;

      await sql`
        UPDATE topics SET problem_count = problem_count + 1 WHERE id = ${topicId}
      `;

      await sql`
        INSERT INTO user_problems (problem_id, status, notes)
        VALUES (${insertedProblem[0].id}, ${problem.status}, ${problem.notes})
      `;
    }

    console.log("✅ DSA database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding DSA database:", error);
    process.exit(1);
  }
}

seedDatabase();
