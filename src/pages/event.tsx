import { Button } from '@/components/ui/button.tsx';
import { useEffect, useState } from 'react';
import { useTicketAtom } from '@/store';
import { Modal, ModalClose, ModalContent, ModalTrigger } from '@/components/ui/modal.tsx';
import { TrashIcon } from '@radix-ui/react-icons';
import { useNavigate, useParams } from 'react-router-dom';
import paths from '@/routes/paths.ts';
import { useQueryClient } from '@tanstack/react-query';
import { GetEventInterface } from '@/models/interfaces/endpoints/get-event.ts';
import EventInfo from '@/components/event-info.tsx';
import { IconX } from '@tabler/icons-react';

function Event() {
    const { eventId } = useParams();
    const queryClient = useQueryClient();
    const { tickets, setTickets } = useTicketAtom();
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const event: GetEventInterface | undefined = queryClient.getQueryData(['events']);

    useEffect(() => {
        if (tickets.length === 0) {
            setIsOpen(false);
        }
    }, [setIsOpen, tickets]);

    useEffect(() => {
        if (eventId !== event?.eventId) {
            navigate(paths.event.generate());
        }
    }, [navigate, eventId, event]);

    if (!event || !eventId) return null;

    return (
        <>
            <div className="mt-16 md:mt-0">
                <EventInfo event={event} />
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
                            <div className="p-4 overflow-auto max-h-[60vh]">
                                <div className="flex justify-between h-max mb-2">
                                    <h1 className="text-2xl font-medium mb-4">checkout</h1>
                                    <ModalClose>
                                        <IconX className="size-8" />
                                    </ModalClose>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {tickets.map((ticket) => (
                                        <div key={ticket.seatId} className="flex justify-between items-center">
                                            <span>
                                                Seat {ticket.seat} | Row {ticket.row}
                                            </span>
                                            <div className="flex items-center gap-4">
                                                <span className="font-medium text-lg">
                                                    {ticket.price} {ticket.currencyIso}
                                                </span>

                                                <TrashIcon
                                                    onClick={() =>
                                                        setTickets((prev) =>
                                                            prev.filter((t) => t.seatId !== ticket.seatId)
                                                        )
                                                    }
                                                    className="size-6 text-red-500 trnasition-all hover:bg-red-200 cursor-pointer rounded-md"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between border-t p-4">
                                <ModalClose asChild={true}>
                                    <Button variant="destructive">Cancel</Button>
                                </ModalClose>
                                <Button
                                    onClick={() => navigate(paths.checkout.generate({ eventId }))}
                                    variant="default"
                                >
                                    Continue
                                </Button>
                            </div>
                        </ModalContent>
                    </Modal>
                </div>
            </nav>
        </>
    );
}

export default Event;
