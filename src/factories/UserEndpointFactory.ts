import UserEndpoint from "../endpoints/UserEndpoint";
import FactoryInterface from "./contracts/FactoryInterface";
import UserServiceFactory from "./UserServiceFactory";

class UserEndpointFactory implements FactoryInterface<UserEndpoint> {
    
    make(values: { [key: string]: any; }): UserEndpoint {
        const userService = new UserServiceFactory().make({});
        return new UserEndpoint(userService);
    }
}

export default UserEndpointFactory;