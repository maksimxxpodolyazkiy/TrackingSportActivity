import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { SignUpComponent } from './components/auth/components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { NotAdminGuard } from './shared/guards/not-admin.guard';

const redirectUnauthorizedToAuth = () => redirectUnauthorizedTo(['auth']);

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AngularFireAuthGuard, AdminGuard],
    data: { authGuardPipe: redirectUnauthorizedToAuth },
  },
  {
    path: 'auth',
    component: AuthComponent,
  },

  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  { path: 'admin', component: AdminComponent, canActivate: [NotAdminGuard] },

  { path: '**', redirectTo: 'main' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
