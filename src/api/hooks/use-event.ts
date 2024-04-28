import { useQuery } from '@tanstack/react-query';
import { GET_EVENT_TICKETS_URL, GET_EVENT_URL } from '@/constants/endpoints.ts';
import { GetEventInterface } from '@/models/interfaces/endpoints/get-event.ts';
import { GetTicketsInterface } from '@/models/interfaces/endpoints/get-tickets.ts';

const useGetEventApi = () =>
    useQuery<GetEventInterface>({
        queryFn: async () => {
            try {
                const response = await fetch(GET_EVENT_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            } catch (e) {
                throw new Error('Failed to fetch events');
            }
        },
        queryKey: ['events'] as const,
    });

const useGetEventTicketsApi = (eventId: string) =>
    useQuery<GetTicketsInterface>({
        queryFn: async () => {
            const response = await fetch(`${GET_EVENT_TICKETS_URL}?eventId=${eventId}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        },
        queryKey: ['event-tickets'] as const,
    });

export { useGetEventApi, useGetEventTicketsApi };
