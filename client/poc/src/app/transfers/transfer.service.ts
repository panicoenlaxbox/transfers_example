import { Injectable } from '@angular/core';
import { PointOfSale } from './point-of-sale';
import { Observable, Subject } from 'rxjs';
import { PointOfSaleResult } from './point-of-sale-result';
import { ListViewModel } from './list-view-model';
import { map } from 'rxjs/operators';
import { PointOfSaleItem } from './point-of-sale-item';
import { TransferStateService } from './transfer-state.service';
import { PointOfSaleService } from './point-of-sale.service';
import { Target } from './target.enum';
import { TransferNotificationService } from './transfer-notification.service';
import { TransferStateItem } from './transfer-state-item';
import { TransferState } from './transfer-state';
import { TransferOperation } from './transfer.operation';

@Injectable()
export class TransferService {

    constructor(private pointOfSaleService: PointOfSaleService, private transferStateService: TransferStateService,
                private transferNotificationService: TransferNotificationService) {
    }

    public get source$(): Observable<TransferState> {
        return this.transferNotificationService.source$.asObservable();
    }

    public get destination$(): Observable<TransferState> {
        return this.transferNotificationService.destination$.asObservable();
    }

    public get sourceItem$(): Observable<TransferStateItem> {
        return this.transferNotificationService.sourceItem$.asObservable();
    }

    public get destinationItem$(): Observable<TransferStateItem> {
        return this.transferNotificationService.destinationItem$.asObservable();
    }

    public getCurrentSelection(target: Target): number[] {
        return this.transferStateService.get(target);
    }

    private getTransferStateSubject(target: Target): Subject<TransferState> {
        return target === Target.Source ? this.transferNotificationService.source$: this.transferNotificationService.destination$;
    }

    private getTransferStateItemSubject(target: Target): Subject<TransferStateItem> {
        return target === Target.Source ? this.transferNotificationService.sourceItem$: this.transferNotificationService.destinationItem$;
    }

    public toggleItemSelection(target: Target, value: PointOfSaleItem) {
        let operation: TransferOperation;
        if (this.transferStateService.exists(target, value.id)) {
            operation = TransferOperation.Remove;
            this.transferStateService.remove(target, value.id);
        } else {
            operation = TransferOperation.Add;
            this.transferStateService.add(target, value.id);
        }
        this.getTransferStateSubject(target).next(new TransferState(target, this.transferStateService.get(target)));
        this.getTransferStateItemSubject(target).next(new TransferStateItem(target, value.id, operation));
    }

    get(target: Target, first: number, rows: number, name?: string): Observable<ListViewModel> {
        return this.pointOfSaleService.get(first, rows, name).pipe(map<PointOfSaleResult, ListViewModel>((result: PointOfSaleResult) => {
            return {
                data: result.data.map(item => this.converToPointOfSaleItem(target, item)),
                totalRecords: result.totalRecords
            } as ListViewModel;
        }));
    }

    private converToPointOfSaleItem(target: Target, item: PointOfSale): PointOfSaleItem {
        return {
            ...item,
            active: this.transferStateService.exists(target, item.id)
        } as PointOfSaleItem;
    }
}
