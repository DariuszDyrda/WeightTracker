import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weight } from './weight.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WeightService {
    constructor(
        @InjectRepository(Weight)
        private weightRepository: Repository<Weight>,
    ) {}

    findAll(): Promise<Weight[]> {
        return this.weightRepository.find();
    }
}
