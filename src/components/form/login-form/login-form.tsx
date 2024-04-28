import React, { PropsWithChildren } from 'react';
import { LoginFormInterface } from '@/models/interfaces/form/login-form-interface.ts';
import { FormProvider, useForm } from 'react-hook-form';
import { UserEntityType } from '@/models/entities/user-entity';
import { zodResolver } from '@hookform/resolvers/zod';
import useLoginFormValidation from '@/components/form/login-form/login-form-validation.ts';

const LoginForm: React.FC<PropsWithChildren<LoginFormInterface>> = (props: PropsWithChildren<LoginFormInterface>) => {
    const { children, defaultValues } = props;

    const userSchema = useLoginFormValidation();

    const form = useForm<UserEntityType>({
        values: defaultValues,
        shouldUnregister: false,
        resolver: zodResolver(userSchema),
    });

    return <FormProvider {...form}>{children}</FormProvider>;
};

export default LoginForm;
