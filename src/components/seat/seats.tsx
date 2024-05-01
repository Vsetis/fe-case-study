import { useTicketAtom } from '@/store';
import { GetTicketsInterface } from '@/models/interfaces/endpoints/get-tickets.ts';
import Seattttt from '@/components/seat/seat.tsx';

interface SeatsProps {
    currencyIso: string;
    tickets: GetTicketsInterface;
}
const Seats = ({ currencyIso, tickets }: SeatsProps) => {
    const { tickets: eventTickets } = useTicketAtom();
    return (
        <div
            className="flex flex-col bg-white w-full gap-2 max-w-screen-xl overflow-auto text-white h-max p-4"
            style={{
                gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
                gridAutoRows: '40px',
            }}
        >
            {/*	seating map */}
            {tickets.seatRows.map((row, i) => (
                <div key={i} className="flex flex-row gap-4 items-center">
                    <span className="text-xs font-semibold text-black">{row.seatRow}.</span>
                    {row.seats
                        .map((seat, j) => (
                            <Seattttt
                                key={j}
                                currencyIso={currencyIso}
                                seatData={seat}
                                isInCart={!!eventTickets.find((t) => t.seatId === seat.seatId)}
                                ticketType={tickets.ticketTypes.filter((t) => seat.ticketTypeId === t.id)[0]}
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
