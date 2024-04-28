import React, { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LoginEntityType } from '@/models/entities/login-entity.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import useLoginFormValidation from '@/components/form/login-form/login-form-validation.ts';

interface LoginFormContextProps {
    defaultValues?: LoginEntityType;
}
const LoginFormContext: React.FC<PropsWithChildren<LoginFormContextProps>> = (
    props: PropsWithChildren<LoginFormContextProps>
) => {
    const { children, defaultValues } = props;

    const loginSchema = useLoginFormValidation();

    const form = useForm<LoginEntityType>({
        values: defaultValues,
        shouldUnregister: false,
        resolver: zodResolver(loginSchema),
    });

    return <FormProvider {...form}>{children}</FormProvider>;
};

export default LoginFormContext;
