import React from 'react';
import { UserEntityType } from '@/models/entities/user-entity.ts';
import { useFormContext } from 'react-hook-form';
import FormElement from '@/components/form/form-element.tsx';
import ControlledTextInput from '@/components/form/controlled/controlled-text-input.tsx';
import { FormIdEnum } from '@/models/enums/formIdEnum.ts';

interface OrderFormInterface {
    onSubmit: (values: UserEntityType) => void;
}

const OrderForm: React.FC<OrderFormInterface> = ({ onSubmit }: OrderFormInterface) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useFormContext<UserEntityType>();
    console.log(errors);
    return (
        <form onSubmit={handleSubmit(onSubmit)} id={FormIdEnum.ORDER}>
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-4">
                    <FormElement label="first name" errorMessage={errors.firstName}>
                        <ControlledTextInput<UserEntityType> control={control} name="firstName" />
                    </FormElement>
                    <FormElement label="last name" errorMessage={errors.lastName}>
                        <ControlledTextInput<UserEntityType> control={control} name="lastName" />
                    </FormElement>
                </div>
                <FormElement label="email" errorMessage={errors.email}>
                    <ControlledTextInput<UserEntityType> control={control} name="email" />
                </FormElement>
            </div>
        </form>
    );
};

export default OrderForm;
