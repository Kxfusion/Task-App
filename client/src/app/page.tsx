import { Button } from "./components/basics/button";
import { TaskInfo } from "./components/task-info";
import { TaskTable } from "./components/task-table";
import { getTasks } from "./server/tasks";
import type { Task } from "./types/Task";

export const dynamic = 'force-dynamic';
export default async function Dashboard() {
  const tasks = await getTasks();

  const isCompleted = (task: Task) => task.completed;

  return (
    <div className="h-full p-1 md:w-[50%] m-auto">
      <Button text="Create Task" margin="-mt-5" />
      <TaskInfo 
        createdCount={tasks.length}
        completedCount={tasks.filter(isCompleted).length}
      />
      <TaskTable tasks={tasks} />
    </div>
  );
}
