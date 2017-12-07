import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProblemBranchPage } from './problem-branch';

@NgModule({
  declarations: [
    ProblemBranchPage,
  ],
  imports: [
    IonicPageModule.forChild(ProblemBranchPage),
  ],
})
export class ProblemBranchPageModule {}
