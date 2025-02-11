import { PrismaClient, Task } from "@prisma/client";

const db = new PrismaClient();

const getTasks = async () => {
    return db.task.findMany({
        orderBy: [
            {
                completed: 'asc',
            },
            {
                id: 'asc',
            },
        ]
    });
};

const updateTask = async (id: number, updatedFields: Partial<Task>) => {
    await db.task.update({
        where: {
            id,
        },
        data: updatedFields
    });
}

const createTask = async (newTask: Partial<Task>) => {
    await db.task.create({ data: newTask as Task });
}

const deleteTask = async (id: number) => {
    await db.task.delete({
        where: {
            id,
        }
    });
}

export {
    getTasks,
    updateTask,
    createTask,
    deleteTask,
};
