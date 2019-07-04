import { Controller, Get, Post, Body } from '@nestjs/common';
import { WeightService } from './weight.service';
import { Weight } from './weight.entity';
import { WeightDto } from './dto/weight.dto';

@Controller('weight')
export class WeightController {
    constructor(private weightService: WeightService) {}

    @Get()
    getAllWeights(): Promise<Weight[]> {
        return this.weightService.findAll();
    }

    @Post()
    addMeasurement(@Body() weightDto: WeightDto): Promise<Weight> {
        return this.weightService.addMeasurement(weightDto);
    }
}
