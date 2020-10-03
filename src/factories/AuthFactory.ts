import Auth from "../security/Auth";
import AuthInterface from "../security/contracts/AuthInterface";
import FactoryInterface from "./contracts/FactoryInterface";
import UserServiceFactory from "./UserServiceFactory";

class AuthFactory implements FactoryInterface<AuthInterface> {

    make(values: { [key: string]: any; }): AuthInterface {
        const userService = new UserServiceFactory().make({});
        return new Auth(userService);
    }
}

export default AuthFactory;