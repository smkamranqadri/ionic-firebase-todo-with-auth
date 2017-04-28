import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class Auth {

  user$: BehaviorSubject<{ uid: string }> = new BehaviorSubject({ uid: '' });

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(state => {
      state && state.uid ?
        this.user$.next({ uid: state.uid }) :
        this.user$.next({ uid: '' })
    })
  }

  isLoggedin() {
    return this.af.auth.asObservable();
  }

  login(email: string, password: string) {
    return this.af.auth.login({ email, password });
  }

  register(email: string, password: string) {
    return this.af.auth.createUser({ email, password });
  }

  createProfile(uid: string, first_name: string, last_name: string, email: string) {
    return this.af.database.object('/users/' + uid).set({
      uid,
      first_name,
      last_name,
      email,
      profileImageURL: 'https://www.gravatar.com/avatar?d=mm'
    });
  }

  logout() {
    return this.af.auth.logout();
  }

}
