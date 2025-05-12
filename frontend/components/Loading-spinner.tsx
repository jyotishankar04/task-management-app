import React from "react";

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex-col gap-4 w-full flex items-center justify-center flex-1">
            <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
                <div className="w-16 h-16 border-4 border-transparent text-white/20 text-2xl animate-spin flex items-center justify-center border-t-white rounded-full" />
            </div>
        </div>
    );
};

export default LoadingSpinner;
