"use client";

import { useState } from "react";
import { supabase } from "./lib/supabase"; // Pastikan path sesuai dengan struktur proyekmu

const TaskForm = () => {
  const [task, setTask] = useState({
    category: "",
    ecosystem: "",
    nama_proyek: "",
    link_proyek: "",
    task: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("tasks").insert([task]);
    if (error) {
      console.error("Error inserting task:", error);
    } else {
      alert("Task added successfully!");
      setTask({ category: "", ecosystem: "", nama_proyek: "", link_proyek: "", task: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg shadow-lg max-w-md mx-auto bg-white">
      <input
        type="text"
        name="category"
        value={task.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="ecosystem"
        value={task.ecosystem}
        onChange={handleChange}
        placeholder="Ecosystem"
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="nama_proyek"
        value={task.nama_proyek}
        onChange={handleChange}
        placeholder="Project Name"
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="url"
        name="link_proyek"
        value={task.link_proyek}
        onChange={handleChange}
        placeholder="Project Link"
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        name="task"
        value={task.task}
        onChange={handleChange}
        placeholder="Task Details"
        className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="w-full bg-blue-500 text-white px-4 py-3 rounded-md shadow-md hover:bg-blue-600 transition duration-300">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
