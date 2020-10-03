import AddressRepository from "../repositories/AddressRepository";
import AddressRepositoryInterace from "../repositories/contracts/AddressRepositoryInterface";
import HttpClient from "../utils/HttClient";
import FactoryInterface from "./contracts/FactoryInterface";

class AddressRepositoryFactory implements FactoryInterface<AddressRepositoryInterace> {


    make(values: { [key: string]: any; }): AddressRepositoryInterace {
        const httpClient = new HttpClient();
        return new AddressRepository(httpClient);
    }

    
}

export default AddressRepositoryFactory;