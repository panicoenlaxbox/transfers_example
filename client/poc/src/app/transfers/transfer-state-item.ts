import { Target } from './target.enum';
import { TransferOperation } from './transfer.operation';

export class TransferStateItem {
  constructor(target: Target, id: number, operation: TransferOperation) {
    this.target = target;
    this.id = id;
    this.operation = operation;
  }
  target: Target;
  id: number;
  operation: TransferOperation;
}
