import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private db: AngularFirestore,
    private afAuth: AuthService,
  ) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    console.log('guard');

    return this.afAuth.getUserId().pipe(
      switchMap(id => {
        return this.db
          .collection('users')
          .doc(id)
          .get()
          .pipe(
            map(doc => {
              console.log(doc);

              if (doc.data().isAdmin) {
                this.router.navigate(['admin']);
              } else {
                return true;
              }
            }),
          );
      }),
    );
    //   this.db
    //     .collection('users')
    //     .doc(uid)
    //     .get()
    //     .pipe(doc => {
    //       if (doc.data().isAdmin) {
    //         this.router.navigate(['admin']);
    //       } else {
    //       }
    //     });
    // });

    // return this.db
    //   .collection('users')
    //   .doc(uid)
    //   .get()
    //   .pipe(doc => {
    //     if (doc.data().isAdmin) {
    //       this.router.navigate(['admin']);
    //     } else {
    //     }
    //   });
  }
}
