import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Org } from '../_enum/org.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  currentUserRole: string;
  role: string;
  currentUser: string;

  public samplePagesCollapsed = true;
  constructor(private auth: AuthService) {
    this.currentUserRole = this.auth.getCurrentUserRole;
    switch (this.currentUserRole) {
      case Org.Admin:
        this.role = 'Nhà phát hành';
        break;
      case Org.Seller:
        this.role = 'Người kinh doanh BĐS';
        break;
      case Org.User:
        this.role = 'Nhà đầu tư';
        break;
      default:
        this.role = 'Nhà đầu tư';
        break;
    }
    this.currentUser = this.auth.getCurrentUser;
  }

  ngOnInit() {
  }

  get isAdmin() {
    return this.currentUserRole === Org.Admin;
  }

  get isCreater() {
    return this.currentUserRole === Org.Admin && this.currentUser === 'admin';
  }

  get isSeller() {
    return this.currentUserRole === Org.Seller;
  }

  get isUser() {
    return this.currentUserRole === Org.User;
  }
}
