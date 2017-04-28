import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { Register } from '../pages/register/register';

import { Auth } from './../providers/auth';
import { Todos } from './../providers/todos';
import { Helper } from './../providers/helper';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  isLoggedIs;

  pages: Array<{ title: string, component: any, auth: boolean }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private as: Auth, private ts: Todos, private hps: Helper) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, auth: true },
      { title: 'Login', component: Login, auth: false },
      { title: 'Register', component: Register, auth: false }
    ];

    this.as.isLoggedin().subscribe(state => {
      this.isLoggedIs = state && state.uid ? true : false;
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    this.ts.unsubscribeTodo();
    this.as.logout().then(res => {
      console.log('logout success', res)
      this.nav.setRoot(Login, {}, { animate: true, direction: 'forward' })
      this.hps.dismissLoading();
      this.hps.presentToast('Logout Successful!', 'logout success');
    }).catch(err => {
      console.log('logout err', err);
      this.hps.dismissLoading();
      this.hps.presentToast('Something went wrong, please contract support!', 'logout err')
    });
  }
}
