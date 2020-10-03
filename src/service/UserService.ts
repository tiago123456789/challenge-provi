import BusinesssException from "../exceptions/BusinessLogicException";
import InvalidDatasException from "../exceptions/InvalidDatasException";
import FactoryInterface from "../factories/contracts/FactoryInterface";
import FieldUpdate from "../models/FieldUpdate";
import StepRepositoryInterface from "../repositories/contracts/StepRepositoryInterface";
import UserRepositoryInterface from "../repositories/contracts/UserRepositoryInterface";
import Encrypter from "../utils/Encrypter";
import Uuid from "../utils/Uuid";
import ValidatorInterface from "../validations/contracts/ValidatorInterface";

class UserService {

    constructor(
        private readonly uuidUtil: Uuid,
        private readonly encrypterUtil: Encrypter,
        private readonly repository: UserRepositoryInterface,
        private readonly stepRepository: StepRepositoryInterface,
        private readonly validatorFactory: FactoryInterface<ValidatorInterface>
    ) {}

    public findByToken(token: string): Promise<any> {
        return this.repository.findByToken(token);
    }
        
    public async register(register: { [key:string]: any }) {
        const userWithEmail = await this.repository.findByEmail(register.email);
        const isExistUserWithEmail: boolean = userWithEmail.length > 0;
        if (isExistUserWithEmail) {
            throw new BusinesssException("Use another email!");
        }

        const step = await this.stepRepository.getFirstStep();
        register.password = await this.encrypterUtil.getHash(register.password);
        register.token = await this.uuidUtil.get();
        register.nextStep = step.field;
        return this.repository.save(register);
    }

    public async updateField(fieldUpdate: FieldUpdate) {
        const step = await this.stepRepository.findByFiled(fieldUpdate.field);

        if (!step) {
            throw new InvalidDatasException(JSON.stringify(["You trying update field invalid."]));
        }

        if (step.validation) {
            this.validatorFactory
                .make({ validation: step.validation })
                .validate(fieldUpdate.data);
        }

        let userByToken = await this.repository.findByToken(fieldUpdate.token);
        userByToken = userByToken[0];

        // @ts-ignore
        if (!userByToken.nextStep) {
            return null;
        }

        // @ts-ignore
        const isFieldUpdateCorrect = fieldUpdate.field == userByToken.nextStep;
        if (!isFieldUpdateCorrect) {
            // @ts-ignore
            throw new BusinesssException(`The field that you are trying update no correct! The field correct is ${userByToken.nextStep}`);
        }

        const nextStep = await this.stepRepository.getNextStep(step);

        const field = nextStep != null ? nextStep.field : null;
        await this.repository.update(
            { token: fieldUpdate.token }, 
            { $set: { nextStep: field } }
        );  


        return field;
    }
}

export default UserService;