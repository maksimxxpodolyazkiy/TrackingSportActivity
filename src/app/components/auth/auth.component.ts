import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  constructor(public auth: AuthService, public router: Router) {}

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  public onSignIn(email, password) {
    this.auth.onSignIn(email, password);
  }

  public onSignUp(email, password) {
    this.auth.onSignUp(email, password);
  }

  ngOnInit() {}
}
