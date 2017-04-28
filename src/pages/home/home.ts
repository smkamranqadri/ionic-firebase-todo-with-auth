import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Auth } from './../../providers/auth';
import { Helper } from './../../providers/helper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private as: Auth, private hps: Helper) { }

  ionViewDidLoad() {
    this.hps.dismissLoading();
  }

  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.as.isLoggedin().subscribe(res => {
        res && res.uid ? resolve(true) : reject(false)
      })
    });
  }

}
