import StepRepositoryInterface from "../repositories/contracts/StepRepositoryInterface";
import UserRepositoryInterface from "../repositories/contracts/UserRepositoryInterface";
import StepRepository from "../repositories/StepRepository";
import FactoryInterface from "./contracts/FactoryInterface";

class StepRepositoryFactory implements FactoryInterface<StepRepositoryInterface> {

    make(values: { [key: string]: any; }): StepRepositoryInterface {
        return new StepRepository();
    }
}

export default StepRepositoryFactory;