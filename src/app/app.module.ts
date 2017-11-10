//import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from  '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { ServiceProvider } from '../providers/service/service';
//import { CommentProvider } from '../providers/comment/comment';
import { MessageProvider } from '../providers/message/message';
//import { HwProvider } from '../providers/hw/hw';
//import { SwProvider } from '../providers/sw/sw';



//import { UserProvider } from '../providers/user/user';
//import { RegisterProvider } from '../providers/register/register';
//import { DirectivesModule } from '../directives/directives.module';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{ tabsPlacement: 'top' }),
    HttpModule,
    //DirectivesModule,
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,

  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //ServiceProvider,

    //CommentProvider,
    MessageProvider,
    //HwProvider,
    //SwProvider,
    //UserProvider,
    //RegisterProvider
  ]
})
export class AppModule {}
