import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlertAtom, useTicketAtom, useUserAtom } from '@/store';
import OrderFormContext from '@/components/form/order-form/order-form-context.tsx';
import OrderForm from '@/components/form/order-form/order-form.tsx';
import UserEntity, { UserEntityType } from '@/models/entities/user-entity.ts';
import useCheckoutApi from '@/api/hooks/use-checkout.ts';
import paths from '@/routes/paths.ts';
import { Button } from '@/components/ui/button.tsx';
import { FormIdEnum } from '@/models/enums/formIdEnum.ts';
import { TrashIcon } from '@radix-ui/react-icons';
import Email from '../../emails';
import { TicketInterface } from '@/models/interfaces/storage/ticket-interface.ts';

type EmailType = {
    firstName: string;
    lastName: string;
    currencyISO: string;
    tickets: TicketInterface[];
};

function Checkout() {
    const { eventId } = useParams();
    const { user } = useUserAtom();
    const { tickets, setTickets } = useTicketAtom();
    const { toast } = useAlertAtom();

    const navigate = useNavigate();

    const [email, setEmail] = useState<EmailType | undefined>(undefined);
    const [emailIsVisible, setEmailIsVisible] = useState(false);

    const checkout = useCheckoutApi();

    const handleSubmit = useCallback(
        async (values: UserEntityType) => {
            if (eventId) {
                try {
                    await checkout.mutateAsync({
                        user: user ? user : values,
                        tickets: tickets.map((ticket) => ({
                            ticketTypeId: ticket.ticketTypeId,
                            seatId: ticket.seatId,
                        })),
                        eventId,
                    });
                    setEmail({
                        firstName: user?.firstName || values.firstName,
                        lastName: user?.lastName || values.lastName,
                        currencyISO: tickets[0].currencyIso,
                        tickets,
                    });
                    setTickets([]);
                    toast.success('Order, succesful!');
                } catch (e) {
                    toast.error('Failed to checkout');
                }
            }
        },
        [checkout, tickets, user, toast, eventId, setTickets]
    );

    useEffect(() => {
        if (!eventId || tickets.length <= 0) {
            navigate(paths.event.path);
        }
    }, [eventId, navigate]);

    if (checkout.isSuccess) {
        return (
            <div className="max-w-xl w-full flex flex-col grow mx-auto  text-center overflow-hidden h-[70vh]">
                {emailIsVisible ? (
                    <div>
                        <Button className="w-max mx-auto my-4" onClick={() => setEmailIsVisible(false)}>
                            Hide email preview
                        </Button>
                        {email && <Email {...email} />}
                    </div>
                ) : (
                    <>
                        <h1 className=" text-5xl font-medium mb-4 mt-32">Thanks for your order!</h1>
                        <p className="text-lg font-medium mb-8">
                            We've sent you an email with order confirmation within 5 minutes.
                        </p>
                        <div className="flex gap-4 w-max mx-auto">
                            <Button className="w-max mx-auto" onClick={() => navigate(paths.home.path)}>
                                Back to the home
                            </Button>
                            <Button className="w-max mx-auto" onClick={() => setEmailIsVisible(true)}>
                                Show email preview
                            </Button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="max-w-xl w-full flex flex-col grow mx-auto mt-32">
            <h1 className="text-4xl font-medium mb-8">Checkout</h1>
            <div className="flex flex-col gap-4 mb-8">
                {tickets.map((ticket) => (
                    <div key={ticket.seatId} className="flex justify-between items-center">
                        <span>
                            Seat {ticket.seat} | Row {ticket.row}
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="font-medium text-lg">
                                {ticket.price} {ticket.currencyIso}
                            </span>
                            <TrashIcon
                                onClick={() => setTickets((prev) => prev.filter((t) => t.seatId !== ticket.seatId))}
                                className="size-6 text-red-500 trnasition-all hover:bg-red-200 cursor-pointer rounded-md"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {!user ? (
                <div className="flex flex-col gap-8">
                    <OrderFormContext defaultValues={UserEntity.createFormValues(user)}>
                        <OrderForm onSubmit={handleSubmit} />
                    </OrderFormContext>
                    <Button
                        isLoading={checkout.isPending}
                        disabled={checkout.isPending}
                        type="submit"
                        form={FormIdEnum.ORDER}
                    >
                        Checkout
                    </Button>
                </div>
            ) : (
                <div>
                    <p className="font-medium text-lg mb-1">{`Name: ${user.firstName} ${user.lastName}`}</p>
                    <p className="font-medium text-lg mb-4">{`Email: ${user.email}`}</p>
                    <Button
                        className="w-full"
                        isLoading={checkout.isPending}
                        disabled={checkout.isPending}
                        onClick={() => handleSubmit(user)}
                    >
                        Checkout
                    </Button>
                </div>
            )}
        </div>
    );
}

export default Checkout;
