import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}
  public isLoggedIn: boolean;

  public ngOnInit(): void {
    this.auth.isLoggedIn().subscribe(user => {
      this.isLoggedIn = !!user;
    });
  }

  public onSignOut(): void {
    this.auth.onSignOut();
    this.router.navigate(['/auth']);
  }
}
