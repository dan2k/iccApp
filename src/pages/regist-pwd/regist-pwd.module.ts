//import { MaskDirective } from './../../directives/mask/mask';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistPwdPage } from './regist-pwd';
import { DirectivesModule } from '../../directives/directives.module';
@NgModule({
  declarations: [
    RegistPwdPage,
    //MaskDirective,
  ],
  imports: [
    IonicPageModule.forChild(RegistPwdPage),DirectivesModule

  ],
})
export class RegistPwdPageModule {}
