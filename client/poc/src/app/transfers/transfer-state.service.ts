import { Injectable } from '@angular/core';
import { Target } from './target.enum';

@Injectable()
export class TransferStateService {
  private source: number[] = [];
  private destination: number[] = [];

  public add(target: Target, id: number): void {
    if (this.exists(target, id)) {
      this.remove(target, id);
    } else {
      this.get(target).push(id);
    }
  }

  public remove(target: Target, id: number): void {
    const arr = this.get(target);
    const index = arr.indexOf(id);
    if (index === -1) {
      return;
    }
    arr.splice(index, 1);
  }

  public exists(target: Target, id: number): boolean {
    return this.get(target).indexOf(id) !== -1;
  }

  public get(target: Target): number[] {
    return target === Target.Source ? this.source : this.destination;
  }
}
