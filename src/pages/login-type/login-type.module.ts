import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginTypePage } from './login-type';

@NgModule({
  declarations: [
    LoginTypePage,
  ],
  imports: [
    IonicPageModule.forChild(LoginTypePage),
  ],
})
export class LoginTypePageModule {}
