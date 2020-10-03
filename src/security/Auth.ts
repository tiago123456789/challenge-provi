import ForbiddenException from "../exceptions/ForbiddenException";
import UserService from "../service/UserService";
import AuthInterface from "./contracts/AuthInterface";

class Auth implements AuthInterface {

    constructor(private readonly userService: UserService) { }

    async hasPermission(credentials: { [key: string]: any; }): Promise<boolean> {
        const userWithToken = await this.userService.findByToken(credentials.token);
        const isNull = userWithToken.length == 0;
        if (isNull) {
            throw new ForbiddenException("You are not permission execute this action.");
        }

        return true;
    }

}

export default Auth;