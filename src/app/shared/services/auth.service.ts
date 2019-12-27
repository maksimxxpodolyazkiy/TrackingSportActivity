import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  public onSignIn(email, password): void {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['main']);
      })
      .catch(err => {
        window.alert(err.message);
      });
  }

  public getUserId(): Observable<string> {
    return this.afAuth.authState.pipe(map(user => user.uid));
  }

  public isLoggedIn(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  public getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  public onSignUp(email, password): Promise<boolean | void> {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/main']))
      .catch(error => {
        window.alert(error.message);
      });
  }

  public onSignOut(): void {
    this.afAuth.auth.signOut();
  }
}
