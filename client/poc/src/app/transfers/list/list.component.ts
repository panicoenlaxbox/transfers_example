import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { PointOfSaleItem } from '../point-of-sale-item';
import { Target } from '../target.enum';
import { TransferService } from '../transfer.service';
import { ListViewModel } from '../list-view-model';
import { Observable } from 'rxjs';
import { TransferState } from '../transfer-state';
import { TransferStateItem } from '../transfer-state-item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private searchText: string;

  @ViewChild('dv') dv: DataView;

  data: PointOfSaleItem[];
  totalRecords: number;

  @Input()
  target: Target;

  transferState$: Observable<TransferState>;
  transferStateItem$: Observable<TransferStateItem>;

  constructor(private transferService: TransferService) { }

  ngOnInit(): void {
    if (this.target === Target.Source) {
      this.transferState$ = this.transferService.source$;
      this.transferStateItem$ = this.transferService.sourceItem$;
    } else if (this.target === Target.Destination) {
      this.transferState$ = this.transferService.destination$;
      this.transferStateItem$ = this.transferService.destinationItem$;
    }
  }

  search(value: string) {
    this.searchText = value;
    this.refresh();
  }

  private refresh() {
    this.dv.paginate({
      first: 0,
      rows: 10
    });
  }

  onSelect(value: PointOfSaleItem) {
    this.transferService.toggleItemSelection(this.target, value);
  }

  loadData(event: any) {
    this.transferService.get(this.target, event.first, event.rows, this.searchText).subscribe((result: ListViewModel) => {
      this.data = result.data;
      this.totalRecords = result.totalRecords;
    });
  }
}
