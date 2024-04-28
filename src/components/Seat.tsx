import { Button } from '@/components/ui/button.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { cn } from '@/lib/utils.ts';
import { SeatType, TicketType } from '@/models/interfaces/endpoints/get-tickets';
import React from 'react';
import { useTicketAtom } from '@/store';

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
    seatData: SeatType;
    ticketType: TicketType;
    row: number;
    isInCart?: boolean;
}

const SeatDetails = ({ seatData, row, ticketType }: SeatProps) => {
    return (
        <div className="flex flex-col gap-2 pb-2">
            <span className="text-sm font-medium">Řada {row}</span>
            <span className="text-sm font-medium">Sedaldo {seatData.place}</span>
            <span className="text-sm font-medium"> {ticketType.name}</span>
            <span className="text-sm font-medium">Cena: {ticketType.price} Kč</span>
        </div>
    );
};

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>((props, ref) => {
    const { seatData, row, ticketType, isInCart, className } = props;

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
                    {tickets.find((t) => t.id === seatData.seatId) ? (
                        <Button
                            onClick={() =>
                                setTickets((prev) => prev.filter((ticktet) => ticktet.id !== seatData.seatId))
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
                                        id: seatData.seatId,
                                        seat: seatData.place,
                                        row: row,
                                        price: ticketType.price,
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
