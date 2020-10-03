interface AuthInterface {

    hasPermission(credentials: { [key: string]: any }): Promise<boolean>;
}

export default AuthInterface;