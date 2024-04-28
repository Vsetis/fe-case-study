import React, { PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';

interface FormElementProps {
    errorMessage?: FieldError;
    label: string;
}
const FormElement: React.FC<PropsWithChildren<FormElementProps>> = ({
    errorMessage,
    label,
    children,
}: PropsWithChildren<FormElementProps>) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label>{label}</label>
            {children}
            {errorMessage && <span className="text-xs font-medium text-red-500">{errorMessage.message}</span>}
        </div>
    );
};

export default FormElement;
