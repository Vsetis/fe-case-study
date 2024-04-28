import React, { PropsWithChildren } from 'react';
import Navbar from '@/components/navbar/navbar.tsx';

const Layout: React.FC<PropsWithChildren> = ({ children }: PropsWithChildren) => {
    return (
        <div className="flex flex-col grow">
            <Navbar />
            <main className="grow flex flex-col justify-center">{children}</main>
        </div>
    );
};

export default Layout;
