import { WeightUnits } from '../weightUnits.enum';
import { IsOptional, IsDate, IsIn } from 'class-validator';

const UNITS = Object.values(WeightUnits);

export class FilterDto {
    @IsOptional()
    @IsDate()
    dateFrom: Date;

    @IsOptional()
    @IsDate()
    dateTo: Date;
    @IsOptional()
    @IsIn(UNITS)
    unit: WeightUnits;
}
