class ViaCepException extends Error {

    constructor(message: string) {
        super(message);
        this.name = "ViaCepException";
    }
}

export default ViaCepException;