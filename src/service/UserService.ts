import { Logger } from "winston";
import logger from "../config/Logger";
import BusinessLogicException from "../exceptions/BusinessLogicException";
import InvalidDatasException from "../exceptions/InvalidDatasException";
import FactoryInterface from "../factories/contracts/FactoryInterface";
import FieldUpdate from "../models/FieldUpdate";
import StepRepositoryInterface from "../repositories/contracts/StepRepositoryInterface";
import UserRepositoryInterface from "../repositories/contracts/UserRepositoryInterface";
import { CacheInterface } from "../utils/Cache";
import Encrypter from "../utils/Encrypter";
import Uuid from "../utils/Uuid";
import ValidatorInterface from "../validations/contracts/ValidatorInterface";

class UserService {

    constructor(
        private readonly uuidUtil: Uuid,
        private readonly encrypterUtil: Encrypter,
        private readonly repository: UserRepositoryInterface,
        private readonly stepRepository: StepRepositoryInterface,
        private readonly validatorFactory: FactoryInterface<ValidatorInterface>,
        private readonly cache: CacheInterface,
        private readonly logger: Logger
    ) { }

    public findByToken(token: string): Promise<any> {
        return this.repository.findByToken(token);
    }

    public async register(register: { [key: string]: any }) {
        const userWithEmail = await this.repository.findByEmail(register.email);
        const isExistUserWithEmail: boolean = userWithEmail.length > 0;
        if (isExistUserWithEmail) {
            throw new BusinessLogicException("Use another email!");
        }

        this.logger.info(`Creating new user with email: ${register.email}`)
        const step = await this.stepRepository.getFirstStep();
        register.password = await this.encrypterUtil.getHash(register.password);
        register.token = await this.uuidUtil.get();
        register.nextStep = step.field;
        return this.repository.save(register);
    }

    public async updateField(fieldUpdate: FieldUpdate) {
        const step = await this.stepRepository.findByField(fieldUpdate.field);

        if (!step) {
            throw new InvalidDatasException(JSON.stringify(["You trying update field invalid."]));
        }

        let userByToken = await this.repository.findByToken(fieldUpdate.token);
        userByToken = userByToken[0];

        const fieldsUpdated: any[] = await this.cache.smembers(`${fieldUpdate.token}_fields_updated`);
        this.isFieldUpdateUnOrder(fieldsUpdated, fieldUpdate, userByToken);

        if (step.validation) {
            await this.validatorFactory
                .make({ validation: step.validation })
                .validate(fieldUpdate.data);
        }

        const nextStep = await this.stepRepository.getNextStep(step);
        let field = nextStep != null ? nextStep.field : null;
        await this.isValueAlreadyUsedAnotherUser(fieldUpdate, userByToken);

        const isStepAddress = fieldUpdate.field == 'address';
        if (isStepAddress) {
            // @ts-ignorex
            let address = await this.cache.get(fieldUpdate.data);
            address = JSON.parse(address);
            fieldUpdate.data = address;
        }
        
    
        // @ts-ignore
        const isFieldUpdateCorrect = fieldUpdate.field == userByToken.nextStep;
        if (!isFieldUpdateCorrect) {
            // @ts-ignore
            const registers = await this.repository.findByFieldAnId(fieldUpdate, userByToken._id);
            const isExistData = registers.length > 0;
            if (!isExistData) {
                // @ts-ignore
                logger.info(`Updatation data in ${fieldUpdate.field} to user ${userByToken._id}`);
                await this.repository.update(
                    { 
                        token: fieldUpdate.token
                    },
                    { 
                        $push: {
                            [fieldUpdate.field]: {
                                data: fieldUpdate.data,
                                updatedAt: new Date()
                            }
                        }
                    }
                );
                return field;
            }

            // @ts-ignore
            logger.info(`Additing data in ${fieldUpdate.field} to user ${userByToken._id}`);
            await this.repository.update(
                {
                    token: fieldUpdate.token,
                    [fieldUpdate.field]: {
                        $elemMatch: { data: fieldUpdate.data }
                    }
                },
                {
                    $set: {
                        [`${fieldUpdate.field}.$.updatedAt`]: new Date() 
                    }
                }
            );
            return field;
        }

        // @ts-ignore
        logger.info(`Additing information about ${fieldUpdate.field} to user ${userByToken._id}`);
        await this.repository.update(
            { token: fieldUpdate.token },
            {
                $set: {
                    nextStep: field,
                    [fieldUpdate.field]: [
                        { data: fieldUpdate.data, updatedAt: new Date() }
                    ]
                }
            }
        );

        await this.cache.sadd(`${fieldUpdate.token}_fields_updated`, [...fieldsUpdated, fieldUpdate.field], 86400)

        return field;
    }


    private isFieldUpdateUnOrder(fieldsUpdated: any[], fieldUpdate: FieldUpdate, userByToken: { [key: string]: any }) {
        const isFieldUpdateUnorder = (
            // @ts-ignorex
            fieldUpdate.field != userByToken.nextStep && 
            fieldsUpdated.indexOf(fieldUpdate.field) == -1
        )

        if (isFieldUpdateUnorder) {
            // @ts-ignore
            throw new BusinessLogicException(`Please must order field updation. Then next field is ${userByToken.nextStep}`);
        }
    }

    private async isValueAlreadyUsedAnotherUser(fieldUpdate: FieldUpdate, userByToken: { [key: string]: any }) {
        // @ts-ignore
        const registersWithDatasMencionated = await this.repository.findByFieldAnIdDifferenteMencionated(fieldUpdate, userByToken._id)
        const isDatasAlreadyUsed = registersWithDatasMencionated.length > 0;
        if (isDatasAlreadyUsed) {
            // @ts-ignore
            logger.info(`Data in ${fieldUpdate.field} already used per ${userByToken._id}`);
            throw new BusinessLogicException("The value is already used.");
        }
    }
}

export default UserService;