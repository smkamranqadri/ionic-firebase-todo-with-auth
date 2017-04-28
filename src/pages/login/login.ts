import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HomePage } from './../home/home';
import { Register } from './../register/register';

import { Auth } from '../../providers/auth';
import { Helper } from '../../providers/helper';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, private as: Auth, private hps: Helper) { }

  ionViewDidLoad() {
    this.hps.presentLoading('login set home to root');
    this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
  }

  register() {
    this.navCtrl.setRoot(Register, {}, { animate: true, direction: 'forward' });
  }

  login(valid: boolean, { email, password }) {
    event.preventDefault();
    if (!valid) return;
    this.hps.presentLoading('login');
    this.as.login(email, password).then(res => {
      console.log('login success', res)
      this.navCtrl.setRoot(HomePage, {}, { animate: true, direction: 'forward' });
      this.hps.dismissLoading();
      this.hps.presentToast('Login Successful!', 'login success');
    }).catch(err => {
      console.log('login err', err);
      this.hps.dismissLoading();
      this.hps.presentToast('Something went wrong, please contract support!', 'login err')
    });
  }

}
