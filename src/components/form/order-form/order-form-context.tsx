import React, { PropsWithChildren } from 'react';
import { UserEntityType } from '@/models/entities/user-entity.ts';
import useOrderFormValidation from '@/components/form/order-form/order-form-validation.ts';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface OrderFormContextProps {
    defaultValues?: UserEntityType;
}

const OrderFormContext: React.FC<PropsWithChildren<OrderFormContextProps>> = (
    props: PropsWithChildren<OrderFormContextProps>
) => {
    const { children, defaultValues } = props;

    const userSchema = useOrderFormValidation();

    const form = useForm<UserEntityType>({
        values: defaultValues,
        shouldUnregister: false,
        resolver: zodResolver(userSchema),
    });

    return <FormProvider {...form}>{children}</FormProvider>;
};

export default OrderFormContext;
