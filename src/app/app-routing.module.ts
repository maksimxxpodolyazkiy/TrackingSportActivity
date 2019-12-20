import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { SignUpComponent } from './components/auth/components/sign-up/sign-up.component';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth']);
const redirectLoggedInToMain = () => redirectLoggedInTo(['main']);

const routes: Route[] = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  { path: '**', redirectTo: 'auth' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
