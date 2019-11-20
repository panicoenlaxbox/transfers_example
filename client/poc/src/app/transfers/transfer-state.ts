import { Target } from './target.enum';

export class TransferState {
  constructor(target: Target, value: number[]) {
    this.target = target;
    this.value = value;
  }

  target: Target;
  value: number[];
}


