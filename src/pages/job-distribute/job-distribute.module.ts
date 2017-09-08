import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JobDistributePage } from './job-distribute';

@NgModule({
  declarations: [
    JobDistributePage,
  ],
  imports: [
    IonicPageModule.forChild(JobDistributePage),
  ],
})
export class JobDistributePageModule {}
