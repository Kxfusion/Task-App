import { Clipboard } from "./icons/clipboard";

export const EmptyTable = () => {
    return (
        <div className="w-[50%] pt-10 m-auto flex flex-column flex-wrap place-content-center">
            <Clipboard />
            <div className="w-full pt-2.5 text-tlight text-center font-bold">{`You don't have any tasks.`}</div>
            <div className="w-full pt-5 text-tlight text-center">Click the Create Task button to get started!</div>
        </div>
    );
};
