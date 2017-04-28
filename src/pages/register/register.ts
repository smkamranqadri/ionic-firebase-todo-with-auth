import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Login } from './../login/login';

import { Auth } from '../../providers/auth';
import { Helper } from '../../providers/helper';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  constructor(public navCtrl: NavController, public navParams: NavParams, private as: Auth, private hps: Helper) { }

  ionViewDidLoad() { }

  login() {
    this.navCtrl.setRoot(Login, {}, { animate: true, direction: 'forward' });
  }

  register(valid: boolean, { first_name, last_name, email, password }) {
    event.preventDefault();
    if (!valid) return;
    this.hps.presentLoading('register');
    this.as.register(email, password).then(res => {
      console.log('register success', res)
      this.as.login(email, password).then(res => {
        console.log('login success', res)
        this.as.createProfile(res.uid, first_name, last_name, email).then(res => {
          console.log('create profile success', res)
          this.hps.dismissLoading();
          this.hps.presentToast('Register Successful!', 'create profile success');
        }).catch(err => {
          console.log('create profile err', err);
          this.hps.dismissLoading();
          this.hps.presentToast('Something went wrong, please contract support!', 'create profile err')
        });
      }).catch(err => {
        console.log('login err', err);
        this.hps.dismissLoading();
        this.hps.presentToast('Something went wrong, please contract support!', 'login err')
      });
    }).catch(err => {
      console.log('login err', err);
      this.hps.dismissLoading();
      this.hps.presentToast('Something went wrong, please contract support!', 'register err')
    });
  }

}
