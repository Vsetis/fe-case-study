import React, { useState } from 'react';
import UserMenu from '@/components/user-menu.tsx';
import { useUserAtom } from '@/store';
import useNavigation from '@/hooks/use-navigation.ts';
import NavbarLink from '@/components/navbar/navbar-link.tsx';
import { NavbarItemsEnum } from '@/models/enums/navbar-items-enum.ts';
import { IconMenu, IconTicket, IconX } from '@tabler/icons-react';
import { Button } from '@/components/ui/button.tsx';

const Navbar: React.FC = () => {
    const { user } = useUserAtom();
    const { options, handleNavigate } = useNavigation();

    const [isVisible, setVisible] = useState(false);

    return (
        <nav className="sticky top-0 left-0 right-0 bg-white md:border-b border-zinc-200">
            <div className="relative max-w-screen-lg p-2 grow flex flex-col md:flex-row justify-between md:gap-12 mx-auto">
                <div className="flex w-full md:w-max items-center justify-between">
                    <Button variant="outline" size="icon" onClick={() => handleNavigate(NavbarItemsEnum.HOME)}>
                        <IconTicket className="w-8 h-8" />
                    </Button>
                    <div className="md:hidden">
                        {isVisible ? (
                            <IconX onClick={() => setVisible(false)} />
                        ) : (
                            <IconMenu onClick={() => setVisible(true)} />
                        )}
                    </div>
                </div>

                <div
                    className={`${isVisible ? 'flex' : 'hidden md:flex'} flex flex-col md:flex-row left-0 top-16 gap-6 items-end md:items-center p-8 md:p-0  w-full justify-between  bg-white border-b md:border-b-0`}
                >
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {options.map((option) => (
                            <NavbarLink onClick={() => handleNavigate(option.value)} key={option.value}>
                                {option.label}
                            </NavbarLink>
                        ))}
                    </div>
                    <UserMenu user={user} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
