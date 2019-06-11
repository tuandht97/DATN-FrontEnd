import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import { first, map, startWith } from 'rxjs/operators';
import { UserService } from '../../_services/user.service';
import { ItemService } from '../../_services/item.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {

  currentUser: string;

  public typeaheadFocusModel: any;

  displayProgressSpinner: boolean;

  code: string[] = [];
  assets = [];
  amountCodeCurrent: number;
  amount: number;
  codeCurrent: string;

  itemForm: FormGroup;
  submitted = false;

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private itemService: ItemService,
    private auth: AuthService
  ) {
    // this.currentUser = this.auth.getCurrentUser;
    // this.userService.getAsset(this.currentUser).subscribe(data => {
    //   if (data["result"]) {
    //     for (let code in data["result"]["tritList"]) {
    //       let a = { code: code, amount: data["result"]["tritList"][code] };
    //       this.assets.push(a);
    //     }
    //     this.code = data["result"]["publishedTrits"];
    //   }else{
    //     this.toastr.error("Bạn chưa có mã nào trong tài sản")
    //   }
    // }, error => {
    // });
  }

  ngOnInit() {
    this.currentUser = this.auth.getCurrentUser;
    this.displayProgressSpinner = true;
    this.userService.getAsset(this.currentUser).subscribe(data => {
      console.log(data)
      if (data["result"]) {
        for (let code in data["result"]["tritList"]) {
          let a = { code: code, amount: data["result"]["tritList"][code] };
          this.assets.push(a);
          this.code.push(a.code);
        }
        // this.code = data["result"]["publishedTrits"];
      } else {
        this.toastr.error("Bạn chưa có mã nào trong tài sản")
      }
      this.displayProgressSpinner = false;
    }, error => {
      this.displayProgressSpinner = false;
      this.toastr.error("Lỗi tải dữ liệu");
    });

    this.itemForm = this.formBuilder.group({
      tritId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  ngDoCheck() {
    this.currentUser = this.auth.getCurrentUser;
  }

  public submit() {
    this.submitted = true;

    console.log(this.itemForm)

    if (this.itemForm.invalid) {
      console.log("CC")
      return;
    }

    let code = this.assets.find(x => x.code == this.itemForm.value.tritId)
    if (code) {
      if (code.amount < this.itemForm.value.amount) {
        this.toastr.error("Bạn chỉ có " + code.amount + " trong tài sản")
        this.itemForm['controls']['amount'].setValue(null);
        return;
      }
    }
    else {
      this.toastr.error("Mã không có trong tài sản của bạn")
      this.itemForm['controls']['tritId'].setValue("");
      return;
    }

    this.itemService.create(this.itemForm.value)
      .pipe(first())
      .subscribe(
        result => {
          console.log(result)
          if (result["error"])
            this.toastr.error("Giao bán mã không thành công");
          else {
            this.toastr.success("Giao bán mã thành công");
            setTimeout(() => {
              this.router.navigate(['item'])
            }, 2000)
          }
        },
        err => {
          this.toastr.error("Giao bán mã không thành công")
        }
      );
  }

  get f() { return this.itemForm.controls; }

  public sellAll() {
    this.amount = this.amountCodeCurrent;
    this.itemForm['controls']['amount'].setValue(this.amountCodeCurrent);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.code.filter(x => x.toLowerCase().includes(filterValue));
  }

  updateCode(value: string) {
    this.itemForm['controls']['tritId'].setValue(value);
  }

  updateForm(ev: any) {
    if (ev.source.value) {
      const code = this.assets.find(x => x.code == ev.source.value)
      if (code) {
        this.itemForm['controls']['tritId'].setValue(code.code);
        this.amountCodeCurrent = code.amount;
      } else {
        this.toastr.error("Mã không tồn tại trong tài sản của bạn")
      }
    } else {
      this.toastr.error("Chọn mã không thành công")
    }
  }
}
