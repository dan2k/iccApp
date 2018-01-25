import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PmPage } from './pm';

@NgModule({
  declarations: [
    PmPage,
  ],
  imports: [
    IonicPageModule.forChild(PmPage),
  ],
})
export class PmPageModule {}
