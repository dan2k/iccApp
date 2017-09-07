import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalProblemPage } from './modal-problem';

@NgModule({
  declarations: [
    ModalProblemPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalProblemPage),
  ],
})
export class ModalProblemPageModule {}
