class UserEntity {
    public email: string;

    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public static createFormValues(): UserEntity {
        return new UserEntity('', '');
    }
}

export type UserEntityType = Pick<UserEntity, keyof UserEntity>;

export default UserEntity;
