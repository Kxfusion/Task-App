'use server'

import { revalidatePath } from "next/cache";
import type { Task } from "../types/Task";
import { isTaskArray } from "../validation/validate-task";

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

    return fetch(`http://localhost:4444${path}`, requestOptions);
};

export const getTasks = async () => {
    try {
        const response = await makeApiCall('/tasks');

        if (response.status !== 200) {
            console.log(response);
            return [];
        }
    
        const tasks = await response.json();
    
        if (isTaskArray(tasks)) {
            return tasks;
        }
    } catch (e) {
        console.log(e);
        return [];
    }

    return [];
};

export const addTask = async (task: Task) => {
    console.log(task);

    const response = await makeApiCall('/tasks', 'POST', task);
    if (response.status !== 200) {
        throw(new Error('Invalid Task'));
    }

    console.log(response);

    revalidatePath('http://localhost:4444');
};

export const updateTask = async (task: Task) => {
    await makeApiCall(`/tasks/${task.id}`, 'PUT', task);
    revalidatePath('http://localhost:4444');
};

export const deleteTask = async (id: number) => {
    await makeApiCall(`/tasks/${id}`, 'DELETE');
    revalidatePath('http://localhost:4444');
};
