import Address from "../../models/Address";

interface AddressRepositoryInterace {

    getByCep(cep: string): Promise<Address> ;
}

export default AddressRepositoryInterace;