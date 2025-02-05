'use client'

import { useRouter } from "next/navigation";
import { Plus } from "../icons/plus";
import { CheckedCircle } from "../icons/checked-circle";
import type { MouseEvent, MouseEventHandler } from "react";

type ButtonParams = {
    text: string,
    margin: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    isSaved?: boolean,
};

export const Button = ({ text, isSaved=false, margin, onClick }: ButtonParams) => {
    const router = useRouter();

    const defaultOnClick = (e: MouseEvent) => {
        e.preventDefault();
        router.push('/task');
    };

    return (
        <button onClick={onClick ?? defaultOnClick} className={`h-10 w-full cursor-pointer gap-1 rounded-sm bg-tdeepblue m-auto ${margin} flex items-center place-content-center`}>
            <div className="text-sm font-bold text-twhite">{text}</div>
            <div>
                {isSaved
                    ? <CheckedCircle color="#3A7FBF" border="#c6cfd7" /> 
                    : <Plus />
                }
            </div>
        </button>
    );
}
