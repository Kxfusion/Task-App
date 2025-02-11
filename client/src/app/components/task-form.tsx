'use client';

import { SubmitHandler, useForm } from "react-hook-form";
import type { Task } from "../types/Task";
import { Button } from "./basics/button";
import { addTask, updateTask } from "../server/tasks";
import { useSearchParams, useRouter } from "next/navigation";
import { isTask } from "../validation/validate-task";

const defaultTask: Task = {
    title: '',
    color: '#5E98CE',
    completed: false
};

export const TaskForm = () => {
    const params = useSearchParams();
    const router = useRouter();
    const task = {
        id: parseInt(params.get('id') ?? ''),
        title: params.get('title'),
        color: params.get('color'),
        completed: params.get('completed') === 'true' ? true : false,
    };

    const isValidTask = isTask(task);
    console.log(isValidTask);

    const { handleSubmit, register, formState } = useForm<Task>({
        defaultValues: isValidTask ? task : defaultTask,
    });

    const onSubmit: SubmitHandler<Task> = data => {
        if (isValidTask) {
            updateTask(data);
        } else {
            addTask(data);
        }

        router.push('/');
    };

    const colors = [
        {
            name: 'blue',
            code: '#5E98CE'
        },
        {
            name: 'purple',
            code: '#5E60CE',
        },
        {
            name: 'pink',
            code: '#CE5E98',
        },
        {
            name: 'red',
            code: '#CE5E60',
        },
        {
            name: 'green',
            code: '#5ECE94',
        },
        {
            name: 'yellow',
            code: '#CECC5E',
        }
    ];
    
    return (
        <div>
            <form className="w-full flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                <label className="mt-5 text-twhite" htmlFor="title">Title:</label>
                <input 
                    {...register("title")}
                    className="h-9 w-70 mt-2 bg-tlight text-twhite rounded-md outline-0 pl-2 focus:border-2 focus:border-twhite"
                    placeholder="Enter task here" 
                    id="title"
                    aria-label="Title"
                    defaultValue=""
                />
                <label className="mt-10 text-twhite" htmlFor="color">Color:</label>
                <div className="mt-2">
                    {colors.map(color =>
                        <input
                            {...register("color", { required: true })}
                            type="radio"
                            key={color.name}
                            value={color.code}
                            aria-label={color.name}
                            className="appearance-none w-9 h-9 rounded-full border-4 border-tlight mr-3 outline-0 cursor-pointer checked:border-twhite"
                            style={{ backgroundColor: color.code }}
                        />
                    )}
                </div>
            </form>
            <Button
                text="Save Task"
                margin="mt-10"
                onClick={handleSubmit(onSubmit)}
                isSaved={!formState.isSubmitted && !formState.isDirty}
            />
        </div>
    );
};
