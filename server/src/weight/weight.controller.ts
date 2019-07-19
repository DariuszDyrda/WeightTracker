import { Controller, Get, Post, Body, UseGuards, Put, Param, ParseIntPipe, Delete, ValidationPipe } from '@nestjs/common';
import { WeightService } from './weight.service';
import { Weight } from './weight.entity';
import { WeightDto } from './dto/weight.dto';
import { FilterDto } from './dto/filter.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { WeightPutDto } from './dto/weight.put.dto';

@Controller('weight')
@UseGuards(AuthGuard())
export class WeightController {
    constructor(private weightService: WeightService) {}

    @Get()
    getMeasurements(
        @Body(ValidationPipe) filterDto: FilterDto,
        @GetUser() user: User,
    ): Promise<Weight[]> {
        return this.weightService.getMeasurements(filterDto, user);
    }

    @Post()
    addMeasurement(
        @Body(ValidationPipe) weightDto: WeightDto,
        @GetUser() user: User,
        ): Promise<Weight> {
        return this.weightService.addMeasurement(weightDto, user);
    }

    @Put('/:id')
    editMeasurement(
        @Body() weightPutDto: WeightPutDto,
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Weight> {
       return this.weightService.editMeasurement(weightPutDto, id, user);
    }

    @Delete('/:id')
    deleteMeasurement(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Weight> {
        return this.weightService.deleteTaskById(id, user);
    }
}
