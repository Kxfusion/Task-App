import type { Task } from "../types/Task";
import { EmptyTable } from "./empty-table";
import { TaskList } from "./task-list";

type TaskTableParams = { tasks: Task[] }

export const TaskTable = ({ tasks }: TaskTableParams) => {
    return (
        <div className="border-t-2 mt-5">
            {tasks.length === 0 ? <EmptyTable />: <TaskList tasks={tasks} />}
        </div>
    );
};
