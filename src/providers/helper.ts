import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Loading } from 'ionic-angular';

@Injectable()
export class Helper {

  loading: Loading;

  constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  presentToast(message: string, caller: string) {
    console.log('toast caller, ', caller);
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  presentLoading(caller: string) {
    console.log('loading caller, ', caller);
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  dismissLoading() {
    if (this.loading) this.loading.dismissAll();
  }
}
