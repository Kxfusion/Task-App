'use server'

import { revalidateTag } from "next/cache";
import type { Task } from "../types/Task";

const isTask = (task: unknown): task is Task => {
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

const isTaskArray = (tasks: unknown): tasks is Task[] => {
    if (!Array.isArray(tasks)) {
        return false;
    }

    if (!tasks.every(isTask)) {
        return false;
    }

    return true;
};

const makeApiCall = async (path: string, method = 'GET', body?: unknown) => {
    const requestOptions: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        requestOptions.body = JSON.stringify(body);
    }

    console.log(requestOptions.body);

    return fetch(`http://localhost:4444${path}`, requestOptions);
};

export const getTasks = async () => {
    const response = await makeApiCall('/tasks');

    if (response.status !== 200) {
        console.log(response);
        return [];
    }

    const tasks = await response.json();

    if (isTaskArray(tasks)) {
        return tasks;
    }

    return [];
};

export const addTask = async (task: Task) => {
    const response = await makeApiCall('/tasks', 'POST', task);
    if (response.status !== 200) {
        throw(new Error('Invalid Task'));
    }

    revalidateTag('tasks');
};

export const updateTask = async (task: Task) => {
    await makeApiCall(`/tasks/${task.id}`, 'PUT', task);
    revalidateTag('tasks');
};

export const deleteTask = async (id: number) => {
    await makeApiCall(`/tasks/${id}`, 'DELETE');
    revalidateTag('tasks');
};
