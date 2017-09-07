import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistPlacePage } from './regist-place';

@NgModule({
  declarations: [
    RegistPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(RegistPlacePage),
  ],
})
export class RegistPlacePageModule {}
