import React, { PropsWithChildren } from 'react';

interface NavbarLinkProps {
    onClick?: () => void;
}
const NavbarLink: React.FC<PropsWithChildren<NavbarLinkProps>> = ({
    children,
    onClick,
}: PropsWithChildren<NavbarLinkProps>) => {
    return (
        <div
            className="font-semibold text-sm text-zinc-900 hover:text-zinc-500 transition-all uppercase cursor-pointer"
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default NavbarLink;
