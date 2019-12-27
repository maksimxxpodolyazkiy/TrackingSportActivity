import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class NotAdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private db: AngularFirestore,
    private router: Router,
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return this.auth.getUserId().pipe(
      switchMap(id => {
        return this.db
          .collection('users')
          .doc(id)
          .get()
          .pipe(
            map(doc => {
              if (!doc.data().isAdmin) {
                this.router.navigate(['main']);
              } else {
                return true;
              }
            }),
          );
      }),
    );
  }
}
