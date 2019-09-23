import { WeightUnits } from "../weightUnits.enum";
import { IsNumber, IsNotEmpty, IsIn, IsOptional, IsNumberString, IsDateString, IsISO8601 } from 'class-validator';

const UNITS = Object.values(WeightUnits);

export class WeightPutDto {
    @IsOptional()
    @IsNumberString()
    amount: number;

    @IsOptional()
    @IsIn(UNITS)
    unit: WeightUnits;

    @IsOptional()
    @IsISO8601()
    date: Date;
}