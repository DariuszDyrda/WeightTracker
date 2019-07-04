import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightModule } from './weight/weight.module';
import { TypeOrmConfigService } from './config/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    WeightModule,
  ],
})
export class AppModule {}
