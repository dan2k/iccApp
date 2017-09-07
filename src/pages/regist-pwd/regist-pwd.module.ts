import { MaskDirective } from './../../directives/mask/mask';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistPwdPage } from './regist-pwd';
@NgModule({
  declarations: [
    RegistPwdPage,
    MaskDirective,
  ],
  imports: [
    IonicPageModule.forChild(RegistPwdPage),
    
  ],
})
export class RegistPwdPageModule {}
