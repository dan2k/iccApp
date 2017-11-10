import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { IonDigitKeyboard } from "../../components/ion-digit-keyboard/ion-digit-keyboard.module"
@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),IonDigitKeyboard
  ],
})
export class LoginPageModule {}
