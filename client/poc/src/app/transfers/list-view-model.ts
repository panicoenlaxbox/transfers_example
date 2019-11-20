import { PointOfSaleItem } from './point-of-sale-item';

export interface ListViewModel {
    data: PointOfSaleItem[];
    totalRecords: number;
}
