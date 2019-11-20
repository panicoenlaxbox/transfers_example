import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransfersRoutingModule } from './transfers-routing.module';
import { HomeComponent } from './home/home.component';
import { ItemComponent } from './item/item.component';

import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ListComponent } from './list/list.component';
import { PointOfSaleService } from './point-of-sale.service';
import { TransferService } from './transfer.service';
import { TransferStateService } from './transfer-state.service';
import { TransferNotificationService } from './transfer-notification.service';

@NgModule({
  declarations: [HomeComponent, ItemComponent, ListComponent],
  imports: [
    DataViewModule,
    ButtonModule,
    CommonModule,
    TransfersRoutingModule
  ],
  providers: [PointOfSaleService, TransferStateService, TransferService, TransferNotificationService]
})
export class TransfersModule { }
