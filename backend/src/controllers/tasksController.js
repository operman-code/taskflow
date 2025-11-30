import { pool } from '../db.js';

export const getTasks = async (req, res) => {
  const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
  res.json(result.rows);
};

export const createTask = async (req, res) => {
  const { title } = req.body;
  const result = await pool.query(
    "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
    [title]
  );
  res.json(result.rows[0]);
};

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
  res.json({ message: "Task deleted" });
};
