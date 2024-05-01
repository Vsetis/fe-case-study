import React, { useEffect, useMemo, useState } from 'react';
import Seats from '@/components/seat/seats.tsx';
import { Button } from '@/components/ui/button.tsx';
import { GetEventInterface } from '@/models/interfaces/endpoints/get-event.ts';
import { GetTicketsInterface } from '@/models/interfaces/endpoints/get-tickets.ts';
import { useGetEnsureTicketsApi } from '@/api/hooks/use-event.ts';
import EventInfoLoading from '@/components/ui/event-info-loading.tsx';

interface EventInfoInterface {
    event: GetEventInterface;
}
const EventInfo: React.FC<EventInfoInterface> = (props: EventInfoInterface) => {
    const { event } = props;

    const [ticketData, setData] = useState<GetTicketsInterface | undefined>(undefined);
    const [isLoading, setLoading] = useState(false);
    const ensureData = useGetEnsureTicketsApi(event.eventId);
    const memoizedTickets = useMemo(() => ticketData, [ticketData]);

    useEffect(() => {
        setLoading(true);

        try {
            ensureData.then((query) => {
                setData(query.data);
            });
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [ensureData]);

    return (
        <div className="max-w-screen-lg  flex flex-col md:flex-row w-full mx-auto justify-between grow md:mt-8 gap-8 p-2 md:p-0">
            {!isLoading && memoizedTickets ? (
                <>
                    <Seats currencyIso={event.currencyIso} tickets={memoizedTickets} />
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
                </>
            ) : (
                <EventInfoLoading />
            )}
        </div>
    );
};

export default EventInfo;
