import type { Task } from "../types/Task";
import { Card } from "./basics/card";

type TaskListParams = { tasks: Task[] };

export const TaskList = ({ tasks }: TaskListParams) => {
    return (
        <div>
            {tasks.map((task) => <Card key={task.id} task={task} />)}
        </div>
    );
};
