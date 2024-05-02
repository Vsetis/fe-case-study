import { useMutation } from '@tanstack/react-query';
import { GET_ORDER_URL } from '@/constants/endpoints.ts';
import { PostOrderInterface } from '@/models/interfaces/endpoints/post-order.ts';

const useCheckoutApi = () =>
    useMutation({
        mutationFn: async (data: PostOrderInterface) => {
            const response = await fetch(GET_ORDER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to checkout');
            }

            return response.json();
        },
    });

export default useCheckoutApi;
