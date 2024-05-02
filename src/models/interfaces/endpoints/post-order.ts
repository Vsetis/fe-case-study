import { UserEntityType } from '@/models/entities/user-entity.ts';

export interface PostOrderInterface {
    user: UserEntityType;
    tickets: {
        ticketTypeId: string;
        seatId: string;
    }[];
    eventId: string;
}
