import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { WeightService } from './weight.service';
import { Weight } from './weight.entity';
import { WeightDto } from './dto/weight.dto';
import { FilterDto } from './dto/filter.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('weight')
@UseGuards(AuthGuard())
export class WeightController {
    constructor(private weightService: WeightService) {}

    @Get()
    getMeasurements(
        @Body() filterDto: FilterDto,
        @GetUser() user: User,
    ): Promise<Weight[]> {
        return this.weightService.getMeasurements(filterDto, user);
    }

    @Post()
    addMeasurement(
        @Body() weightDto: WeightDto,
        @GetUser() user: User,
        ): Promise<Weight> {
        return this.weightService.addMeasurement(weightDto, user);
    }
}
