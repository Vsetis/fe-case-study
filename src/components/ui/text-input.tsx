import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(({ icon, ...props }, ref) => {
    return (
        <div className="flex items-center border rounded-md text-sm font-medium relative">
            <input className="w-full p-3 rounded-md focus:outline-black" ref={ref} {...props} />
            <div className="absolute right-4">{icon}</div>
        </div>
    );
});
TextInput.displayName = 'TextInput';

export default TextInput;
