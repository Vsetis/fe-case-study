import { useGetEventApi } from '@/api/hooks/use-event.ts';
import EventCard from '@/components/event-card/event-card.tsx';
import EventCardLoading from '@/components/event-card/event-card-loading.tsx';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths.ts';

function EventsPage() {
    const { data: event, isLoading } = useGetEventApi();
    const navigate = useNavigate();

    if (!event && !isLoading) return null;

    return (
        <div className="max-w-screen-lg m-auto w-full grid grid-cols-1 md:grid-cols-3 grow mt-8 gap-8 p-4">
            {!isLoading && event ? (
                <EventCard
                    key={event.eventId}
                    title={event.namePub}
                    description={event.description}
                    dateFrom={event.dateFrom}
                    dateTo={event.dateTo}
                    imageUrl={event.headerImageUrl}
                    location={event.place}
                    onClick={() => navigate(paths.eventInfo.generate({ eventId: event.eventId }))}
                />
            ) : (
                <>
                    {Array.from(Array(3)).map((_, index) => (
                        <EventCardLoading key={index} />
                    ))}
                </>
            )}
        </div>
    );
}

export default EventsPage;
