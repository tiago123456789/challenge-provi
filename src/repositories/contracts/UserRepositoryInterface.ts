interface UserRepositoryInterface {

    save(register: { [key: string]: any }): any;
}

export default UserRepositoryInterface;