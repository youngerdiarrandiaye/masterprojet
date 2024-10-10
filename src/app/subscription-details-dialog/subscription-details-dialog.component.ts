import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Subscription} from "../model/subscription.model";

@Component({
  selector: 'app-subscription-details-dialog',
  templateUrl: './subscription-details-dialog.component.html',
  styleUrl: './subscription-details-dialog.component.css'
})
export class SubscriptionDetailsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Subscription) {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active':
        return 'status-active';
      case 'Suspended':
        return 'status-suspended';
      case 'Terminated':
        return 'status-terminated';
      default:
        return '';
    }
  }


}
