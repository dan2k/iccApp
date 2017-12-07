import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowupCustomerMapPage } from './followup-customer-map';
@NgModule({
  declarations: [
    FollowupCustomerMapPage,
  ],
  imports: [
    IonicPageModule.forChild(FollowupCustomerMapPage),
  ],
})
export class FollowupCustomerMapPageModule {}
