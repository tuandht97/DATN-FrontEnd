import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public sidebarOpened = false;
  currentUser: string;

  toggleOffcanvas() {
    this.sidebarOpened = !this.sidebarOpened;
    if (this.sidebarOpened) {
      document.querySelector('.sidebar-offcanvas').classList.add('active');
    }
    else {
      document.querySelector('.sidebar-offcanvas').classList.remove('active');
    }
  }

  constructor(
    config: NgbDropdownConfig,
    public auth: AuthService,
    private router: Router
  ) {
    config.placement = 'bottom-right';
    this.currentUser = this.auth.getCurrentUser;
  }
  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['exchange']);
  }
}
