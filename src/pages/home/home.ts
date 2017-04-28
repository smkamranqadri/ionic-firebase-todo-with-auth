import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Auth } from './../../providers/auth';
import { Helper } from './../../providers/helper';
import { Todos } from './../../providers/todos';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todos: Array<any>;

  constructor(public navCtrl: NavController, private as: Auth, private hps: Helper, private ts: Todos) { }

  ionViewDidLoad() {
    this.hps.dismissLoading();
    this.as.isLoggedin().take(1).subscribe(state => {
      this.ts.loadAll(state.uid);
    });
    this.ts.todos$.distinctUntilChanged().subscribe(todos => this.todos = todos);
  }

  ionViewCanEnter() {
    return new Promise((resolve, reject) => {
      this.as.isLoggedin().take(1).subscribe(res => {
        res && res.uid ? resolve(true) : reject(false)
      })
    });
  }

  addTodo(todo: any) {
    console.log('todo', todo.value)
    if (!todo.value) return;
    this.hps.presentLoading('add todo');
    this.ts.addTodo(todo.value).then(res => {
      console.log('add todo success', res);
      todo.value = '';
      this.hps.dismissLoading();
      this.hps.presentToast('Todo added successfully!', 'add todo success');
    }).catch(err => {
      console.log('add todo err', err);
      this.hps.dismissLoading();
      this.hps.presentToast('Something went wrong, please contract support!', 'add todo err');
    });
  }

  deleteTodo(todo: any) {
    this.hps.presentLoading('delete todo');
    this.ts.deleteTodo(todo.$key).then(res => {
      console.log('delete todo success', res);
      this.hps.dismissLoading();
      this.hps.presentToast('Todo deleted successfully!', 'delete todo success');
    }).catch(err => {
      console.log('delete todo err', err);
      this.hps.dismissLoading();
      this.hps.presentToast('Something went wrong, please contract support!', 'delete todo err');
    });
  }

}
