import { Button } from '@/components/ui/button.tsx';
import { useGetEventApi } from '@/api/hooks/use-event.ts';
import { useEffect, useState } from 'react';
import { useTicketAtom } from '@/store';
import { Modal, ModalClose, ModalContent, ModalTrigger } from '@/components/ui/modal.tsx';
import { TrashIcon } from '@radix-ui/react-icons';
import Seats from '@/components/seats.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import paths from '@/routes/paths.ts';

function App() {
    const { eventId } = useParams();
    const { tickets, setTickets } = useTicketAtom();
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const { data: event, isLoading } = useGetEventApi();

    useEffect(() => {
        if (tickets.length === 0) {
            setIsOpen(false);
        }
    }, [setIsOpen, tickets]);

    useEffect(() => {
        if (eventId !== event?.eventId && !isLoading) {
            navigate(paths.event.generate());
        }
    }, [navigate, eventId, event, isLoading]);

    if (!event) return null;

    return (
        <>
            {/* inner content */}
            <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
                {/* seating card */}
                <Seats eventId={event.eventId} />

                {/* event info */}
                <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
                    <img
                        className="object-cover object-center rounded-md"
                        width={360}
                        height={180}
                        src={event.headerImageUrl}
                        alt={event.namePub}
                    />
                    <h1 className="text-xl text-zinc-900 font-semibold">{event.namePub}</h1>
                    <p className="text-sm text-zinc-500">{event?.description}</p>
                    <Button variant="secondary" disabled>
                        Add to calendar
                    </Button>
                </aside>
            </div>
            {/* bottom cart affix (wrapper) */}
            <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
                {/* inner content */}
                <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                    {/* total in cart state */}
                    <div className="flex flex-col">
                        <span>Total for {tickets.length} tickets</span>
                        <span className="text-2xl font-semibold">
                            {tickets.reduce((acc, curr) => acc + curr.price, 0)}
                            {event.currencyIso}
                        </span>
                    </div>

                    {/* checkout button */}

                    <Modal open={isOpen} onOpenChange={setIsOpen}>
                        <ModalTrigger disabled={tickets.length === 0} asChild={true}>
                            <Button disabled={tickets.length === 0} variant="default">
                                Checkout now
                            </Button>
                        </ModalTrigger>

                        <ModalContent>
                            <div className="p-4">
                                <h1 className="text-xl font-medium mb-4">checkout</h1>
                                <div className="flex flex-col gap-4">
                                    {tickets.map((ticket) => (
                                        <div key={ticket.id} className="flex justify-between items-center">
                                            <span>
                                                {ticket.row} - {ticket.seat}
                                            </span>
                                            <span>
                                                {ticket.price} {event.currencyIso}
                                            </span>
                                            <Button
                                                onClick={() =>
                                                    setTickets((prev) => prev.filter((t) => t.id !== ticket.id))
                                                }
                                                size="icon"
                                                variant="destructive"
                                            >
                                                <TrashIcon className="size-5 " />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between border-t p-4">
                                <ModalClose asChild={true}>
                                    <Button variant="destructive">Cancel</Button>
                                </ModalClose>
                                <Button variant="default">Continue</Button>
                            </div>
                        </ModalContent>
                    </Modal>
                </div>
            </nav>
        </>
    );
}

export default App;
