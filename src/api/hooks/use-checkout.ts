import { useMutation } from '@tanstack/react-query';
import { UserEntityType } from '@/models/entities/user-entity.ts';
import { GET_ORDER_URL } from '@/constants/endpoints.ts';

interface DataInterface {
    user: UserEntityType;
    tickets: {
        ticketTypeId: string;
        seatId: string;
    }[];
    eventId: string;
}

const useCheckoutApi = () =>
    useMutation({
        mutationFn: async (data: DataInterface) => {
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
        onSuccess: () => {
            // todo alert
        },
        onError: (error) => {
            // todo alert
            console.error(error);
        },
    });

export default useCheckoutApi;
