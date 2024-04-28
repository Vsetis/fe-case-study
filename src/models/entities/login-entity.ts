class LoginEntity {
    public email: string;

    public password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }

    public static createFormValues(): LoginEntity {
        return new LoginEntity('', '');
    }
}

export type LoginEntityType = Pick<LoginEntity, keyof LoginEntity>;

export default LoginEntity;
