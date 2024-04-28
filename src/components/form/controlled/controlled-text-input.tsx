import React, { useState } from 'react';
import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import TextInput from '@/components/ui/text-input.tsx';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

interface ControlledTextInputProps<T extends FieldValues> {
    control: Control<T>;
    defaultValue?: PathValue<T, Path<T>>;
    name: Path<T>;
    placeholder?: string;
    type?: React.InputHTMLAttributes<HTMLInputElement>['type'];
}
const ControlledTextInput = <T extends FieldValues>(props: ControlledTextInputProps<T>) => {
    const { control, defaultValue, name, type, placeholder } = props;
    const [isPswdVisible, setIsPswdVisible] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field }) =>
                type === 'password' ? (
                    <TextInput
                        {...field}
                        placeholder={placeholder}
                        type={isPswdVisible ? 'text' : 'password'}
                        icon={
                            isPswdVisible ? (
                                <IconEyeOff onClick={() => setIsPswdVisible(false)} />
                            ) : (
                                <IconEye onClick={() => setIsPswdVisible(true)} />
                            )
                        }
                    />
                ) : (
                    <TextInput {...field} placeholder={placeholder} type={type} />
                )
            }
        />
    );
};

export default ControlledTextInput;
