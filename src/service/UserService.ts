import UserRepositoryInterface from "../repositories/contracts/UserRepositoryInterface";
import Encrypter from "../utils/Encrypter";
import Uuid from "../utils/Uuid";

class UserService {

    constructor(
        private readonly uuidUtil: Uuid,
        private readonly encrypterUtil: Encrypter,
        private readonly repository: UserRepositoryInterface
    ) {}
        
    public async register(register: { [key:string]: any }) {
        register.password = await this.encrypterUtil.getHash(register.password);
        register.token = await this.uuidUtil.get();
        return this.repository.save(register);
    }
}

export default UserService;