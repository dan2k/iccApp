import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopSmilePage } from './pop-smile';

@NgModule({
  declarations: [
    PopSmilePage,
  ],
  imports: [
    IonicPageModule.forChild(PopSmilePage),
  ],
})
export class PopSmilePageModule {}
