import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopSolvePage } from './pop-solve';

@NgModule({
  declarations: [
    PopSolvePage,
  ],
  imports: [
    IonicPageModule.forChild(PopSolvePage),
  ],
})
export class PopSolvePageModule {}
