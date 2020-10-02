import UserService from "../service/UserService";
import Encrypter from "../utils/Encrypter";
import Uuid from "../utils/Uuid";
import FactoryInterface from "./contracts/FactoryInterface";
import UserRepositoryFactory from "./UserRepositoryFactory";

class UserServiceFactory implements FactoryInterface<UserService> {

    make(values: { [key: string]: any; }): UserService {
        const repository = new UserRepositoryFactory().make({});
        return new UserService(
            new Uuid(),
            new Encrypter(),
            repository
        );
    }

    
}

export default UserServiceFactory;