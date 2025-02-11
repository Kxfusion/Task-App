import Link from "next/link";
import { RightArrow } from "../components/icons/right-arrow";
import { TaskForm } from "../components/task-form";
import { Suspense } from "react";

export default function Task() {
    return (
        <div className="p-1 md:w-[50%] m-auto flex flex-col">
            <div className="">
                <Link href="/" className="inline-block">
                    <RightArrow />
                </Link>
            </div>
            <Suspense fallback={null}>
                <TaskForm />
            </Suspense>
        </div>
    );
}