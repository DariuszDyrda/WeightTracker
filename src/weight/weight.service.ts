import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weight } from './weight.entity';
import { Repository } from 'typeorm';
import { WeightDto} from './dto/weight.dto';
import { DEFAULT_UNIT } from './weightUnits.enum';

@Injectable()
export class WeightService {
    constructor(
        @InjectRepository(Weight)
        private weightRepository: Repository<Weight>,
    ) {}

    async findAll(): Promise<Weight[]> {
        return await this.weightRepository.find();
    }

    async addMeasurement(weightDto: WeightDto): Promise<Weight> {
        const amount = weightDto.amount;
        const unit = weightDto.unit || DEFAULT_UNIT;

        const measurement = new Weight();
        measurement.amount = amount;
        measurement.unit = unit;

        return await measurement.save();
    }
}
