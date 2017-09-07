import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistConfirmPage } from './regist-confirm';

@NgModule({
  declarations: [
    RegistConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistConfirmPage),
  ],
})
export class RegistConfirmPageModule {}
