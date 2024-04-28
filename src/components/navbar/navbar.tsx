import React from 'react';
import UserMenu from '@/components/user-menu.tsx';
import { useUserAtom } from '@/store';
import useNavigation from '@/hooks/use-navigation.ts';
import NavbarLink from '@/components/navbar/navbar-link.tsx';
import { NavbarItemsEnum } from '@/models/enums/navbar-items-enum.ts';
import { IconTicket } from '@tabler/icons-react';
import { Button } from '@/components/ui/button.tsx';

const Navbar: React.FC = () => {
    const { user } = useUserAtom();
    const { options, handleNavigate } = useNavigation();

    return (
        <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
            <div className="max-w-screen-lg p-2 grow flex items-center justify-between gap-3">
                <div className="flex gap-12 items-center">
                    <Button variant="outline" size="icon" onClick={() => handleNavigate(NavbarItemsEnum.HOME)}>
                        <IconTicket className="w-8 h-8" />
                    </Button>
                    <div className="flex gap-6">
                        {options.map((option) => (
                            <NavbarLink onClick={() => handleNavigate(option.value)} key={option.value}>
                                {option.label}
                            </NavbarLink>
                        ))}
                    </div>
                </div>
                <UserMenu user={user} />
            </div>
        </nav>
    );
};

export default Navbar;
