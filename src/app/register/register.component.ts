import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  displayProgressSpinner: boolean;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    if (this.auth.getCurrentUserRole) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, this.checkChar]],
      firstName: ['', [Validators.required, this.checkChar]],
      lastName: ['', [Validators.required, this.checkChar]],
      org: ['', Validators.required],
      identityCard: ['', [Validators.required, this.checkCard]]
    });
  }

  public submit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.displayProgressSpinner = true;

    this.userService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        result => {
          this.displayProgressSpinner = false;
          if (result["error"]) {
            this.toastr.error("Đăng kí không thành công: " + result["error"])
          } else {
            this.writeContents(JSON.stringify(result), this.registerForm.value.username, 'text/plain');
            this.toastr.success("Đăng kí thành công");
            this.router.navigate(['login']);
          }
        },
        err => {
          this.toastr.error("Đăng kí không thành công")
          this.displayProgressSpinner = false;
        }
      );
  }

  get f() { return this.registerForm.controls; }

  writeContents(content, fileName, contentType) {
    var a = document.createElement('a');
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  checkCard(control) {
    let value = control.value
    let check = /^\d+$/;
    let checkLength = value.length == 9 || value.length == 12;
    if (value)
      if (check.test(value) && checkLength) {
        return null;
      } else
        return { 'cmt': true }
    return null;
  }

  checkChar(control) {
    let value = control.value
    let check = /^[A-Za-z0-9 ]+$/;
    if (check.test(value) && value) {
      return null;
    } else
      return { 'char': true }
  }
}
