import AddressRepository from "../repositories/AddressRepository";
import AddressRepositoryInterace from "../repositories/contracts/AddressRepositoryInterface";
import HttpClient from "../utils/HttClient";
import AddressValidator from "../validations/AddressValidator";
import AddressRepositoryFactory from "./AddressRepositoryFactory";
import FactoryInterface from "./contracts/FactoryInterface";
import cache from "../utils/Cache";

class AddressValidatorFactory implements FactoryInterface<AddressValidator> {

    make(values: { [key: string]: any; }): AddressValidator {
        const addressRepository = new AddressRepositoryFactory().make({});
        return new AddressValidator(addressRepository, cache);
    }

    
}

export default AddressValidatorFactory;