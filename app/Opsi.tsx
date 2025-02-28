"use client";

import { useState } from "react";
import TaskForm from ".//TaskForm";
import TaskTable from "./TaskTable";
import Detail from "./Detail";

const Opsi = () => {
  const [selectedComponent, setSelectedComponent] = useState("TaskForm");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(e.target.value);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-blue-400 rounded-b-md shadow-lg">
      {/* Dropdown untuk memilih komponen */}
      <div className="mb-6 mx-auto bg-blue-400 rounded-b-md shadow-lg">
        <label
          htmlFor="componentSelect"
          className="block text-gray-700 font-medium mb-2 bg-blue-300 rounded-b-md p-2"
        >
          Pilih Menu:
        </label>
        <select
          id="componentSelect"
          value={selectedComponent}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="TaskForm" className="bg-white text-black hover:bg-gray-200 rounded">
            Task Form
          </option>
          <option value="TaskTable" className="bg-white text-black hover:bg-gray-200 rounded">
            Task Table
          </option>
          <option value="Detail" className="bg-white text-black hover:bg-gray-200 rounded">
            Detail
          </option>
        </select>
      </div>

      {/* Render komponen berdasarkan pilihan */}
      <div>
        {selectedComponent === "TaskForm" && <TaskForm />}
        {selectedComponent === "TaskTable" && <TaskTable />}
        {selectedComponent === "Detail" && <Detail />}
      </div>
    </div>
  );
};

export default Opsi;
