import { Injectable, NotFoundException } from '@nestjs/common';
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

        await measurement.save();

        delete measurement.user;

        return measurement;
    }

    async editMeasurement(weightDto: WeightDto, id: number, user: User): Promise<Weight> {
        const { amount, unit } = weightDto;
        const weight = await this.weightRepository.findOne({ where: { id, userId: user.id } });
        if (amount) {
            weight.amount = amount;
        }
        if (unit) {
            weight.unit = unit;
        }
        return weight.save();
    }

    async deleteTaskById(id: number, user: User): Promise<Weight> {
        const weight = await this.weightRepository.findOne({ where: { id, userId: user.id } });
        if (!weight) {
            throw new NotFoundException(`Task with id: ${id} is not in the database`);
        } else {
            return await this.weightRepository.remove(weight);
        }
    }
}
