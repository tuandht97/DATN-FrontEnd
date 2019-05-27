import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted = false;
  private filesToUpload = null;
  filename: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    if (this.auth.getCurrentUserRole) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() { }

  files(files) {
    this.filesToUpload = files;
    this.filename = files.item(0).name;
  }

  upload() {
    const formData = new FormData();
    const files = this.filesToUpload;
    if (files.item(0).type !== "text/plain") {
      this.toastr.error("File tải lên định dạng không phù hợp");
      return;
    }
    if (files.item(0).size > 2000) {
      this.toastr.error("File tải quá dung lượng cho phép");
      return;
    }
    formData.append('key', files.item(0), files.item(0).name);
    this.auth.login(formData)
      .subscribe(result => {
        this.router.navigate(['exchange'])
      },
        err => {
          this.toastr.error("Đăng nhập không thành công")}
      );
  }
}
