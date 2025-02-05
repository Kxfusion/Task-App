import { Bubble } from "./basics/bubble";

type TaskInfoParams = { createdCount: number, completedCount: number }

export const TaskInfo = ({ createdCount, completedCount }: TaskInfoParams) => {
    return (
        <div className="pt-10 gap-1 m-auto flex items-center justify-between">
            <div className="text-sm font-bold text-tblue">Tasks</div>
            <Bubble count={createdCount} />
            <div className="flex-grow"/>
            <div className="text-sm font-bold text-tpurple">Completed</div>
            <Bubble count={completedCount} />
        </div>
    );
};
