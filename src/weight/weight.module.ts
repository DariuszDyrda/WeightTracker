import { Module } from '@nestjs/common';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weight } from './weight.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Weight])],
    providers: [WeightService],
    controllers: [WeightController],
})
export class WeightModule {}
