import { Controller, Get } from '@nestjs/common';
import { WeightService } from './weight.service';
import { Weight } from './weight.entity';

@Controller('weight')
export class WeightController {
    constructor(private weightService: WeightService) {}

    @Get()
    getAllWeights(): Promise<Weight[]> {
        return this.weightService.findAll();
    }
}
