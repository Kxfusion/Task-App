type BubbleParams = { count: number };

export const Bubble = ({ count }: BubbleParams) => {
    return (
        <div className="text-sm bg-tlight text-tdark size-5 rounded-full text-center">{count}</div>
    );
};