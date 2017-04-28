import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';
import firebase from 'firebase';

import { Auth } from './auth';

@Injectable()
export class Todos {

  todos$: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);
  private todosSubscription;

  constructor(public af: AngularFire, private as: Auth) { }

  loadAll(uid: string) {
    this.todosSubscription = this.af.database.list('/todos/' + uid).subscribe(todos => {
      this.todos$.next(todos);
    });
  }

  addTodo(todo: string) {
    return this.af.database.list('/todos/' + this.as.user$.getValue().uid)
      .push({
        text: todo, timestamp: firebase.database.ServerValue.TIMESTAMP
      });
  }

  deleteTodo(todoKey: string) {
    return this.af.database.list('/todos/' + this.as.user$.getValue().uid + '/' + todoKey)
      .remove();
  }

  unsubscribeTodo() {
    this.todosSubscription.unsubscribe();
  }

}
