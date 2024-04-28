class UserEntity {
    public readonly email: string;

    public readonly firstName: string;

    public readonly lastName: string;

    constructor(email: string, firstName: string, lastName: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public static createFormValues(user: UserEntityType | undefined): UserEntity {
        return new UserEntity(user?.email || '', user?.firstName || '', user?.lastName || '');
    }
}

export type UserEntityType = Pick<UserEntity, keyof UserEntity>;

export default UserEntity;
