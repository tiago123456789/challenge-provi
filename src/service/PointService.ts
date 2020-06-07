import PointRepositoryInterface from "../repositories/contracts/PointRepositoryInterface";
import NotFoundException from "../exceptions/NotFoundException";

class PointService {

    constructor(private readonly repository: PointRepositoryInterface) {
        this.repository = repository;
    }

    async findById(id: number) {
        const point = await this.repository.findById(id);
        const isNull = point.length == 0;
        if (isNull) {
            throw new NotFoundException("Point not found!");
        }
        return point;
    }

    async create(newRegister: { [key: string]: any}) {
        return this.repository.create(newRegister);
    }

}

export default PointService;