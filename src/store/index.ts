import { atom, useAtom } from 'jotai';

type TicketType = {
    id: string;
    seat: number;
    row: number;
    price: number;
};

export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
};

const userAtom = atom<UserType | undefined>(undefined);
const ticketAtom = atom<TicketType[]>([]);
const useUserAtom = () => {
    const [user, setUser] = useAtom(userAtom);

    return { user, setUser };
};

const useTicketAtom = () => {
    const [tickets, setTickets] = useAtom(ticketAtom);

    return { tickets, setTickets };
};

export { useUserAtom, useTicketAtom };
