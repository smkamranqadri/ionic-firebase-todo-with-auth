import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { CustomFormsModule } from 'ng2-validation'
import { MomentModule } from 'angular2-moment';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { RegisterModule } from './../pages/register/register.module';
import { LoginModule } from './../pages/login/login.module';

import { Auth } from '../providers/auth';
import { Helper } from '../providers/helper';
import { Todos } from '../providers/todos';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

const firebaseConfig = {
  apiKey: "AIzaSyB4vO0cseVuJ8J2JfnIUdAAnoIj2YZtuDo",
  authDomain: "ionic-todo-fbdfc.firebaseapp.com",
  databaseURL: "https://ionic-todo-fbdfc.firebaseio.com",
  projectId: "ionic-todo-fbdfc",
  storageBucket: "ionic-todo-fbdfc.appspot.com",
  messagingSenderId: "449471261906"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp),
    LoginModule,
    RegisterModule,
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    CustomFormsModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Auth, Helper, Todos
  ]
})
export class AppModule { }
