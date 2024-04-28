import { Seat } from '@/components/Seat.tsx';
import { useGetEventTicketsApi } from '@/api/hooks/use-event.ts';
import { useEffect, useMemo } from 'react';
import { useTicketAtom } from '@/store';

interface SeatsProps {
    eventId: string;
}
const Seats = ({ eventId }: SeatsProps) => {
    const { data: ticketData } = useGetEventTicketsApi(eventId);
    const memoizedTickets = useMemo(() => ticketData, [ticketData]);
    const { tickets } = useTicketAtom();

    if (!memoizedTickets) return null;

    return (
        <div
            className="flex flex-col bg-white p-4 w-full gap-2 max-w-xl overflow-auto text-white"
            style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
                gridAutoRows: '40px',
            }}
        >
            {/*	seating map */}
            {memoizedTickets.seatRows.map((row, i) => (
                <div key={i} className="flex flex-row gap-4 items-center">
                    <span className="text-xs font-semibold text-black">{row.seatRow}.</span>
                    {row.seats
                        .map((seat, j) => (
                            <Seat
                                key={j}
                                seatData={seat}
                                isInCart={!!tickets.find((t) => t.id === seat.seatId)}
                                ticketType={memoizedTickets.ticketTypes.filter((t) => seat.ticketTypeId === t.id)[0]}
                                row={row.seatRow}
                            />
                        ))
                        .sort((a, b) => a.props.place - b.props.place)}
                </div>
            ))}
        </div>
    );
};

export default Seats;
