import InvalidDatasException from "../exceptions/InvalidDatasException";
import ValidatorInterface from "./contracts/ValidatorInterface";

class BirthDayValidator implements ValidatorInterface {


    validate(birthDay: string) {
        var regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
        if (!(regex.test(birthDay))) {
            throw new InvalidDatasException(
                JSON.stringify(["BirthDay invalid."])
            );
        }
    }
}

export default BirthDayValidator;