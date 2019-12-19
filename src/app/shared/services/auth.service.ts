import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  public onSignIn(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(err => {
      window.alert(err.message);
    });
  }

  public getUserId() {
    return this.afAuth.auth.currentUser.uid;
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
