import { NavbarItemsEnum } from '@/models/enums/navbar-items-enum.ts';
import { useNavigate } from 'react-router-dom';
import { useCallback, useMemo } from 'react';
import paths from '@/routes/paths.ts';
import isFieldInObject from '@/utils/typeguard/is-field-in-object.ts';

export interface NavigationItemInterface {
    label: string;
    value: NavbarItemsEnum;
}

interface UseNavigationInterface {
    handleNavigate: (page: NavbarItemsEnum) => void;
    options: NavigationItemInterface[];
}

function useNavigation(): UseNavigationInterface {
    const navigate = useNavigate();

    const handleNavigate = useCallback(
        (page: NavbarItemsEnum) => {
            if (isFieldInObject(paths, page)) {
                navigate(paths[page].path);
            }
        },
        [navigate]
    );

    const options = useMemo(() => {
        return Object.values(NavbarItemsEnum).map((navEnumItem) => {
            return {
                label: navEnumItem,
                value: navEnumItem,
            };
        });
    }, []);

    return {
        handleNavigate,
        options,
    };
}

export default useNavigation;
