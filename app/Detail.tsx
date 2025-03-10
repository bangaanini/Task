"use client";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

interface Task {
  id: string | number;
  category: string;
  ecosystem: string;
  projectName: string;
  projectLink: string;
  taskDetails: string;
}

const Detail = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Fungsi untuk mengambil data task dari Supabase
  const fetchTasks = async () => {
    const { data, error } = await supabase.from("tasks").select("*");
    if (error) {
      console.error("Error fetching tasks: ", error);
    } else {
      console.log("Fetched tasks: ", data);
      setTasks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected value:", e.target.value);
    setSelectedTaskId(e.target.value);
  };

  // Pastikan perbandingan dilakukan dengan tipe data string
  const selectedTask = tasks.find((task) => task.id.toString() === selectedTaskId);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-white">Detail Task</h2>
      {loading ? (
        <p className="text-center text-white">Loading tasks...</p>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="projectSelect" className="block text-white font-bold mb-2">
              Pilih Proyek:
            </label>
            <select
              id="projectSelect"
              value={selectedTaskId}
              onChange={handleSelectChange}
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-400 bg-white"
            >
              <option value="" className="text-gray-500">-- Pilih Proyek --</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id.toString()} className="text-black truncate">
                  {task.projectName}
                </option>
              ))}
            </select>
          </div>
          {selectedTask ? (
            <div className="p-5 border rounded-lg shadow-md bg-blue-300">
              <p className="mb-2">
                <span className="font-medium">Link Proyek: </span>
                <a
                  href={selectedTask.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {selectedTask.projectLink}
                </a>
              </p>
              <p className="mb-4">
                <span className="font-medium">Detail Tugas: </span>
                {selectedTask.taskDetails}
              </p>
            </div>
          ) : (
            <p className="text-center text-white">Silahkan pilih proyek untuk melihat detail tugas.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
