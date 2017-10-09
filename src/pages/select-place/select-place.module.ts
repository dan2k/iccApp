import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectPlacePage } from './select-place';

@NgModule({
  declarations: [
    SelectPlacePage,
  ],
  imports: [
    IonicPageModule.forChild(SelectPlacePage),
  ],
})
export class SelectPlacePageModule {}
