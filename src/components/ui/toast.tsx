import * as React from 'react';
import * as ToastPrimitive from '@radix-ui/react-toast';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAlertAtom } from '@/store';

const ToastProvider = ToastPrimitive.Provider;

const ToastDemo: React.FC = () => {
    const { alert } = useAlertAtom();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (alert.message !== '') {
            setOpen(true);
        } else {
            setOpen(false);
        }
    }, [setOpen, alert]);

    return (
        <>
            <ToastPrimitive.Root
                className={`${alert.type === 'success' ? 'bg-green-300' : 'bg-red-300'} bg-white rounded-md p-4 border`}
                open={open}
            >
                <ToastPrimitive.Title>{alert.message}</ToastPrimitive.Title>
            </ToastPrimitive.Root>
            <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col p-4 gap-4 w-[390px] max-w-screen m-0 z-[2147483647]" />
        </>
    );
};

export { ToastProvider, ToastDemo };
