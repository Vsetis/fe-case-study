import React from 'react';
import { Button } from '@/components/ui/button.tsx';
import { IconCalendar, IconMapPin } from '@tabler/icons-react';
interface EventCardProps {
    title: string;
    dateFrom: Date;
    dateTo: Date;
    location: string;
    description: string;
    imageUrl: string;
    onClick: () => void;
}
const EventCard: React.FC<EventCardProps> = (props: EventCardProps) => {
    const { title, dateFrom, dateTo, location, description, imageUrl, onClick } = props;

    const formattedDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    return (
        <div className="w-full shadow h-max  rounded-md">
            <img className="rounded-t-md " src={imageUrl} alt={title} />
            <div className="p-4">
                <h3 className="text-xl font-medium mb-2">{title}</h3>
                <p className="text-ellipsis overflow-hidden line-clamp-2 mb-4 text-sm">{description}</p>
                <div className="flex gap-2 mb-2">
                    <IconCalendar className="w-5 h-5" />
                    <p>{`${formattedDate(dateFrom)} - ${formattedDate(dateTo)}`}</p>
                </div>
                <div className="flex gap-2 mb-6 text-sm">
                    <IconMapPin className="w-5 h-5" />
                    <p>{location}</p>
                </div>
                <Button className="w-full" size="lg" onClick={onClick}>
                    More
                </Button>
            </div>
        </div>
    );
};

export default EventCard;
