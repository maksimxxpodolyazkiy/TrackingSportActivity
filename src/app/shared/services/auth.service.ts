import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  onSignUp(email, password) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        window.alert("You have been successfully registered!");
        console.log(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  public onSignIn(email, password) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate["main"])
      .catch(err => {
        window.alert(err.message);
      });
  }
}
