import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  currentUserRole: string;
  currentUser: string;

  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.currentUserRole = this.auth.getCurrentUserRole;
    this.currentUser = this.auth.getCurrentUser;

    this.activatedRoute.paramMap.pipe(
      map(params => params.get('username')),
      switchMap(id => this.userService.getById(id))
    ).subscribe(user => {
      if (user["result"]) {
        this.user = user["result"];
      } else {
        this.toastr.error("Người dùng không tồn tại");
        this.router.navigate(['user/list']);
      }
    });
  }
}
