import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="w-full flex gap-8">
            <div className="bg-zinc-300 animate-pulse w-full" />
            <div className="bg-zinc-300 animate-pulse w-full" />
            <div />
        </div>
    );
};

export default Loading;
