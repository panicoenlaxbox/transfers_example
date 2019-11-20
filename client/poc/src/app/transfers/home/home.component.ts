import { Component } from '@angular/core';
import { TransferService } from '../transfer.service';
import { Target } from '../target.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private transferService: TransferService) {
  }

  save() {
    console.log(this.transferService.getCurrentSelection(Target.Source), this.transferService.getCurrentSelection(Target.Destination));
  }
}
