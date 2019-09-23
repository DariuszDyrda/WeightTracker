import { WeightUnits } from '../weightUnits.enum';
import { IsOptional, IsDate, IsIn, IsISO8601 } from 'class-validator';

const UNITS = Object.values(WeightUnits);

export class FilterDto {
    @IsOptional()
    @IsISO8601()
    dateFrom: Date;

    @IsOptional()
    @IsISO8601()
    dateTo: Date;
    
    @IsOptional()
    @IsIn(UNITS)
    unit: WeightUnits;
}
