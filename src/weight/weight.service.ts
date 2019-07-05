import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weight } from './weight.entity';
import { Repository } from 'typeorm';
import { WeightDto} from './dto/weight.dto';
import { DEFAULT_UNIT } from './weightUnits.enum';
import { FilterDto } from './dto/filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class WeightService {
    constructor(
        @InjectRepository(Weight)
        private weightRepository: Repository<Weight>,
    ) {}

    async getMeasurements(filterDto: FilterDto, user: User): Promise<Weight[]> {
        const { dateFrom, dateTo, unit } = filterDto;
        const query = this.weightRepository.createQueryBuilder('weight');

        query.where('weight.userId = :userId', { userId: user.id });
        if (dateFrom) {
            query.andWhere('weight.date >= :dateFrom', { dateFrom });
        }
        if(dateTo) {
            query.andWhere('weight.date < :dateTo', { dateTo });
        }

        const weights = await query.getMany();
        if (unit) {
            weights.forEach(element => {
                element.convertTo(unit);
            });
        }
        return weights;
    }

    async addMeasurement(weightDto: WeightDto, user: User): Promise<Weight> {
        const amount = weightDto.amount;
        const unit = weightDto.unit || DEFAULT_UNIT;

        const measurement = new Weight();
        measurement.amount = amount;
        measurement.unit = unit;
        measurement.user = user;

        return await measurement.save();
    }

}
