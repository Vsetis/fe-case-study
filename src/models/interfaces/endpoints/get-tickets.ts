export type TicketType = {
    id: string;
    name: string;
    price: number;
};
export type SeatType = {
    seatId: string;
    place: number;
    ticketTypeId: string;
};
type SeatRowType = {
    seatRow: number;
    seats: SeatType[];
};
export interface GetTicketsInterface {
    ticketTypes: TicketType[];
    seatRows: SeatRowType[];
}
