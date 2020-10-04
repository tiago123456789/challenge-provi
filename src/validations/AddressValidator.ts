import InvalidDatasException from "../exceptions/InvalidDatasException";
import AddressRepositoryInterace from "../repositories/contracts/AddressRepositoryInterface";
import { CacheInterface } from "../utils/Cache";
import ValidatorInterface from "./contracts/ValidatorInterface";

class AddressValidator implements ValidatorInterface {

    private readonly TIME_EXPIRED_SECONDS = 86400;

    constructor(
        private readonly addressRepository: AddressRepositoryInterace,
        private readonly cache: CacheInterface
    ) 
    {}

    async validate(cep: string) {
        try {
            let cepInCache = await this.cache.get(cep);
            if (cepInCache) {
                return cepInCache;
            }
            const response = await this.addressRepository.getByCep(cep);
            await this.cache.set(cep, JSON.stringify(response), this.TIME_EXPIRED_SECONDS);
        } catch(error) {
            throw new InvalidDatasException(JSON.stringify([error.message]));
        }
    }

}

export default AddressValidator; 