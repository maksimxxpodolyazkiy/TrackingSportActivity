// import { Injectable } from "@angular/core";
// import {
//   ActivatedRouteSnapshot,
//   CanActivate,
//   Router,
//   RouterStateSnapshot
// } from "@angular/router";
// import { Observable } from "rxjs";
// import { AuthService } from "../../shared/services/auth.service";

// @Injectable({
//   providedIn: "root"
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   public canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | boolean {
//     const loggedIn = AuthService.isLoggedIn();
//     if (!loggedIn) {
//       this.router.navigateByUrl("/main");
//     }
//     return loggedIn;
//   }
// }
