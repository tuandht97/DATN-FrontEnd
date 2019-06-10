import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  displayProgressSpinner: boolean;

  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.auth.getCurrentUser !== 'admin')
      this.router.navigate(['user/list']);
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, this.checkAcc]],
      firstName: ['', [Validators.required, this.checkChar]],
      lastName: ['', [Validators.required, this.checkChar]],
      org: ['Regulator'],
      identityCard: ['', [Validators.required, this.checkCard]]
    });
  }

  public submit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    this.displayProgressSpinner = true;
    this.userService.createRegulator(this.registerForm.value)
      .pipe(first())
      .subscribe(
        result => {
          this.displayProgressSpinner = false;
          if (result["error"]) {
            this.toastr.error("Tạo tài khoản không thành công: " + result["error"])
          } else {
            this.writeContents(JSON.stringify(result), this.registerForm.value.username, 'text/plain');
            this.toastr.success("Tạo tài khoản thành công");
            this.submitted = false;
            this.registerForm.reset({
              username: '',
              firstName: '',
              lastName: '',
              org: 'Regulator',
              identityCard: ''
            })
          }
        },
        err => {
          this.toastr.error("Tạo tài khoản không thành công")
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

  checkAcc(control) {
    let value = control.value
    let check = /^[A-Za-z0-9 ]+$/;
    if (check.test(value) && value) {
      return null;
    } else
      return { 'acc': true }
  }

  checkChar(control) {
    let value = control.value
    let check = /^[A-Za-z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ,./\- ]+$/;
    if (check.test(value) && value) {
      return null;
    } else
      return { 'char': true }
  }
}

