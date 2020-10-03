import { AddRuleOptions } from "joi";
import ViaCepException from "../exceptions/ViaCepException";
import Address from "../models/Address";
import HttpClient from "../utils/HttClient";
import AddressRepositoryInterace from "./contracts/AddressRepositoryInterface";

class AddressRepository implements AddressRepositoryInterace {

    private urlBaseViaCep: string | undefined;

    constructor(
        private readonly httpClient: HttpClient,
    ) {
        
        this.urlBaseViaCep = process.env.API_VIACEP;
    }
    
    async getByCep(cep: string): Promise<Address> {
        try {
            const response = await this.httpClient.get(`${this.urlBaseViaCep}${cep}/json`, {});
            const isInvalidCep = response.error == true;
            if (isInvalidCep) {
                throw new ViaCepException("Cep invalid.");
            }
    
            return new Address(
                response.cep, response.complemento, response.localidade, response.uf
            );
        } catch(error) {
            throw new ViaCepException("Cep invalid.");
        }
    }
}

export default AddressRepository;