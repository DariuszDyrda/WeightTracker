import { WeightUnits } from '../weightUnits.enum';

export class FilterDto {
    dateFrom: Date;
    dateTo: Date;
    unit: WeightUnits;
}
