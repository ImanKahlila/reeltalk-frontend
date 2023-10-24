import React from 'react';

interface ComponentProps {
    children: React.ReactNode;
    className: string;
}

const Modal = React.forwardRef<HTMLDialogElement, ComponentProps>(
    (props, ref) => {
        const { children, className } = props;

        return (
            <dialog ref={ref} className={className}>
                {children}
            </dialog>
        );
    },
);

Modal.displayName = 'Modal';

export default Modal;
