import TaskTable from "../TaskTable";
import TaskForm from "../TaskForm";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <TaskForm />
      <TaskTable />
    </div>
  );
}
