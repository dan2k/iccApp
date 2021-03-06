//import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from  '@angular/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { CacheModule } from "ionic-cache";
//import { ServiceProvider } from '../providers/service/service';
//import { CommentProvider } from '../providers/comment/comment';
import { MessageProvider } from '../providers/message/message';
//import { HwProvider } from '../providers/hw/hw';
//import { SwProvider } from '../providers/sw/sw';



//import { UserProvider } from '../providers/user/user';
//import { RegisterProvider } from '../providers/register/register';
//import { DirectivesModule } from '../directives/directives.module';


// for firebase angularfire2

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FIREBASE_CONFIG } from '../config';
import { UseronlineProvider } from '../providers/useronline/useronline';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { tabsPlacement: 'top' }),
    HttpModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    //CacheModule.forRoot(),
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
    UseronlineProvider,
    //HwProvider,
    //SwProvider,
    //UserProvider,
    //RegisterProvider
  ]
})
export class AppModule {}
