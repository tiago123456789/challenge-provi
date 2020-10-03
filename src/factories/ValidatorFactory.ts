import BirthDayValidator from "../validations/BirthDayValidator";
import ValidatorInterface from "../validations/contracts/ValidatorInterface";
import CpfValidator from "../validations/CpfValidator";
import AddressValidatorFactory from "./AddressValidatorFactory";
import FactoryInterface from "./contracts/FactoryInterface";

class ValidatorFactory implements FactoryInterface<ValidatorInterface> {

    private validations = {
        "CpfValidator": new CpfValidator(),
        "BirthDayValidator": new BirthDayValidator(),
        "AddressValidator": new AddressValidatorFactory().make({})
    };

    make(values: { [key: string]: any; }): ValidatorInterface {
        // @ts-ignore
        return this.validations[values.validation];
    }

    
}

export default ValidatorFactory;