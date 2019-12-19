import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  public onSignIn(email, password) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['main']);
      })
      .catch(err => {
        window.alert(err.message);
      });
  }

  public getUserId() {
    return this.afAuth.auth.currentUser.uid;
  }

  public isLoggedIn() {
    return this.afAuth.authState;
  }

  public getUser() {
    console.log(this.afAuth.auth.currentUser);

    return this.afAuth.auth.currentUser;
  }

  public onSignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        window.alert(error.message);
      });
  }

  public onSignOut() {
    this.afAuth.auth.signOut();
  }
}
