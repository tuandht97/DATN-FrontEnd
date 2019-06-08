import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public a: number = -10;
  display: number = 0;

  constructor(
    public auth: AuthService,
    private router: Router
  ) {
    if (this.auth.loggedIn)
      this.display = 1;
  }

  ngDoCheck() {
    if (this.auth.loggedIn)
      this.display = 1;
    if (this.router.url === "/home" || this.router.url === "/")
      this.display = 2;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
