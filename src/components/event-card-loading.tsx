import React from 'react';

const EventCardLoading: React.FC = () => {
    return (
        <div className="flex flex-col max-w-sm w-full animate-pulse">
            <div className="bg-zinc-300 h-40  mb-4 rounded-md" />
            <div className="bg-zinc-300 h-4 mb-2 w-1/3 rounded-md" />
            <div className="bg-zinc-300 h-3 mb-2 rounded-md" />
            <div className="bg-zinc-300 h-3 mb-4 rounded-md" />
            <div className="bg-zinc-300 h-10 rounded-md" />
        </div>
    );
};

export default EventCardLoading;
