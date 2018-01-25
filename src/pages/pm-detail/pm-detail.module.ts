import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PmDetailPage } from './pm-detail';

@NgModule({
  declarations: [
    PmDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PmDetailPage),
  ],
})
export class PmDetailPageModule {}
