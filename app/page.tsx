import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import Detail from "./Detail";


export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <TaskForm />
      <TaskTable />
      <Detail />
    </div>
  );
}