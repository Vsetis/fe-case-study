import { useCallback, useEffect } from 'react';
import LoginFormContext from '@/components/form/login-form/login-form-context.tsx';
import LoginForm from '@/components/form/login-form/login-form.tsx';
import LoginEntity, { LoginEntityType } from '@/models/entities/login-entity.ts';
import { Button } from '@/components/ui/button.tsx';
import { FormIdEnum } from '@/models/enums/formIdEnum.ts';
import useAuthApi from '@/api/hooks/use-auth.ts';
import { useAlertAtom, useUserAtom } from '@/store';
import { useLocation, useNavigate } from 'react-router-dom';
import paths from '@/routes/paths.ts';

function Login() {
    const login = useAuthApi();
    const { toast } = useAlertAtom();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useUserAtom();

    const handleSubmit = useCallback(
        async (values: LoginEntityType) => {
            try {
                await login.mutateAsync(values);
                toast.success('Login successful');
                navigate(-1);
            } catch (error) {
                toast.error('Login failed');
            }
        },
        [toast, login, navigate]
    );

    useEffect(() => {
        if (user && location.pathname === '/login') {
            navigate(paths.event.path);
        }
    }, [location.pathname, navigate, user]);

    return (
        <div className="max-w-md w-full m-auto px-4 md:px-0">
            <h1 className="text-3xl font-medium mb-8">Login to Event Portal</h1>
            <div className="mb-8">
                <LoginFormContext defaultValues={LoginEntity.createFormValues()}>
                    <LoginForm onSubmit={handleSubmit} />
                </LoginFormContext>
            </div>
            <Button isLoading={login.isPending} size="lg" form={FormIdEnum.LOGIN} type="submit">
                Login
            </Button>
        </div>
    );
}

export default Login;
