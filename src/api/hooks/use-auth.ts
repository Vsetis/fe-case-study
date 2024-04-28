import { useMutation } from '@tanstack/react-query';
import { GET_AUTH_URL } from '@/constants/endpoints.ts';
import { useUserAtom } from '@/store';

const useAuthApi = () => {
    const { setUser } = useUserAtom();

    return useMutation({
        mutationFn: async (data: { email: string; password: string }) => {
            const response = await fetch(GET_AUTH_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to login');
            }

            return response.json();
        },
        onSuccess: (data) => {
            setUser({
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
            });
        },
        onError: (error) => {
            console.error(error);
        },
    });
};

export default useAuthApi;
