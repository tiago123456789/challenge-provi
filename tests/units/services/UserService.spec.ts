import "../../../src/config/LoaderEnvironmentVariable";
import UserService from "../../../src/service/UserService";
import Uuid from "../../../src/utils/Uuid";
import Encrypter from "../../../src/utils/Encrypter";
import StepRepository from "../../../src/repositories/StepRepository";
import ValidatorFactory from "../../../src/factories/ValidatorFactory";
import logger from "../../../src/config/Logger";
import UserRepository from "../../../src/repositories/UserRepository";
import cache from "../../../src/utils/Cache";
import BusinessLogicException from "../../../src/exceptions/BusinessLogicException";
import InvalidDatasException from "../../../src/exceptions/InvalidDatasException";

jest.mock("../../../src/repositories/UserRepository");
jest.mock("../../../src/repositories/StepRepository");


describe("Unit tests class UserService", () => {

    it("Should trigger BusinessLogicException to the try register user email already used", async () => {
        try {
            const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
            const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
            const registerFake = {
                "email": "testaffdsafas@gmail.com",
                "password": "123456789"
            };

            userRepositoryMocked.findByEmail.mockResolvedValue([
                registerFake
            ])
            const userService = new UserService(
                new Uuid(),
                new Encrypter(),
                userRepositoryMocked,
                new StepRepository(),
                new ValidatorFactory(),
                cache,
                logger
            );
            await userService.register(registerFake);

        } catch (error) {
            expect(error.name).toBe(BusinessLogicException.name);
        }
    });

    it("Should register user with success", async () => {
        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
        const StepRepositoryMocked = <jest.Mock<StepRepository>>StepRepository;
        const stepRepositoryMocked = <jest.Mocked<StepRepository>>new StepRepositoryMocked();

        const registerFake = {
            "email": "testaffdsafas@gmail.com",
            "password": "123456789"
        };

        const stepFake = {
            field: "cpf",
            validation: "CpfValidator"
        }

        userRepositoryMocked.findByEmail.mockResolvedValue([]);
        stepRepositoryMocked.getFirstStep.mockResolvedValue(stepFake);
        const userService = new UserService(
            new Uuid(),
            new Encrypter(),
            userRepositoryMocked,
            stepRepositoryMocked,
            new ValidatorFactory(),
            cache,
            logger
        );
        await userService.register(registerFake);
        expect(userRepositoryMocked.save.call.length).toBe(1);
    });

    it("Should trigger InvalidDatasException to the try update field data not exist", async () => {
        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
        const StepRepositoryMocked = <jest.Mock<StepRepository>>StepRepository;
        const stepRepositoryMocked = <jest.Mocked<StepRepository>>new StepRepositoryMocked();

        try {
            const fieldUpdateFake = {
                "token": "8e4c944a-de41-4445-9c3d-0d18b4447ebc",
                "data": "70659393166",
                "field": "cpf-teste"
            }

            stepRepositoryMocked.findByField.mockResolvedValue(null);
            const userService = new UserService(
                new Uuid(),
                new Encrypter(),
                userRepositoryMocked,
                stepRepositoryMocked,
                new ValidatorFactory(),
                cache,
                logger
            );
            await userService.updateField(fieldUpdateFake);
        } catch (error) {
            expect(error.name).toBe(InvalidDatasException.name);
        }

    });

    it("Should trigger InvalidDatasException to the execute validation is value for invalid", async () => {
        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
        const StepRepositoryMocked = <jest.Mock<StepRepository>>StepRepository;
        const stepRepositoryMocked = <jest.Mocked<StepRepository>>new StepRepositoryMocked();

        try {
            const fieldUpdateFake = {
                "token": "8e4c944a-de41-4445-9c3d-0d18b4447ebc",
                "data": "784545",
                "field": "cpf"
            }

            const stepFake = {
                _id: "",
                field: "cpf",
                validation: "CpfValidator"
            };

            const userFake = {
                "_id": "dsfasaflal.fdlsafls",
                "email": "testaffdsafas@gmail.com",
                "token": "asdfasdflkvodnlgdkfkasdlkfa554",
                nextStep: "cpf"
            };


            stepRepositoryMocked.findByField.mockResolvedValue(stepFake);
            userRepositoryMocked.findByToken.mockResolvedValue([userFake])
            const userService = new UserService(
                new Uuid(),
                new Encrypter(),
                userRepositoryMocked,
                stepRepositoryMocked,
                new ValidatorFactory(),
                cache,
                logger
            );
            await userService.updateField(fieldUpdateFake);
        } catch (error) {
            expect(error.name).toBe(InvalidDatasException.name);
        }

    });

    it("Should trigger InvalidDatasException to the update data field used", async () => {
        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
        const StepRepositoryMocked = <jest.Mock<StepRepository>>StepRepository;
        const stepRepositoryMocked = <jest.Mocked<StepRepository>>new StepRepositoryMocked();

        try {
            const fieldUpdateFake = {
                "token": "8e4c944a-de41-4445-9c3d-0d18b4447ebc",
                "data": "70659391455",
                "field": "cpf"
            }

            const stepFake = {
                _id: "",
                field: "cpf",
                validation: ""
            };

            const userFake = {
                "_id": "dsfasaflal.fdlsafls",
                "email": "testaffdsafas@gmail.com",
                "token": "asdfasdflkvodnlgdkfkasdlkfa554",
                nextStep: "cpf"
            };

            const userDataDuplicateFake = {
                "_id": "dsfasaflal.fdlsafls",
                "email": "testaffdsafas@gmail.com",
                "token": "asdfasdflkvodnlgdkfkasdlkfa554",
                nextStep: "cpf",
                "cpf": [
                    { data: "70659391455", updatedAt: new Date() }
                ]
            };


            stepRepositoryMocked.findByField.mockResolvedValue(stepFake);
            userRepositoryMocked.findByToken.mockResolvedValue([userFake]);
            userRepositoryMocked.findByFieldAnIdDifferenteMencionated.mockResolvedValue([
                userDataDuplicateFake
            ])
            const userService = new UserService(
                new Uuid(),
                new Encrypter(),
                userRepositoryMocked,
                stepRepositoryMocked,
                new ValidatorFactory(),
                cache,
                logger
            );
            await userService.updateField(fieldUpdateFake);
        } catch (error) {
            expect(error.name).toBe(BusinessLogicException.name);
        }

    });

    it("Should trigger InvalidDatasException to the update data field used", async () => {
        const UserRepositoryMocked = <jest.Mock<UserRepository>>UserRepository;
        const userRepositoryMocked = <jest.Mocked<UserRepository>>new UserRepositoryMocked();
        const StepRepositoryMocked = <jest.Mock<StepRepository>>StepRepository;
        const stepRepositoryMocked = <jest.Mocked<StepRepository>>new StepRepositoryMocked();

        const fieldUpdateFake = {
            "token": "8e4c944a-de41-4445-9c3d-0d18b4447ebc",
            "data": "70659391455",
            "field": "cpf"
        }

        const stepFake = {
            _id: "",
            field: "cpf",
            validation: ""
        };

        const userFake = {
            "_id": "dsfasaflal.fdlsafls",
            "email": "testaffdsafas@gmail.com",
            "token": "asdfasdflkvodnlgdkfkasdlkfa554",
            nextStep: "cpf"
        };

        const userDataDuplicateFake = {
            "_id": "dsfasaflal.fdlsafls",
            "email": "testaffdsafas@gmail.com",
            "token": "asdfasdflkvodnlgdkfkasdlkfa554",
            nextStep: "cpf",
            "cpf": [
                { data: "70659391455", updatedAt: new Date() }
            ]
        };


        stepRepositoryMocked.findByField.mockResolvedValue(stepFake);
        userRepositoryMocked.findByToken.mockResolvedValue([userFake]);
        userRepositoryMocked.findByFieldAnIdDifferenteMencionated.mockResolvedValue([]);
        const userService = new UserService(
            new Uuid(),
            new Encrypter(),
            userRepositoryMocked,
            stepRepositoryMocked,
            new ValidatorFactory(),
            cache,
            logger
        );
        await userService.updateField(fieldUpdateFake);
        expect(userRepositoryMocked.update.call.length).toBe(1);
    });
});