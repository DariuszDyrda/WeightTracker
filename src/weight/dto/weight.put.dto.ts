import { WeightUnits } from "../weightUnits.enum";
import { IsNumber, IsNotEmpty, IsIn, IsOptional, IsNumberString } from 'class-validator';

const UNITS = Object.values(WeightUnits);

export class WeightPutDto {
    @IsOptional()
    @IsNumberString()
    amount: number;

    @IsOptional()
    @IsIn(UNITS)
    unit: WeightUnits;
}