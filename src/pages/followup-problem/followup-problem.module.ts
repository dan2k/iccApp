//import { ImgDefalutDirective } from './../../directives/img-defalut/img-defalut';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FollowupProblemPage } from './followup-problem';
import { DirectivesModule } from '../../directives/directives.module';


@NgModule({
  declarations: [
    FollowupProblemPage,
  ],

  imports: [
    IonicPageModule.forChild(FollowupProblemPage),DirectivesModule
  ],
})
export class FollowupProblemPageModule {}
