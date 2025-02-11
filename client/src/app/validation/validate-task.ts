import type { Task } from "../types/Task";

export const isTask = (task: unknown): task is Task => {
    if (!task) {
        return false;
    }

    if (typeof task !== 'object') {
        return false;
    }

    if (!('title' in task) || typeof task.title !== 'string') {
        return false;
    }

    if (!('color' in task) || typeof task.color !== 'string') {
        return false;
    }

    if (!('completed' in task) || typeof task.completed !== 'boolean') {
        return false;
    }

    return true;
}

export const isTaskArray = (tasks: unknown): tasks is Task[] => {
    if (!Array.isArray(tasks)) {
        return false;
    }

    if (!tasks.every(isTask)) {
        return false;
    }

    return true;
};