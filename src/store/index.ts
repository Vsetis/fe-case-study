import { atom, useAtom } from 'jotai';
import { TicketInterface } from '@/models/interfaces/storage/ticket-interface.ts';
import { AlertInterface } from '@/models/interfaces/storage/alert-interface.ts';
import { UserInterface } from '@/models/interfaces/storage/user-interface.ts';

const userAtom = atom<UserInterface | undefined>(undefined);
const ticketAtom = atom<TicketInterface[]>([]);
const alertAtom = atom<AlertInterface>({ message: '' } as AlertInterface);

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
