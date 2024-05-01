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

const BASE_URL = 'http://localhost:5173/';

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
                <Body className="bg-zinc-200 px-2">
                    <div className="max-w-[465px] bg-white rounded-md p-4 mt-4 mx-auto">
                        <h1 className="text-2xl">Thank you for an order!</h1>
                        <p>Summary:</p>
                        <div className="p-2 border-zinc-600 border-solid border">
                            <p className="text-sm mb-1">{firstName}</p>
                            <p className="text-sm m-0 p-0">{lastName}</p>
                            <p className="text-sm">Tickets:</p>
                            <div className="text-xs">
                                {tickets.map((t) => (
                                    <p>
                                        Seat: {t.seat} | Row: {t.row} | Price: {t.price}
                                        {currencyISO}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <p className="text-2xl ">
                            Total {tickets.map((t) => t.price).reduce((a, b) => a + b)}
                            {currencyISO} for {tickets.length} Tickets
                        </p>
                        <Button className="hover:bg-black/20" href={BASE_URL}>
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
