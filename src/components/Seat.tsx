import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { SeatType, TicketType } from '@/models/interfaces/endpoints/get-tickets';
import { useTicketAtom } from '@/store';
import { IconArmchair } from '@tabler/icons-react';

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    seatData: SeatType;
    ticketType: TicketType;
    row: number;
    isInCart?: boolean;
    currencyIso: string;
}

const SeatDetails = ({ seatData, row, ticketType }: { seatData: SeatType; row: number; ticketType: TicketType }) => {
    return (
        <div className="flex justify-between">
            <div className="flex flex-col gap-2 mb-4">
                <span className="text-sm font-medium">{`Seat ${seatData.place} | Row ${row} `}</span>
                <span className="text-sm font-medium"> {ticketType.name}</span>
                <span className="text-lg font-medium">Price: {ticketType.price} Kč</span>
            </div>
            <IconArmchair className="size-10" />
        </div>
    );
};

const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
    const { seatData, row, ticketType, isInCart, currencyIso, className } = props;

    const { tickets, setTickets } = useTicketAtom();

    return (
        <Popover>
            <PopoverTrigger>
                <div
                    className={cn(
                        `${isInCart ? 'bg-zinc-700 hover:bg-black hover:text-white/70 text-zinc-50' : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-400 '} size-8 rounded-full transition-color flex justify-center items-center`,
                        className
                    )}
                    ref={ref}
                >
                    <span className="text-xs font-medium">{seatData.place}</span>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <SeatDetails seatData={seatData} row={row} ticketType={ticketType} />
                <footer className="flex flex-col">
                    {tickets.find((t) => t.seatId === seatData.seatId) ? (
                        <Button
                            onClick={() =>
                                setTickets((prev) => prev.filter((ticket) => ticket.seatId !== seatData.seatId))
                            }
                            variant="destructive"
                            size="sm"
                        >
                            Remove from cart
                        </Button>
                    ) : (
                        <Button
                            onClick={() =>
                                setTickets((prev) => [
                                    ...prev,
                                    {
                                        seatId: seatData.seatId,
                                        ticketTypeId: ticketType.id,
                                        seat: seatData.place,
                                        row: row,
                                        price: ticketType.price,
                                        currencyIso: currencyIso,
                                    },
                                ])
                            }
                            variant="default"
                            size="sm"
                        >
                            Add to cart
                        </Button>
                    )}
                </footer>
            </PopoverContent>
        </Popover>
    );
});
Seat.displayName = 'Seat';

export default Seat;
