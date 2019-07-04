import { Module } from '@nestjs/common';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature()],
    providers: [WeightService],
    controllers: [WeightController],
})
export class WeightModule {}
