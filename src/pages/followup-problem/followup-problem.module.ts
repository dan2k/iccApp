import { ImgDefalutDirective } from './../../directives/img-defalut/img-defalut';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowupProblemPage } from './followup-problem';


@NgModule({
  declarations: [
    FollowupProblemPage,
    ImgDefalutDirective
  ],
  imports: [
    IonicPageModule.forChild(FollowupProblemPage),
  ],
})
export class FollowupProblemPageModule {}
