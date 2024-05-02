import { Body, Button, Font, Head, Html, Tailwind } from '@react-email/components';
import { IconTicket } from '@tabler/icons-react';

interface OrderEmailProps {
    firstName: string;
    lastName: string;
    currencyISO: string;
    tickets: {
        seat: number;
        row: number;
        price: number;
    }[];
}

const BASE_URL = 'https://fe-case-study-five.vercel.app/';

export default function Email(props: OrderEmailProps) {
    const { tickets, firstName, lastName, currencyISO } = props;

    return (
        <Html>
            <Head />
            <Font
                fontFamily="Inter"
                fallbackFontFamily="sans-serif"
                webFont={{
                    url:
                        '\n' + 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7W0Q5nw.woff2',
                    format: 'woff2',
                }}
                fontWeight={500}
                fontStyle="normal"
            />
            <Tailwind
                config={{
                    theme: {
                        fontFamily: {
                            body: ['"Open Sans"'],
                        },
                        extend: {
                            colors: {
                                brand: '#007291',
                            },
                        },
                    },
                }}
            >
                <Body className="bg-zinc-200 px-2 text-start flex flex-col justify-start items-start">
                    <div className="max-w-[465px] bg-white rounded-md p-4 mt-4 mx-auto">
                        <h1 className="text-2xl mb-2">Thank you for an order!</h1>
                        <p className="mb-2 text-start">Summary:</p>
                        <div className="p-2 border-zinc-600 border-solid border mb-4 flex flex-col items-start">
                            <p className="text-sm mb-1">{firstName}</p>
                            <p className="text-sm m-0 mb-2">{lastName}</p>
                            <p className="text-sm mb-1">Tickets:</p>
                            <div className="text-xs">
                                {tickets.map((t) => (
                                    <p key={t.seat}>
                                        Seat: {t.seat} | Row: {t.row} | Price: {t.price}
                                        {currencyISO}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <p className="mb-4">
                            Total{' '}
                            <span className="text-xl">
                                {tickets.map((t) => t.price).reduce((a, b) => a + b)}
                                {currencyISO}
                            </span>{' '}
                            for {tickets.length} Tickets
                        </p>
                        <Button href={BASE_URL}>
                            <span className="flex items-center gap-2 text-black ">
                                <IconTicket className="size-8" /> EventPortal
                            </span>
                        </Button>
                    </div>
                </Body>
            </Tailwind>
        </Html>
    );
}
