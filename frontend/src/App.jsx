import { useState, useEffect } from "react";

const API = "http://13.212.82.190:4000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    load();
  };

  const remove = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 30 }}>
      <h1>TaskFlow</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add task"
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.title}
            <button onClick={() => remove(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
