import { UserEntityType } from '@/models/entities/user-entity.ts';

export interface LoginFormInterface {
    defaultValues: UserEntityType;
    onSubmit: (values: UserEntityType) => void;
}
