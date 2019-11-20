import { Subject } from 'rxjs';
import { TransferState } from './transfer-state';
import { TransferStateItem } from './transfer-state-item';

export class TransferNotificationService {
  public source$: Subject<TransferState> = new Subject<TransferState>();
  public destination$: Subject<TransferState> =
    new Subject<TransferState>();
  public sourceItem$: Subject<TransferStateItem> = new Subject<TransferStateItem>();
  public destinationItem$: Subject<TransferStateItem> =
    new Subject<TransferStateItem>();
}
