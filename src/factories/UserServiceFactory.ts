import StepRepository from "../repositories/StepRepository";
import UserService from "../service/UserService";
import Encrypter from "../utils/Encrypter";
import Uuid from "../utils/Uuid";
import FactoryInterface from "./contracts/FactoryInterface";
import StepRepositoryFactory from "./StepRepositoryFactory";
import UserRepositoryFactory from "./UserRepositoryFactory";
import ValidatorFactory from "./ValidatorFactory";
import cache from "../utils/Cache";

class UserServiceFactory implements FactoryInterface<UserService> {

    make(values: { [key: string]: any; }): UserService {
        const repository = new UserRepositoryFactory().make({});
        const stepRepository = new StepRepositoryFactory().make({});
        const validatorFactory = new ValidatorFactory();
        return new UserService(
            new Uuid(),
            new Encrypter(),
            repository,
            stepRepository,
            validatorFactory,
            cache
        );
    }

    
}

export default UserServiceFactory;