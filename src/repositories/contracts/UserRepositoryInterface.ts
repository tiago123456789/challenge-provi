import FieldUpdate from "../../models/FieldUpdate";

interface UserRepositoryInterface {

    save(register: { [key: string]: any }): any;
    findByEmail(email: string): Promise<any[]>;
    findByToken(token: string): Promise<any[]>;
    update(
        conditions: { [key: string]: any },
        datasModified: { [key: string]: any }
    ): Promise<any>;

    findByFieldAnIdDifferenteMencionated(field: FieldUpdate, id: string): Promise<any>;
    findByFieldAnId(field: FieldUpdate, id: string): Promise<any>;
}

export default UserRepositoryInterface;