class Address {

    private cep: string;
    private complement: string;
    private city: string;
    private state: string;


    constructor(cep: string, complement: string, city: string, state: string) {
        this.cep = cep;
        this.complement = complement;
        this.city = city;
        this.state = state;
    }

    getCep(): string {
        return this.cep;
    }

    getComplement(): string {
        return this.complement;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }
}

export default Address;