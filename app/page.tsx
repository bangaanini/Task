import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <TaskForm />
      <TaskTable />
    </div>
  );
}