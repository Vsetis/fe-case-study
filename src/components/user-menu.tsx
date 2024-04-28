import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.tsx';
import { useUserAtom } from '@/store';
import { useNavigate } from 'react-router-dom';
import paths from '@/routes/paths.ts';

type User = {
    firstName: string;
    lastName: string;
    email: string;
};

interface UserMenuProps {
    user: User | undefined;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }: UserMenuProps) => {
    const { setUser } = useUserAtom();
    const navigate = useNavigate();

    return (
        <>
            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage
                                        src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-medium">
                                        {user.firstName} {user.lastName}
                                    </span>
                                    <span className="text-xs text-zinc-500">{user.email}</span>
                                </div>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[250px]">
                        <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => setUser(undefined)}>Logout</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex gap-4">
                    <Button onClick={() => navigate(paths.login.path)}>Login</Button>
                </div>
            )}
        </>
    );
};

export default UserMenu;
