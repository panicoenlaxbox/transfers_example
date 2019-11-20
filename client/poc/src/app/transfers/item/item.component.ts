import { Component, Input, Output, HostListener, EventEmitter } from '@angular/core';
import { PointOfSaleItem } from '../point-of-sale-item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input()
  data: PointOfSaleItem;

  @Output()
  select = new EventEmitter<PointOfSaleItem>();

  @HostListener('click')
  public click() {
    this.data.active = !this.data.active;
    this.select.emit(this.data);
  }
}
