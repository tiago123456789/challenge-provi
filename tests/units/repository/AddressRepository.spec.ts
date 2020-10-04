import HttpClient from "../../../src/utils/HttClient";
import AddressRepository from "../../../src/repositories/AddressRepository"
import ViaCepException from "../../../src/exceptions/ViaCepException";

jest.mock("../../../src/utils/HttClient");

describe("Unit tests class AddressRepository", () => {

    it("Should trigger ViaCepException to the try search cep invalid on viacep", async () => {
        const HttpClientMocked = <jest.Mock<HttpClient>>HttpClient;
        const httpClientMocked = <jest.Mocked<HttpClient>>new HttpClientMocked();
        
        try {
            httpClientMocked.get.mockResolvedValue([]);
            const addressRepository = new AddressRepository(httpClientMocked);
            await addressRepository.getByCep("00000000");
        } catch(error) {
            expect(error.name).toBe(ViaCepException.name);
        }
    })
});