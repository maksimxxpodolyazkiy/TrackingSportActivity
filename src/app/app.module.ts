import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US, en_GB } from 'ng-zorro-antd';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthComponent } from './components/auth/auth.component';
import { MainComponent } from './components/main/main.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { SignUpComponent } from './components/auth/components/sign-up/sign-up.component';
import { AdminComponent } from './components/admin/admin.component';
import { ImageComponent } from './components/admin/components/image-form-control/image/image.component';
import { ImageFormControlComponent } from './components/admin/components/image-form-control/image-form-control.component';
import { DropdownFormControlComponent } from './components/main/components/dropdown-form-control/dropdown-form-control.component';
import { DropdownComponent } from './components/main/components/dropdown-form-control/dropdown/dropdown.component';
import { ActivityCardComponent } from './components/main/components/activity-card/activity-card.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AuthComponent,
    MainComponent,
    SignUpComponent,
    AdminComponent,
    ImageComponent,
    ImageFormControlComponent,
    DropdownFormControlComponent,
    DropdownComponent,
    ActivityCardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AngularFireAuthGuard,
    AngularFireAuth,
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class AppModule {}
