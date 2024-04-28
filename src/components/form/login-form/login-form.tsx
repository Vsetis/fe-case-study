import React from 'react';
import { useFormContext } from 'react-hook-form';
import { LoginEntityType } from '@/models/entities/login-entity.ts';
import ControlledTextInput from '@/components/form/controlled/controlled-text-input.tsx';
import { FormIdEnum } from '@/models/enums/formIdEnum.ts';
import FormElement from '@/components/form/form-element.tsx';

interface LoginFormInterface {
    onSubmit: (values: LoginEntityType) => void;
}
const LoginForm: React.FC<LoginFormInterface> = ({ onSubmit }: LoginFormInterface) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useFormContext<LoginEntityType>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} id={FormIdEnum.LOGIN}>
            <div className="flex flex-col gap-4">
                <FormElement label="email" errorMessage={errors.email}>
                    <ControlledTextInput<LoginEntityType>
                        control={control}
                        name="email"
                        placeholder="john.doe@gmail.com"
                    />
                </FormElement>
                <FormElement label="password" errorMessage={errors.password}>
                    <ControlledTextInput<LoginEntityType> control={control} name="password" type="password" />
                </FormElement>
            </div>
        </form>
    );
};

export default LoginForm;
