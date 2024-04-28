import React from 'react';

const EventInfoLoading: React.FC = () => {
    return (
        <div className="flex justify-between w-full gap-4 animate-pulse">
            <div className="flex flex-wrap items-start w-[60%] h-max gap-4">
                {Array.from({ length: 80 }).map((_, i) => (
                    <div key={i} className="bg-zinc-300 size-7 rounded-full" />
                ))}
            </div>
            <div className="bg-zinc-300 w-1/3 h-96 grow rounded-md" />
        </div>
    );
};

export default EventInfoLoading;
