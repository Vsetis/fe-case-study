import { atom, useAtom } from 'jotai';

type TicketType = {
    seatId: string;
    ticketTypeId: string;
    seat: number;
    row: number;
    price: number;
    currencyIso: string;
};

export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
};

type AlertType = {
    message: string;
    type?: 'success' | 'error';
};

const userAtom = atom<UserType | undefined>(undefined);
const ticketAtom = atom<TicketType[]>([]);
const alertAtom = atom<AlertType>({ message: '' } as AlertType);

const useUserAtom = () => {
    const [user, setUser] = useAtom(userAtom);

    return { user, setUser };
};

const useTicketAtom = () => {
    const [tickets, setTickets] = useAtom(ticketAtom);

    return { tickets, setTickets };
};

const useAlertAtom = () => {
    const [alert, setAlert] = useAtom(alertAtom);

    const toast = {
        success: (message: string) => {
            setAlert({ message, type: 'success' });
            setTimeout(() => {
                setAlert({ message: '' });
            }, 2000);
        },
        error: (message: string) => {
            setAlert({ message, type: 'error' });
            setTimeout(() => {
                setAlert({ message: '' });
            }, 2000);
        },
    };

    return { alert, toast };
};

export { useUserAtom, useTicketAtom, useAlertAtom };
