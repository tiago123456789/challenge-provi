import PointRepositoryInterface from "../repositories/contracts/PointRepositoryInterface";
import NotFoundException from "../exceptions/NotFoundException";

class PointService {

    constructor(private readonly repository: PointRepositoryInterface) {
        this.repository = repository;
    }

    async findById(id: number) {
        const point = await this.repository.findById(id);
        if (!point) {
            throw new NotFoundException("Point not found!");
        }
        return point;
    }
}

export default PointService;