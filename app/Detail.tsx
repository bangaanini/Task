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
  completed: boolean;
}

const Detail = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // Ambil data tugas dari Supabase
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

  // Reset status tugas setiap hari
  const resetTasksDaily = async () => {
    const lastReset = localStorage.getItem("lastResetDate");
    const today = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
    if (lastReset !== today) {
      // Update semua task: completed = false
      const { error } = await supabase.from("tasks").update({ completed: false });
      if (error) {
        console.error("Error resetting tasks: ", error);
      } else {
        console.log("Tasks reset for today.");
      }
      localStorage.setItem("lastResetDate", today);
    }
  };

  useEffect(() => {
    resetTasksDaily();
    fetchTasks();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("Selected value:", e.target.value);
    setSelectedTaskId(e.target.value);
  };

  // Pastikan perbandingan dilakukan dengan tipe data string
  const selectedTask = tasks.find((task) => task.id.toString() === selectedTaskId);

  // Jika checkbox di-click untuk menandai task sebagai selesai
  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && selectedTask && !selectedTask.completed) {
      const { error } = await supabase
        .from("tasks")
        .update({ completed: true })
        .eq("id", selectedTask.id);
      if (error) {
        console.error("Error marking task as completed: ", error);
      } else {
        alert("Task marked as completed!");
        fetchTasks();
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Detail Task</h2>
      {loading ? (
        <p className="text-center">Loading tasks...</p>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="projectSelect" className="block text-gray-700 font-medium mb-2">
              Pilih Proyek:
            </label>
            <select
              id="projectSelect"
              value={selectedTaskId}
              onChange={handleSelectChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value="">-- Pilih Proyek --</option>
              {tasks.map((task) => (
                <option key={task.id} value={task.id.toString()}>
                  {task.projectName}
                </option>
              ))}
            </select>
          </div>
          {selectedTask ? (
            <div className="p-4 border rounded shadow-md">
              <p className="mb-2">
                <span className="font-medium">Link Proyek: </span>
                <a
                  href={selectedTask.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  {selectedTask.projectLink}
                </a>
              </p>
              <p className="mb-4">
                <span className="font-medium">Detail Tugas: </span>
                {selectedTask.taskDetails}
              </p>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedTask.completed}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">Tandai sebagai selesai</span>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Silahkan pilih proyek untuk melihat detail tugas.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
