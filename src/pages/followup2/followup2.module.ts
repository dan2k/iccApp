import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Followup2Page } from './followup2';
//import { ImgDefalutDirective } from './../../directives/img-defalut/img-defalut';

@NgModule({
  declarations: [
    Followup2Page,
    //ImgDefalutDirective,
  ],
  imports: [
    IonicPageModule.forChild(Followup2Page),
  ],
})
export class Followup2PageModule {}
