"use client";

import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import { Task } from "./types/task";

const TaskTable = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterKategori, setFilterKategori] = useState("");
  const [filterEcosystem, setFilterEcosystem] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*");
      if (!error) setTasks(data || []);
    };
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      (filterKategori ? task.category === filterKategori : true) &&
      (filterEcosystem ? task.ecosystem === filterEcosystem : true)
  );

  return (
    <div className="p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Daftar Tugas</h2>

      <div className="mb-6 flex flex-col md:flex-row gap-4 justify-center">
      <input
        type="text"
        placeholder="Filter Kategori"
        className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filterKategori}
        onChange={(e) => setFilterKategori(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter Ecosystem"
        className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={filterEcosystem}
        onChange={(e) => setFilterEcosystem(e.target.value)}
      />
      </div>

      <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 rounded-lg">
        <thead>
        <tr className="bg-blue-500 text-white">
          <th className="border p-2">Kategori</th>
          <th className="border p-2">Nama Proyek</th>
          <th className="border p-2">Link</th>
        </tr>
        </thead>
        <tbody>
        {filteredTasks.map((task) => (
          <tr key={task.id} className="border hover:bg-blue-100">
          <td className="border p-2">{task.category}</td>
          <td className="border p-2">{task.projectName}</td>
          <td className="border p-2">
            <a href={task.projectLink} className="text-blue-500 hover:underline">
            {task.projectLink}
            </a>
          </td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default TaskTable;
