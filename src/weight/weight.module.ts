import { Module } from '@nestjs/common';
import { WeightService } from './weight.service';
import { WeightController } from './weight.controller';

@Module({
  providers: [WeightService],
  controllers: [WeightController],
})
export class WeightModule {}
