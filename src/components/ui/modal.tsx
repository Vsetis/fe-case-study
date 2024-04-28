import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';

const Modal = DialogPrimitive.Root;

const ModalTrigger = DialogPrimitive.Trigger;

const ModalClose = DialogPrimitive.Close;

const ModalContent = React.forwardRef<
    React.ElementRef<typeof DialogPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, ...props }, ref) => (
    <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                'top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] fixed bg-white w-[90vw] max-h-[85vh] max-w-md rounded-md ',
                className
            )}
            {...props}
        />
    </DialogPrimitive.Portal>
));
ModalContent.displayName = DialogPrimitive.Content.displayName;

export { Modal, ModalTrigger, ModalContent, ModalClose };
