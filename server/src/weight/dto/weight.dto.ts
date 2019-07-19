import { WeightUnits } from "../weightUnits.enum";
import { IsNumber, IsNotEmpty, IsIn, IsNumberString } from "class-validator";

const UNITS = Object.values(WeightUnits);

export class WeightDto {
    @IsNotEmpty()
    @IsNumberString()
    amount: number;

    @IsNotEmpty()
    @IsIn(UNITS)
    unit: WeightUnits;
}