import * as bcrypt from "bcryptjs";

class Encrypter {

    readonly SALT_LENGTH: number = 10;

    getHash(value: string): Promise<string> {
        return bcrypt.hash(value, this.SALT_LENGTH);
    } 
}

export default Encrypter;