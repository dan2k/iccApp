import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowupCustomerSelfPage } from './followup-customer-self';

@NgModule({
  declarations: [
    FollowupCustomerSelfPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowupCustomerSelfPage),
  ],
})
export class FollowupCustomerSelfPageModule {}
