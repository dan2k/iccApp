import { DirectivesModule } from './../../directives/directives.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HwPage } from './hw';


@NgModule({
  declarations: [
    HwPage,
  ],
  imports: [
    IonicPageModule.forChild(HwPage),DirectivesModule
  ],
})
export class HwPageModule {}
