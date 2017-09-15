import { DirectivesModule } from './../../directives/directives.module';
//import { Followup2PageModule } from './../followup2/followup2.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobDistributePage } from './job-distribute';
//import { ImgDefalutDirective } from './../../directives/img-defalut/img-defalut';

@NgModule({
  declarations: [
    JobDistributePage,
    //ImgDefalutDirective,
  ],
  imports: [
    IonicPageModule.forChild(JobDistributePage),DirectivesModule

  ],
})
export class JobDistributePageModule {}
