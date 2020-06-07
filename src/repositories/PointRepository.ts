import Repository from "./Repository";
import PointRepositoryInterface from "./contracts/PointRepositoryInterface";
import { Transaction } from "knex";

class PointRepository extends Repository implements PointRepositoryInterface {

    constructor() {
        super("points");
    }

    public create(newRegister: { [key: string]: any }): Promise<any> {
        return new Promise((resolve, reject) => {
            this.getConnection().transaction(async (trx) => {
                try {
                    const itens = newRegister.itens;
                    delete newRegister.itens;
                    const pointCreated = await this.getConnection()(this.table)
                        .transacting(trx)
                        .insert(newRegister)
                        .returning("id");
                    
                    const pointsItens = itens.map((item: { [key: string]: any }) => {
                        return {
                            item_id: item,
                            point_id: pointCreated[0]
                        };
                    });
    
                    await this.insertManyPointsItens(pointsItens, trx);
                    trx.commit();
                    resolve();
                } catch (error) {
                    trx.rollback();
                    reject(error);
                }
            });
        });
    }

    public insertManyPointsItens(registers: { [key: string]: any }[], trx: Transaction) {
        return this.getConnection()("points_itens")
            .transacting(trx)
            .insert(registers); 
    }

};

export default PointRepository;