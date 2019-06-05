import { Component, OnInit } from '@angular/core';
import { map, switchMap, first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Item } from '../../_models/item';

import { UserService } from '../../_services/user.service';
import { TransactionService } from '../../_services/transaction.service';
import { ItemService } from '../../_services/item.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.scss']
})

export class TransactionCreateComponent implements OnInit {

  tranForm: FormGroup;
  submitted = false;

  currentUser: string;
  item: Item;

  balance: number = 0;
  pay: number;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private tranService: TransactionService,
    private itemService: ItemService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.item = this.itemService.getCurrentItem;
    if (this.item == null)
      this.router.navigate(['exchange'])
    this.currentUser = this.authService.getCurrentUser;
  }

  ngOnInit() {
    this.tranForm = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.min(1)]]
    });

    this.userService.getAsset(this.currentUser).subscribe(data => {
      this.balance = data["result"]['balance'];
    }, error => {
      this.toastr.error("Lỗi tải dữ liệu")
    });
  }

  onKey(value: number) {
    this.pay = value * this.item.price;
  }

  public submit() {
    this.submitted = true;

    if (this.tranForm.invalid) {
      return;
    }

    if (this.pay > this.balance) {
      this.toastr.error("Bạn không đủ coin trong tài khoản")
      return;
    }

    if (this.tranForm.value.amount > this.item.amount) {
      this.toastr.error("Không đủ mã")
      this.tranForm['controls']['amount'].setValue(null);
      return;
    }

    this.tranService.create(this.item.uuid, this.tranForm.value.amount)
      .pipe(first())
      .subscribe(
        result => {
          this.toastr.success("Mua thành thành công"),
            this.router.navigate(['user'])
        },
        err => {
          this.toastr.error("Mua không thành công")
        }
      );
  }

  get f() { return this.tranForm.controls; }
}