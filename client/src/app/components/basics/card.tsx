'use client';

import Link from "next/link";
import type { Task } from "../../types/Task";
import { Trashcan } from "../icons/trashcan";
import { CheckedCircle } from "../icons/checked-circle";
import { EmptyCircle } from "../icons/empty-circle";
import { deleteTask, updateTask } from "@/app/server/tasks";

type CardParams = { task: Task };

export const Card = ({ task }: CardParams) => {
    return (
        <div className="bg-tlight border border-tlight rounded-lg p-0.5 mt-2 flex flex-row items-center place-content-between gap-3">
            <button
                className="cursor-pointer w-4 h-4"
                onClick={() => {
                    if (task.id) {
                        updateTask({ 
                            ...task,
                            completed: !task.completed,
                        });
                    }
                }}
            >
                    {task.completed ? <CheckedCircle color={task.color} /> : <EmptyCircle color={task.color} />}
            </button>
            <Link
                className="flex flex-row items-center place-content-between gap-3 grow"
                href={{ 
                    pathname: `/task`,
                    query: task
                }}
            >
                <div className="font-normal text-sm text-start text-twhite grow">
                    {task.completed ? (<s>{task.title}</s>) : task.title}
                </div>
            </Link>
            <button
                className="cursor-pointer mr-1.5"
                onClick={() => { 
                    if (task.id) { 
                        deleteTask(task.id);
                    }
                }}
            >
                <Trashcan />
            </button>
        </div>
    );
};
